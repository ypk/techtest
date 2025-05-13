/**
 * Generic function to sort an array of items by a specific field
 * @param items Array of items to sort
 * @param field Field to sort by
 * @param order Sort order ('ASC' or 'DESC')
 * @returns Sorted array
 */
function SortItems<T>(items: T[], field: keyof T, order: 'ASC' | 'DESC' = 'ASC'): T[] {
    return [...items].sort((a, b) => {
        const valueA = a[field];
        const valueB = b[field];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return order === 'ASC'
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
        }

        if (valueA < valueB) return order === 'ASC' ? -1 : 1;
        if (valueA > valueB) return order === 'ASC' ? 1 : -1;
        return 0;
    });
}

export default SortItems;