import { useRouter } from "next/router";
import { KeyboardEvent, useCallback, useRef, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import AppGrid from "components/AppGrid";
import SearchBar from "components/SearchBar";
import { executeSearch } from "lib/search";

function Page() {
    const router = useRouter();
    const [query, setQuery] = useState("");

    const search = useCallback(
        (event) => executeSearch(router, query, event),
        [router, query],
    );

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
                        <SearchBar
                            query={query}
                            setQuery={setQuery}
                            executeSearch={search}
                        />
                        <AppGrid />
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

// TODO: Hooks for fetching data from the API?

export default Page;
