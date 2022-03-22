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
                        TODO: Add docs. Field/property definitions should be in
                        the database.
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

export default Page;
