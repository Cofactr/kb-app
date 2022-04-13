// @ts-nocheck
import {
    Box,
    ButtonGroup,
    Card,
    CardActionArea,
    CardContent,
    Container,
    IconButton,
    LinearProgress,
    Stack,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "components/Link";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import useAppStore from "store/useAppStore";

const tabs = [
    { label: "Products", slug: "products" },
    { label: "Organizations", slug: "orgs" },
];

function Page() {
    const { api } = useAppStore();
    const {
        asPath,
        query: { kind: curTabSlug },
    } = useRouter();
    const curTab = Math.max(
        0,
        tabs.findIndex(({ slug }) => slug === curTabSlug),
    );
    const [data, setData] = useState();
    const [nextPagePath, setNextPagePath] = useState<string>();
    const [previousPagePath, setPreviousPagePath] = useState<string>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            if (!curTabSlug) {
                return;
            }
            setIsLoading(true);

            setData(undefined);
            try {
                const res = await fetch(
                    `${api}/${asPath.replace("/browse/", "")}?render=false`,
                );
                const resJson = await res.json();
                const {
                    data,
                    paging: { next, previous },
                } = resJson;

                setData(data);
                setNextPagePath(next && `/browse${next}`);
                setPreviousPagePath(previous && `/browse${previous}`);
            } catch (error) {
                console.error("Handle request error.");
            }

            setIsLoading(false);
        }

        getData();
    }, [api, asPath, curTabSlug]);

    return (
        <Box sx={{ mb: 4 }}>
            <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                <Tabs value={curTab} centered>
                    {tabs.map(({ label, slug }, key) => {
                        return (
                            <Tab
                                key={key}
                                label={label}
                                sx={{ textTransform: "none" }}
                                component={Link}
                                href={`/browse/${slug}`}
                            />
                        );
                    })}
                </Tabs>
            </Box>
            <Container maxWidth="md">
                <Stack spacing={1} sx={{ mt: 2 }}>
                    {isLoading && (
                        <Box sx={{ width: "100%" }}>
                            <LinearProgress />
                        </Box>
                    )}
                    {data &&
                        data.map((p) => {
                            const { _id, descriptions } = p;
                            const id = _id["$oid"];

                            return (
                                <Card key={id}>
                                    <CardActionArea
                                        component={Link}
                                        noLinkStyle
                                        href={`/products/${id}`}
                                    >
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
                                                    {descriptions?.en?.value}
                                                </Typography>
                                            </Stack>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            );
                        })}
                    {data && (
                        <Box display="flex" justifyContent="center">
                            <ButtonGroup
                                variant="contained"
                                size="small"
                                aria-label="pagination controls"
                            >
                                <IconButton
                                    color="primary"
                                    aria-label="navigate to previous page"
                                    component={Link}
                                    href={previousPagePath || "/"}
                                    disabled={!previousPagePath}
                                >
                                    <NavigateBefore />
                                </IconButton>
                                <IconButton
                                    color="primary"
                                    aria-label="navigate to next page"
                                    component={Link}
                                    href={nextPagePath || "/"}
                                    disabled={!nextPagePath}
                                >
                                    <NavigateNext />
                                </IconButton>
                            </ButtonGroup>
                        </Box>
                    )}
                </Stack>
            </Container>
        </Box>
    );
}

export default Page;
