import { Box, Container, Stack } from "@mui/material";

function Page() {
    return (
        <>
            <Box
                sx={{
                    bgcolor: "background",
                    pt: 24,
                    pb: 6,
                }}
            >
                <Container maxWidth="sm">
                    <Stack spacing={4}>
                        TODO: Add a switch for dev/prod API
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

export default Page;
