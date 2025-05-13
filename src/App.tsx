import PostsViewer from './components/PostsViewer/PostsViewer';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { theme } from './utils/styles';
import Navbar from './components/Navbar/Navbar';
import PostsProvider from './providers/PostsProviders';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <PostsProvider>
                <Box sx={{ flexGrow: 1 }}>
                    <Navbar />
                </Box>
                <Box sx={{ mt: 12 }}>
                    <PostsViewer />
                </Box>
            </PostsProvider>
        </ThemeProvider>
    )
}
export default App
