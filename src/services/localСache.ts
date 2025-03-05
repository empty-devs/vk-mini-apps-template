export const setCache = (name: string, data: Record<string, string | number>): void => {
    window.localStorage.setItem(name, JSON.stringify([Math.floor(Date.now() / 1000) + 18000, data]));
};

export const getCache = (name: string): Record<string, string | number> | { error: boolean } => {
    const cache: string | null = window.localStorage.getItem(name);

    if (cache) {
        try {
            const data: [number, Record<string, string | number>] = JSON.parse(cache);

            if (Math.floor(Date.now() / 1000) <= data[0]) {
                return data[1];
            }
        } catch (error) {
            // eslint-disable-next-line
            console.error('[getCache] is not valid cache', error);
        }

        window.localStorage.removeItem(name);
    }

    return { error: true };
};

export const updateCache = (name: string, data: Record<string, string | number>): void => {
    const cache = getCache(name);

    if ('error' in cache && cache['error']) {
        return;
    }

    if (isRecord(cache)) {
        setCache(name, { ...cache, ...data });
    }
};

const isRecord = (
    data: Record<string, string | number> | { error: boolean }
): data is Record<string, string | number> => {
    return data && typeof data === 'object' && !('error' in data);
};
