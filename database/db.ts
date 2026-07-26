import Dexie, { type EntityTable } from 'dexie';

// INCREMENT AFTER EVERY SCHEMA CHANGE
const version = 1;

// tableName: { rowName: defaultValue as type }
// id is added automatically
const schemaDefinition = {
    Machine: {
        name: 'Mausmaschine' as string,
    },

    WorkoutPlan: {
        name: 'Mausplan' as string,
    },

    PlanMachine: {
        planId: 0 as number,
        machineId: 0 as number,
        orderIndex: 0 as number,
    },

    WorkoutSession: {
        planId: 0 as number,
        date: '' as string,
    },

    SetRecord: {
        sessionId: 0 as number,
        machineId: 0 as number,
        setNumber: 0 as number,
        weight: 0 as number,
        reps: 0 as number,
    },
};

export type SchemaTables = typeof schemaDefinition;

type DerivedTables = {
    [K in keyof SchemaTables]: EntityTable<
        SchemaTables[K] & { id: number },
        'id'
    >;
};

class FitnessDatabase extends Dexie {
    constructor() {
        super('FitnessAppDB');

        const storesConfig: Record<string, string> = {};
        for (const tableName of Object.keys(
            schemaDefinition,
        ) as (keyof SchemaTables)[]) {
            const fields = Object.keys(schemaDefinition[tableName]);
            storesConfig[tableName] = '++id, ' + fields.join(', ');
        }

        this.version(version).stores(storesConfig);
    }
}

export const dbInstance = new FitnessDatabase() as FitnessDatabase &
    DerivedTables;

type EntityTypes = {
    [K in keyof DerivedTables]: {
        row: DerivedTables[K] extends EntityTable<infer R> ? R : never;
        insert: Omit<
            DerivedTables[K] extends EntityTable<infer R> ? R : never,
            'id'
        >;
    };
};

export type DBTypes = EntityTypes;
export type Row<T extends keyof SchemaTables> = EntityTypes[T]['row'];
export type Insert<T extends keyof SchemaTables> = EntityTypes[T]['insert'];
