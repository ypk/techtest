import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PostsFilter } from './PostsFilter';
import PostsContext from '../../context/PostsContext';

describe('PostsFilter', () => {
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

    it('should render the filter input', () => {
        render(
            <PostsContext.Provider value={mockContext}>
                <PostsFilter />
            </PostsContext.Provider>
        );

        expect(screen.getByPlaceholderText('Filter by title')).toBeInTheDocument();
    });

    it('should update context when input changes', () => {
        render(
            <PostsContext.Provider value={mockContext}>
                <PostsFilter />
            </PostsContext.Provider>
        );

        const input = screen.getByPlaceholderText('Filter by title');
        fireEvent.change(input, { target: { value: 'test' } });

        expect(mockContext.setFilterString).toHaveBeenCalledWith('test');
    });

    it('should handle null context gracefully', () => {
        const { container } = render(<PostsFilter />);
        expect(container).toBeInTheDocument();
    });
});