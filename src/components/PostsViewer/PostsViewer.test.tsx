import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PostsViewer from './PostsViewer';
import PostsContext from '../../context/PostsContext';
import React from 'react';

// Mock the Sort component
vi.mock('../Sort/Sort', () => ({
    Sort: () => <div data-testid="sort-component">Sort Component</div>
}));

// Mock the Post component
vi.mock('../Post/Post', () => ({
    Post: ({ post }) => (
        <div data-testid={`post-${post.id}`}>
            Post {post.id}
        </div>
    )
}));

describe('PostsViewer', () => {
    it('should render posts', () => {
        const mockPosts = [
            { userId: 1, id: 1, title: 'First Post', body: 'Body 1' },
            { userId: 2, id: 2, title: 'Second Post', body: 'Body 2' },
            { userId: 3, id: 3, title: 'Third Post', body: 'Body 3' },
        ];

        const mockContext = {
            posts: mockPosts,
            displayedPosts: mockPosts,
            loading: false,
            error: null,
            filterString: '',
            setFilterString: vi.fn(),
            filterPosts: vi.fn(),
            sortPosts: vi.fn(),
        };

        render(
            <PostsContext.Provider value={mockContext}>
                <PostsViewer />
            </PostsContext.Provider>
        );

        // Check if the success alert is displayed
        expect(screen.getByText(/Successfully loaded 3 posts/i)).toBeInTheDocument();

        // Check if the sort component is rendered
        expect(screen.getByTestId('sort-component')).toBeInTheDocument();

        // Check if all posts are rendered using the data-testid pattern from our mock
        expect(screen.getByTestId('post-1')).toBeInTheDocument();
        expect(screen.getByTestId('post-2')).toBeInTheDocument();
        expect(screen.getByTestId('post-3')).toBeInTheDocument();

        // Or check the total number of posts
        const postElements = [
            screen.getByTestId('post-1'),
            screen.getByTestId('post-2'),
            screen.getByTestId('post-3')
        ];
        expect(postElements.length).toBe(3);
    });
    
    it('should render loading state', () => {
        const mockContext = {
            posts: [],
            displayedPosts: [],
            loading: true,
            error: null,
            filterString: '',
            setFilterString: vi.fn(),
            filterPosts: vi.fn(),
            sortPosts: vi.fn(),
        };

        render(
            <PostsContext.Provider value={mockContext}>
                <PostsViewer />
            </PostsContext.Provider>
        );

        expect(screen.getByText(/Loading posts/i)).toBeInTheDocument();
    });

    it('should render error state', () => {
        const mockContext = {
            posts: [],
            displayedPosts: [],
            loading: false,
            error: 'Failed to fetch posts',
            filterString: '',
            setFilterString: vi.fn(),
            filterPosts: vi.fn(),
            sortPosts: vi.fn(),
        };

        render(
            <PostsContext.Provider value={mockContext}>
                <PostsViewer />
            </PostsContext.Provider>
        );

        expect(screen.getByText(/Failed to fetch posts/i)).toBeInTheDocument();
    });

    it('should render empty state', () => {
        const mockContext = {
            posts: [],
            displayedPosts: [],
            loading: false,
            error: null,
            filterString: '',
            setFilterString: vi.fn(),
            filterPosts: vi.fn(),
            sortPosts: vi.fn(),
        };

        render(
            <PostsContext.Provider value={mockContext}>
                <PostsViewer />
            </PostsContext.Provider>
        );

        expect(screen.getByText(/No Posts Available/i)).toBeInTheDocument();
    });

    it('should handle null context gracefully', () => {
        render(<PostsViewer />);
        expect(screen.getByText(/Posts context not available/i)).toBeInTheDocument();
    });
});
