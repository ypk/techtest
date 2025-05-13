import type { Post } from "./Post";

interface PostsContext {
    posts: Post[];
    displayedPosts: Post[];
    loading: boolean;
    error: string | null;
    filterString: string;
    setFilterString: (value: string) => void;
    filterPosts: (value: string) => void;
    sortPosts: (direction: 'ASC' | 'DESC') => void;
}

export type { PostsContext };
