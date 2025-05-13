import { createContext } from "react";
import type { PostsContext as PostsContextProps } from "../interfaces/PostContext";

const PostsContext = createContext<PostsContextProps | undefined>(undefined);

export default PostsContext;