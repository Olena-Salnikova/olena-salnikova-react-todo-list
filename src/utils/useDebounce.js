import { useState, useEffect } from 'react';

function useDebounce (value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set a timeout to update the debounced value after the specified delay
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Clear the timeout if the value or delay changes before the timeout completes
        return () => {
            clearTimeout(timeoutId);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;