import React, { useContext } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import PostsContext from '../../context/PostsContext';

/**
   * Sort component
   * Provides buttons to sort posts in ascending or descending order
   */
export const Sort: React.FC = () => {
    const context = useContext(PostsContext);

    if (!context) {
        return null;
    }

    const { sortPosts } = context;

    return (
        <ButtonGroup variant="outlined" size="small">
            <Button onClick={() => sortPosts('ASC')}>A-Z</Button>
            <Button onClick={() => sortPosts('DESC')}>Z-A</Button>
        </ButtonGroup>
    );
};