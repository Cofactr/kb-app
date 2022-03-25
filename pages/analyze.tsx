import { Box, Container, Stack } from "@mui/material";
import EntityStatsTable from "components/kb/EntityStatsTable";
import EventStatsTable from "components/kb/EventStatsTables";
import IntangibleStatsTable from "components/kb/IntangiblesStatsTables";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Page() {
    const { data, error } = useSWR(`/api/stats`, fetcher);
    const { entityCounts, eventCounts, intangibleCounts } = data || {};

    return (
        <>
            <Box
                sx={{
                    bgcolor: "background",
                    pt: 8,
                    pb: 6,
                }}
            >
                <Container maxWidth="sm">
                    <Stack spacing={4}>
                        {entityCounts && (
                            <EntityStatsTable entityCounts={entityCounts} />
                        )}
                        {intangibleCounts && (
                            <IntangibleStatsTable
                                intangibleCounts={intangibleCounts}
                            />
                        )}
                        {eventCounts && (
                            <EventStatsTable eventCounts={eventCounts} />
                        )}
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

export default Page;
