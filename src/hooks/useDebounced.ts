import { useEffect, useState } from 'react';

/**
 * Debounces value
 * i.e. return value will be updated no more often than once in <delay> ms
 *
 * @param value
 * @param delay
 */
export function useDebounced<T>(value: T, delay = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}
