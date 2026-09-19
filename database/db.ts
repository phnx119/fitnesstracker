import Dexie, { type EntityTable } from 'dexie';

// INCREMENT AFTER EVERY SCHEMA CHANGE
const version = 14;

// tableName: { rowName: defaultValue as type }
// id is added automatically
// index increases search performance (for example "where"), more indexed columns make the entire db slower. only index most important columns
const schemaDefinition = {
    Settings: {
        showDbViewer: { default: true as boolean, index: false },
        bigScreenMode: { default: true as boolean, index: false },
        landingPage: { default: '' as string, index: false },
        progressMetric: { default: 1 as number, index: false },
        theme: { default: 'dark' as string, index: false },
    },
    Machine: {
        name: { default: 'Mausmaschine' as string, index: true },
        imageBlob: { default: undefined as Blob | undefined, index: false },
    },
    WorkoutPlan: {
        name: { default: 'Mausplan' as string, index: false },
        imageBlob: { default: undefined as Blob | undefined, index: false },
        lastUsed: { default: 0 as number | undefined, index: true },
        favorite: { default: false as boolean, index: false },
    },
    PlanMachine: {
        planId: { default: 0 as number, index: true },
        machineId: { default: 0 as number, index: true },
        orderIndex: { default: 0 as number, index: false },
    },
    MachineSession: {
        machineId: { default: 0 as number, index: true },
        date: { default: 0 as number, index: true },
    },
    SetRecord: {
        sessionId: { default: 0 as number, index: true },
        machineId: { default: 0 as number, index: true },
        setNumber: { default: 0 as number, index: false },
        weight: { default: 0 as number, index: false },
        reps: { default: 0 as number, index: false },
    },
    PersonalData: {
        bodyWeight: { default: 0 as number, index: false },
        bodyHeight: { default: 0 as number, index: false },
        bodyFat: { default: 0 as number, index: false },
        targetWeight: { default: 0 as number, index: false },
    },
};

type ExtractDefault<T> = T extends { default: infer D } ? D : never;

type SchemaRaw = typeof schemaDefinition;

export type SchemaTables = {
    [Table in keyof SchemaRaw]: {
        [Field in keyof SchemaRaw[Table]]: ExtractDefault<
            SchemaRaw[Table][Field]
        >;
    };
};

export type Row<T extends keyof SchemaTables> = SchemaTables[T] & {
    id: number;
};

export type Insert<T extends keyof SchemaTables> = SchemaTables[T] & {
    id?: number;
};

type DerivedTables = {
    [K in keyof SchemaTables]: EntityTable<Row<K>, 'id', Insert<K>>;
};

class FitnessDatabase extends Dexie {
    constructor() {
        super('FitnessAppDB');

        const storesConfig: Record<string, string> = {};

        for (const tableName of Object.keys(
            schemaDefinition,
        ) as (keyof SchemaTables)[]) {
            const tableObj = schemaDefinition[tableName];

            const indexedKeys = Object.entries(tableObj)
                .filter(([_, meta]) => meta.index)
                .map(([key]) => key);

            const indexes =
                indexedKeys.length > 0 ? ', ' + indexedKeys.join(', ') : '';
            storesConfig[tableName] = '++id' + indexes;
        }

        this.version(version).stores(storesConfig);

        this.on('populate', (tx) => {
            tx.table('Settings').add({
                id: 1,
                showDbViewer: false,
                landingPage: '/training/plans',
                theme: 'defaultMui',
            });
        });
    }
}

export const dbInstance = new FitnessDatabase() as FitnessDatabase &
    DerivedTables;

async function compressBlob(blob: Blob): Promise<Blob> {
    try {
        const probeBitmap = await createImageBitmap(blob);
        let { width, height } = probeBitmap;
        const maxSize = 512;
        if (width > height) {
            if (width > maxSize) {
                height = Math.round((height * maxSize) / width);
                width = maxSize;
            }
        } else {
            if (height > maxSize) {
                width = Math.round((width * maxSize) / height);
                height = maxSize;
            }
        }

        let bitmap: ImageBitmap;
        if (width !== probeBitmap.width || height !== probeBitmap.height) {
            try {
                bitmap = await createImageBitmap(blob, {
                    resizeWidth: width,
                    resizeHeight: height,
                    resizeQuality: 'high',
                });
                probeBitmap.close();
            } catch {
                bitmap = probeBitmap;
            }
        } else {
            bitmap = probeBitmap;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d', { alpha: false });
        if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(bitmap, 0, 0, width, height);
        }
        bitmap.close();

        return await new Promise<Blob>((resolve) => {
            canvas.toBlob(
                (newBlob) => {
                    resolve(newBlob || blob);
                },
                'image/webp',
                0.8,
            );
        });
    } catch {
        return blob;
    }
}

export async function optimizeStoredBlobs(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
        const machines = await dbInstance.Machine.toArray();
        for (const machine of machines) {
            if (
                machine.imageBlob &&
                machine.imageBlob instanceof Blob &&
                machine.imageBlob.size > 80 * 1024
            ) {
                const compressed = await compressBlob(machine.imageBlob);
                if (compressed.size < machine.imageBlob.size) {
                    await dbInstance.Machine.update(machine.id, {
                        imageBlob: compressed,
                    });
                    if ('caches' in window) {
                        try {
                            const cache = await caches.open('user-blob-images');
                            await cache.put(
                                `/api/user-images/machine-${machine.id}`,
                                new Response(compressed, {
                                    headers: {
                                        'Content-Type': 'image/webp',
                                        'Cache-Control':
                                            'public, max-age=31536000, immutable',
                                    },
                                }),
                            );
                        } catch {
                            // ignore cache errors
                        }
                    }
                }
            }
        }

        const plans = await dbInstance.WorkoutPlan.toArray();
        for (const plan of plans) {
            if (
                plan.imageBlob &&
                plan.imageBlob instanceof Blob &&
                plan.imageBlob.size > 80 * 1024
            ) {
                const compressed = await compressBlob(plan.imageBlob);
                if (compressed.size < plan.imageBlob.size) {
                    await dbInstance.WorkoutPlan.update(plan.id, {
                        imageBlob: compressed,
                    });
                    if ('caches' in window) {
                        try {
                            const cache = await caches.open('user-blob-images');
                            await cache.put(
                                `/api/user-images/plan-${plan.id}`,
                                new Response(compressed, {
                                    headers: {
                                        'Content-Type': 'image/webp',
                                        'Cache-Control':
                                            'public, max-age=31536000, immutable',
                                    },
                                }),
                            );
                        } catch {
                            // ignore cache errors
                        }
                    }
                }
            }
        }
    } catch {
        // Non-fatal background migration
    }
}

if (typeof window !== 'undefined') {
    setTimeout(optimizeStoredBlobs, 2000);
}
