import React from "react";
import { Typography, Card, CardContent } from '@mui/material';
import type { Post as PostType } from "../../interfaces/Post";

const Post: React.FC<{ post: PostType }> = ({ post }) => {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {post.body}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    User ID: {post.userId}
                </Typography>
            </CardContent>
        </Card>
    );
};

export { Post };