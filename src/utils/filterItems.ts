/**
 * Generic function to filter an array of items by a specific field and value
 * @param items Array of items to filter
 * @param field Field to filter by
 * @param value Value to filter for
 * @param isPartialMatch Whether to use partial matching for string fields
 * @returns Filtered array
 */
function FilterItems<T>(items: T[], field: keyof T, value: any, isPartialMatch: boolean = false): T[] {
    return items.filter(item => {
        const itemValue = item[field];

        if (typeof itemValue === 'string' && typeof value === 'string' && isPartialMatch) {
            return (itemValue as string).toLowerCase().includes(value.toLowerCase());
        }

        return itemValue === value;
    });
}

export default FilterItems;
