import React, { useState, useContext } from "react";
import { StyledInputBase } from '../../utils/styles';
import PostsContext from '../../context/PostsContext';

const PostsFilter: React.FC = () => {
    const [filterValue, setFilterValue] = useState("");
    const context = useContext(PostsContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setFilterValue(newValue);
        if (context) {
            context.setFilterString(newValue); // Use newValue instead of filterValue
        }
    };

    return (
        <StyledInputBase
            placeholder="Filter by title"
            inputProps={{ 'aria-label': 'filter' }}
            value={filterValue}
            onChange={handleChange}
        />
    );
};

export { PostsFilter };