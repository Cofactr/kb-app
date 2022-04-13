// @ts-nocheck
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import {
    Box,
    ButtonGroup,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    IconButton,
    LinearProgress,
    Stack,
    Typography,
} from "@mui/material";
import Link from "components/Link";
import NoResultsMessage from "components/NoResultsMesssage";
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
                            data.map((p) => {
                                const { id, statements: { description, image } } = p;

                                const img = (image || [])[0]?.mainsnak?.datavalue?.value
                                const desc = description[0]?.mainsnak?.datavalue?.value?.text

                                return (
                                    <Card key={id}>
                                        <CardActionArea
                                            component={Link}
                                            noLinkStyle
                                            href={`/products/${id}`}
                                        >
                                            <Box sx={{ display: "flex" }}>
                                                <Box sx={{ display: "flex" }} >
                                                    <CardMedia component="img" sx={{ width: 150, maxHeight: 150 }} image={img} />
                                                </Box>
                                                <Box>
                                                    <CardContent>
                                                        <Stack spacing={0.5}>
                                                            <Stack
                                                                direction="row"
                                                                justifyContent="flex-start"
                                                                alignItems="center"
                                                                spacing={1}
                                                            >
                                                                <Typography
                                                                    gutterBottom
                                                                    variant="h6"
                                                                    component="div"
                                                                >
                                                                    {id}
                                                                </Typography>
                                                            </Stack>
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >
                                                                {
                                                                    desc
                                                                }
                                                            </Typography>
                                                        </Stack>
                                                    </CardContent>
                                                </Box>
                                            </Box>
                                        </CardActionArea>
                                    </Card>
                                );
                            })}
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

export default Page;
