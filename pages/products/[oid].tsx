// @ts-nocheck
import { Box, Container, LinearProgress, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useKbStore from "store/useKbStore";
import ProductTreeView from "components/kb/ProductTreeView";
import useAppStore from "store/useAppStore";

function Page() {
    const { api } = useAppStore();
    const { addEntity, kb, selectEntity } = useKbStore();

    const {
        query: { oid },
    } = useRouter();
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            if (!oid) {
                return;
            }
            setIsLoading(true);

            setData({});
            try {
                const res = await fetch(`${api}/products/${oid}`);
                const resJson = await res.json();
                const { data } = resJson;

                setData(data);
            } catch (error) {
                console.error(error);
            }

            setIsLoading(false);
        }

        getData();
    }, [api, oid]);

    useEffect(() => {
        if (!data) {
            return;
        }
        addEntity(data);
        selectEntity(data._id);
    }, [addEntity, data, selectEntity]);

    const entity = data?._id && kb.get(data._id);

    return (
        <>
            <Container maxWidth="md">
                <Stack spacing={1} sx={{ mt: 2 }}>
                    {isLoading && (
                        <Box sx={{ width: "100%" }}>
                            <LinearProgress />
                        </Box>
                    )}
                    {entity && <ProductTreeView data={entity} />}
                </Stack>
            </Container>
            {/* <Container
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
            >
                <AppBar position="static" color="transparent">
                    <Toolbar variant="dense">modified</Toolbar>
                </AppBar>
            </Container> */}
        </>
    );
}

export default Page;
