import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Post } from './Post';

describe('Post', () => {
    const mockPost = {
        userId: 1,
        id: 1,
        title: 'Test Post Title',
        body: 'This is the body of the test post'
    };

    it('should render post title and body', () => {
        render(<Post post={mockPost} />);

        expect(screen.getByText('Test Post Title')).toBeInTheDocument();
        expect(screen.getByText('This is the body of the test post')).toBeInTheDocument();
    });

    it('should render user ID', () => {
        render(<Post post={mockPost} />);

        expect(screen.getByText(/User ID: 1/)).toBeInTheDocument();
    });
});