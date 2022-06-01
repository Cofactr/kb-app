// @ts-nocheck
import {
    Box,
    ButtonGroup,
    Container,
    IconButton,
    LinearProgress,
    Stack,
    Tab,
    Tabs,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "components/Link";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import useAppStore from "store/useAppStore";
import ProductCard from "components/ProductCard";
import OrgCard from "components/OrgCard";

const tabs = [
    { label: "Products", slug: "products" },
    { label: "Organizations", slug: "orgs" },
];

const cards = {
    products: ProductCard,
    orgs: OrgCard,
}

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

            let path = asPath.replace("/browse/", "")
            let targetRoute = `${path}${path.includes("?") ? "&" : "?"}schema=internal`

            try {
                const res = await fetch(`${api}/${targetRoute}`);
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

    const EntityCard = cards[curTabSlug];

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
                            data.map((e) => <EntityCard key={e.id} {...e} />)}
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
                                    href={`${previousPagePath}` || "/"}
                                    disabled={!previousPagePath}
                                >
                                    <NavigateBefore />
                                </IconButton>
                                <IconButton
                                    color="primary"
                                    aria-label="navigate to next page"
                                    component={Link}
                                    href={`${nextPagePath}` || "/"}
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
