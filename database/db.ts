import Dexie, { type EntityTable } from 'dexie';

// INCREMENT AFTER EVERY SCHEMA CHANGE
const version = 9;

// tableName: { rowName: defaultValue as type }
// id is added automatically
// index increases search performance (for example "where"), more indexed columns make the entire db slower. only index most important columns
const schemaDefinition = {
    Settings: {
        showDbViewer: { default: true as boolean, index: false },
        bigScreenMode: { default: true as boolean, index: false },
        landingPage: { default: '' as string, index: false },
        progressMetric: { default: 1 as number, index: false },
    },
    Machine: {
        name: { default: 'Mausmaschine' as string, index: true },
        imageBlob: { default: undefined as Blob | undefined, index: false },
    },
    WorkoutPlan: {
        name: { default: 'Mausplan' as string, index: false },
        imageBlob: { default: undefined as Blob | undefined, index: false },
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
                landingPage: '/training',
            });
        });
    }
}

export const dbInstance = new FitnessDatabase() as FitnessDatabase &
    DerivedTables;
