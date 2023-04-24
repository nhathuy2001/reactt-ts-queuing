import { useState, useEffect } from "react";

/**
 *
 * @param value String
 * @param delay Time delay
 * @returns String
 */

function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        // cleanup function:
        return () => clearTimeout(handler);
    }, [value]);
    return debouncedValue;
}

export default useDebounce;
