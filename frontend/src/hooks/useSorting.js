// hooks/useSorting.js
import {useState, useCallback} from 'react';

export const useSorting = initialSortConfig => {
    const [sortConfig, setSortConfig] = useState(initialSortConfig);

    const sortData = useCallback(
        data => {
            if (!sortConfig.field) return data;

            return [...data].sort((a, b) => {
                const aValue = a[sortConfig.field];
                const bValue = b[sortConfig.field];

                if (aValue === null || aValue === undefined) return 1;
                if (bValue === null || bValue === undefined) return -1;

                // If we're sorting numbers and they're equal, sort by name
                if (typeof aValue === 'number' && aValue === bValue) {
                    return a.name.localeCompare(b.name);
                }

                const comparison =
                    aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
                return sortConfig.direction === 'asc'
                    ? comparison
                    : -comparison;
            });
        },
        [sortConfig]
    );

    const updateSort = useCallback(field => {
        setSortConfig(prevConfig => ({
            field,
            direction:
                prevConfig.field === field
                    ? prevConfig.direction === 'asc'
                        ? 'desc'
                        : 'asc'
                    : prevConfig.direction
        }));
    }, []);

    return {sortConfig, updateSort, sortData};
};
