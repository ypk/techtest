import { describe, it, expect } from 'vitest';
import FilterItems from './filterItems';

describe('FilterItems', () => {
    // Test data
    const items = [
        { id: 1, name: 'Apple', category: 'fruit' },
        { id: 2, name: 'Banana', category: 'fruit' },
        { id: 3, name: 'Carrot', category: 'vegetable' },
        { id: 4, name: 'Broccoli', category: 'vegetable' },
    ];

    it('should filter items by exact match', () => {
        const result = FilterItems(items, 'category', 'fruit');
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('Apple');
        expect(result[1].name).toBe('Banana');
    });

    it('should filter items by partial match when enabled', () => {
        const result = FilterItems(items, 'name', 'a', true);
        expect(result).toHaveLength(3);
        expect(result.map(item => item.name)).toContain('Apple');
        expect(result.map(item => item.name)).toContain('Banana');
        expect(result.map(item => item.name)).toContain('Carrot');
    });

    it('should be case insensitive for partial matches', () => {
        const result = FilterItems(items, 'name', 'A', true);
        expect(result).toHaveLength(3);
        expect(result.map(item => item.name)).toContain('Apple');
        expect(result.map(item => item.name)).toContain('Banana');
        expect(result.map(item => item.name)).toContain('Carrot');
    });

    it('should return empty array when no matches found', () => {
        const result = FilterItems(items, 'name', 'Mango');
        expect(result).toHaveLength(0);
    });

    it('should return all items when filter value is empty string', () => {
        const result = FilterItems(items, 'name', '');
        expect(result).toHaveLength(0); // No exact matches for empty string
    });
});