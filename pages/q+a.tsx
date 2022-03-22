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
                        TODO: Add an automated and prioritized feed of questions
                        about the data for the user to go through and answer.
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

export default Page;
