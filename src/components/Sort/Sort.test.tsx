import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Sort } from './Sort';
import PostsContext from '../../context/PostsContext';

describe('Sort', () => {
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

    it('should render sort buttons', () => {
        render(
            <PostsContext.Provider value={mockContext}>
                <Sort />
            </PostsContext.Provider>
        );

        expect(screen.getByText('A-Z')).toBeInTheDocument();
        expect(screen.getByText('Z-A')).toBeInTheDocument();
    });

    it('should call sortPosts with ASC when A-Z button is clicked', () => {
        render(
            <PostsContext.Provider value={mockContext}>
                <Sort />
            </PostsContext.Provider>
        );

        fireEvent.click(screen.getByText('A-Z'));
        expect(mockContext.sortPosts).toHaveBeenCalledWith('ASC');
    });

    it('should call sortPosts with DESC when Z-A button is clicked', () => {
        render(
            <PostsContext.Provider value={mockContext}>
                <Sort />
            </PostsContext.Provider>
        );

        fireEvent.click(screen.getByText('Z-A'));
        expect(mockContext.sortPosts).toHaveBeenCalledWith('DESC');
    });

    it('should handle null context gracefully', () => {
        const { container } = render(<Sort />);
        expect(container).toBeInTheDocument();
        expect(screen.queryByText('A-Z')).not.toBeInTheDocument();
    });
});