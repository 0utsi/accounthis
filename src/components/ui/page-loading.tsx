import { Box, CircularProgress } from '@mui/material';

function PageLoading() {
    return (
        <Box className="h-screen xy-center">
            <CircularProgress size={60} />
        </Box>
    );
}

export default PageLoading;
