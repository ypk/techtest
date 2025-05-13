import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import PostsContext from '../../context/PostsContext';

// Mock the PostsFilter component
vi.mock('../PostsFilter/PostsFilter', () => ({
  PostsFilter: () => <div data-testid="posts-filter">Filter Component</div>
}));

describe('Navbar', () => {
    const mockContext = {
        posts: [],
        displayedPosts: [],
        loading: false,
        error: null,
        filterString: 'test-filter',
        setFilterString: vi.fn(),
        filterPosts: vi.fn(),
        sortPosts: vi.fn(),
    };

    it('should render the navbar with filter', () => {
        render(
            <PostsContext.Provider value={mockContext}>
                <Navbar />
            </PostsContext.Provider>
        );

        expect(screen.getByTestId('posts-filter')).toBeInTheDocument();
    });

    it('should call filterPosts when search icon is clicked', () => {
        const mockFilterPosts = vi.fn();
        const mockContext = {
            posts: [],
            displayedPosts: [],
            loading: false,
            error: null,
            filterString: 'test',
            setFilterString: vi.fn(),
            filterPosts: mockFilterPosts,
            sortPosts: vi.fn(),
        };
        
        render(
            <PostsContext.Provider value={mockContext}>
                <Navbar />
            </PostsContext.Provider>
        );
        
        // Use data-testid instead of role
        const searchButton = screen.getByTestId('search-button');
        fireEvent.click(searchButton);
        
        expect(mockFilterPosts).toHaveBeenCalledWith('test');
    });

    it('should handle null context gracefully', () => {
        const { container } = render(<Navbar />);
        expect(container).toBeInTheDocument();
    });
});