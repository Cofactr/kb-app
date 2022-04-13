// @ts-nocheck
import {
    Box,
    Container,
    LinearProgress,
    Stack,
} from "@mui/material";
import NoResultsMessage from "components/NoResultsMesssage";
import ProductCard from "components/ProductCard";
import SearchBar from "components/SearchBar";
import { executeSearch } from "lib/search";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import useAppStore from "store/useAppStore";

function Page() {
    const { api } = useAppStore();
    const router = useRouter();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const {
        query: { q },
    } = router;

    const queryStringInPath = typeof q === "string" ? q : "";

    const [query, setQuery] = useState(queryStringInPath);

    useEffect(() => {
        setQuery(queryStringInPath);
    }, [queryStringInPath]);

    const search = useCallback(
        (event) => executeSearch(router, query, event),
        [router, query],
    );

    useEffect(() => {
        async function getData() {
            if (!queryStringInPath) {
                return;
            }
            setIsLoading(true);

            setData(undefined);
            try {
                const res = await fetch(
                    `${api}/products?q=${queryStringInPath}&render=false`,
                );
                const resJson = await res.json();
                const {
                    data,
                    paging: { next, previous },
                } = resJson;

                setData(data);
            } catch (error) {
                console.error("Handle request error.");
            }

            setIsLoading(false);
        }

        getData();
    }, [queryStringInPath]);

    return (
        <>
            <Box
                sx={{
                    bgcolor: "background",
                    pt: 4,
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
                    </Stack>
                </Container>
                <Container maxWidth="md">
                    <Stack spacing={1} sx={{ mt: 2 }}>
                        {isLoading && (
                            <Box sx={{ width: "100%" }}>
                                <LinearProgress />
                            </Box>
                        )}
                        {!isLoading && !data && <NoResultsMessage />}
                        {data &&
                            data.map((p) => <ProductCard {...p} />)}
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

export default Page;
