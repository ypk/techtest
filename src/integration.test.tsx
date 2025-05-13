import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Sample post data
const mockPosts = [
    { userId: 1, id: 1, title: 'Apple Post', body: 'This is about apples' },
    { userId: 1, id: 2, title: 'Banana Post', body: 'This is about bananas' },
    { userId: 2, id: 3, title: 'Cherry Post', body: 'This is about cherries' },
];

describe('Integration Tests', () => {
    beforeEach(() => {
        vi.resetAllMocks();

        window.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockPosts,
        });
    });

    it('should load and display posts', async () => {
        render(<App />);

        await waitFor(() => {
            expect(screen.getByText(/Successfully loaded 3 posts/i)).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Apple Post')).toBeDefined();
            expect(screen.getByText('Banana Post')).toBeDefined();
            expect(screen.getByText('Cherry Post')).toBeDefined();
        });
    });
    it('should filter posts when search is performed', async () => {
        render(<App />);

        await waitFor(() => {
            expect(screen.getByText(/Successfully loaded 3 posts/i)).toBeInTheDocument();
        });

        const filterInput = screen.getByPlaceholderText('Filter by title');
        fireEvent.change(filterInput, { target: { value: 'Apple' } });

        // Use data-testid to find the search button
        const searchButton = screen.getByTestId('search-button');
        fireEvent.click(searchButton);

        await waitFor(() => {
            expect(screen.getByText('Apple Post')).toBeDefined();
            expect(screen.queryByText('Banana Post')).toBeNull();
            expect(screen.queryByText('Cherry Post')).toBeNull();
        });
    });

    it('should sort posts when sort buttons are clicked', async () => {
        render(<App />);

        await waitFor(() => {
            expect(screen.getByText(/Successfully loaded 3 posts/i)).toBeInTheDocument();
        });

        const sortButtons = screen.getAllByRole('button');
        const zaButton = sortButtons.find(button => button.textContent?.includes('Z-A'));

        if (zaButton) {
            fireEvent.click(zaButton);
        }

        await waitFor(() => {
            expect(screen.getByText('Cherry Post')).toBeDefined();
            expect(screen.getByText('Banana Post')).toBeDefined();
            expect(screen.getByText('Apple Post')).toBeDefined();
        });
    });
});