import { useContext } from "react";
import { Container, AppBar, Toolbar } from '@mui/material';
import { Search, SearchIcon, SearchIconWrapper } from '../../utils/styles';
import { PostsFilter } from '../PostsFilter/PostsFilter';
import PostsContext from '../../context/PostsContext';

const Navbar = () => {
    const context = useContext(PostsContext);

    const handleSearchClick = () => {
        if (context) {
            context.filterPosts(context.filterString);
        }
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Container maxWidth="md">
                    <Search>
                        <PostsFilter />
                        <SearchIconWrapper 
                            data-testid="search-button"
                            onClick={handleSearchClick}
                            style={{ cursor: 'pointer' }}>
                            <SearchIcon />
                        </SearchIconWrapper>
                    </Search>
                </Container>
            </Toolbar>
        </AppBar >
    )
}

export default Navbar;