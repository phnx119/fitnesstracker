import { useLiveQuery } from 'dexie-react-hooks';
import { DependencyList, useState } from 'react';

export function useCachedQuery<T>(
    querier: () => Promise<T> | T | undefined,
    deps: DependencyList,
): T | undefined {
    const data = useLiveQuery(querier, deps as unknown[]);
    const [cached, setCached] = useState<T | undefined>(data);

    if (data !== undefined && data !== cached) {
        setCached(data);
    }

    return data ?? cached;
}
