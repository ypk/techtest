import React, { useState, useEffect } from 'react';
import PostsContext from '../context/PostsContext';
import type { Post } from '../interfaces/Post';
import type { PostsProvider as PostsProviderProps } from '../interfaces/PostsProvider';
import FilterItems from '../utils/filterItems';
import SortItems from '../utils/sortItems';

/**
 * Provider component for Posts context
 * Manages posts data, filtering, and sorting
 */
const PostsProvider: React.FC<PostsProviderProps> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [filterString, setFilterString] = useState<string>("");

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setPosts(data);
                setDisplayedPosts(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch posts');
                console.error('Error fetching posts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);


    const filterPosts = (value: string) => {
        if (!value || !value.trim()) {
            setDisplayedPosts(posts);
        } else {
            const filtered = FilterItems(posts, 'title', value, true);
            setDisplayedPosts(filtered);
        }
    };


    const sortPosts = (direction: 'ASC' | 'DESC') => {
        const sorted = SortItems(displayedPosts, 'title', direction);
        setDisplayedPosts(sorted);
    };

    const contextValue = {
        posts,
        displayedPosts,
        loading,
        error,
        filterString,
        setFilterString,
        filterPosts,
        sortPosts,
    };

    return (
        <PostsContext.Provider value={contextValue}>
            {children}
        </PostsContext.Provider>
    );
};

export default PostsProvider;