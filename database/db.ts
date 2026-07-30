import Dexie, { type EntityTable } from 'dexie';

// INCREMENT AFTER EVERY SCHEMA CHANGE
const version = 4;

// tableName: { rowName: defaultValue as type }
// id is added automatically
const schemaDefinition = {
    Settings: {
        showDbViewer: true as boolean,
        landingPage: '' as string,
    },

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

    PersonalData: {
        bodyWeight: 0 as number,
        bodyHeight: 0 as number,
        bodyFat: 0 as number,
        targetWeigt: 0 as number,
    },
};

export type SchemaTables = typeof schemaDefinition;

export type Row<T extends keyof SchemaTables> = SchemaTables[T] & {
    id: number;
};
export type Insert<T extends keyof SchemaTables> = SchemaTables[T];

type DerivedTables = {
    [K in keyof SchemaTables]: EntityTable<Row<K>, 'id'>;
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
