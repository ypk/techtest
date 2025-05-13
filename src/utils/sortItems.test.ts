import { describe, it, expect } from 'vitest';
import SortItems from './sortItems';

describe('SortItems', () => {
    // Test data
    const items = [
        { id: 3, name: 'Carrot', price: 1.5 },
        { id: 1, name: 'Apple', price: 2.0 },
        { id: 4, name: 'Broccoli', price: 3.0 },
        { id: 2, name: 'Banana', price: 1.0 },
    ];

    it('should sort items by string field in ascending order', () => {
        const result = SortItems(items, 'name', 'ASC');
        expect(result[0].name).toBe('Apple');
        expect(result[1].name).toBe('Banana');
        expect(result[2].name).toBe('Broccoli');
        expect(result[3].name).toBe('Carrot');
    });

    it('should sort items by string field in descending order', () => {
        const result = SortItems(items, 'name', 'DESC');
        expect(result[0].name).toBe('Carrot');
        expect(result[1].name).toBe('Broccoli');
        expect(result[2].name).toBe('Banana');
        expect(result[3].name).toBe('Apple');
    });

    it('should sort items by numeric field in ascending order', () => {
        const result = SortItems(items, 'price', 'ASC');
        expect(result[0].price).toBe(1.0);
        expect(result[1].price).toBe(1.5);
        expect(result[2].price).toBe(2.0);
        expect(result[3].price).toBe(3.0);
    });

    it('should sort items by numeric field in descending order', () => {
        const result = SortItems(items, 'price', 'DESC');
        expect(result[0].price).toBe(3.0);
        expect(result[1].price).toBe(2.0);
        expect(result[2].price).toBe(1.5);
        expect(result[3].price).toBe(1.0);
    });

    it('should default to ascending order when not specified', () => {
        const result = SortItems(items, 'name');
        expect(result[0].name).toBe('Apple');
        expect(result[3].name).toBe('Carrot');
    });

    it('should not modify the original array', () => {
        const original = [...items];
        SortItems(items, 'name');
        expect(items).toEqual(original);
    });
});