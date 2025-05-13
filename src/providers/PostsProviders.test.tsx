import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import PostsProvider from './PostsProviders';
import PostsContext from '../context/PostsContext';
import { useContext } from 'react';

globalThis.fetch = vi.fn();

const mockPosts = [
    { userId: 1, id: 1, title: 'First Post', body: 'This is the first post' },
    { userId: 1, id: 2, title: 'Second Post', body: 'This is the second post' },
    { userId: 2, id: 3, title: 'Third Post', body: 'This is the third post' },
];

const TestComponent = () => {
    const context = useContext(PostsContext);

    if (!context) return <div>No context</div>;

    const { posts, displayedPosts, loading, error, filterPosts, sortPosts } = context;

    return (
        <div>
            {loading && <div data-testid="loading">Loading...</div>}
            {error && <div data-testid="error">{error}</div>}
            <div data-testid="posts-count">{posts.length}</div>
            <div data-testid="displayed-posts-count">{displayedPosts.length}</div>
            <button data-testid="filter-button" onClick={() => filterPosts('First')}>Filter</button>
            <button data-testid="sort-button" onClick={() => sortPosts('ASC')}>Sort</button>
        </div>
    );
};

describe('PostsProvider', () => {
    beforeEach(() => {
        vi.resetAllMocks();

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockPosts,
        });
    });
    it('should fetch posts on mount', async () => {
        render(
            <PostsProvider>
                <TestComponent />
            </PostsProvider>
        );

        expect(screen.getByTestId('loading')).toBeDefined();

        await waitFor(() => {
            expect(screen.getByTestId('posts-count').textContent).toBe('3');
        });

        expect(globalThis.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts');
    }); it('should handle fetch errors', async () => {
        globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

        render(
            <PostsProvider>
                <TestComponent />
            </PostsProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('error')).toBeDefined();
        });
    });

    it('should filter posts', async () => {
        render(
            <PostsProvider>
                <TestComponent />
            </PostsProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('posts-count').textContent).toBe('3');
        });

        fireEvent.click(screen.getByTestId('filter-button'));

        await waitFor(() => {
            expect(screen.getByTestId('displayed-posts-count').textContent).toBe('1');
        });
    });

    it('should sort posts', async () => {
        render(
            <PostsProvider>
                <TestComponent />
            </PostsProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('posts-count').textContent).toBe('3');
        });

        fireEvent.click(screen.getByTestId('sort-button'));

        expect(screen.getByTestId('displayed-posts-count').textContent).toBe('3');
    });
});