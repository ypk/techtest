import React, { useContext } from "react";
import { Alert, Typography, Box, Container, Grid } from '@mui/material';
import { Post } from "../Post/Post";
import { Sort } from "../Sort/Sort";
import PostsContext from "../../context/PostsContext";

/**
 * PostsViewer component
 * Displays posts with sorting functionality
 */
const PostsViewer: React.FC = () => {
  const context = useContext(PostsContext);

  if (!context) {
    return (
      <Container maxWidth="md">
        <Alert severity="error">Posts context not available</Alert>
      </Container>
    );
  }

  const { posts, displayedPosts, loading, error } = context;

  if (loading) {
    return (
      <Container maxWidth="md">
        <Alert severity="info">Loading posts...</Alert>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (posts.length === 0) {
    return (
      <Container maxWidth="md">
        <Alert severity="warning">No Posts Available</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Alert severity="success" sx={{ mb: 2 }}>
        Successfully loaded {posts.length} posts
      </Alert>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            Posts Viewer
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Sort />
        </Grid>
      </Grid>
      <Box sx={{ mt: 4 }}>
        {displayedPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Box>
    </Container>
  );
};

export default PostsViewer;