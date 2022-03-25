import { Box, Container, Stack } from "@mui/material";
import EntityStatsTable, { EntityCounts } from "components/kb/EntityStatsTable";
import EventStatsTable, { EventCounts } from "components/kb/EventStatsTables";
import IntangibleStatsTable, {
    IntangibleCounts,
} from "components/kb/IntangiblesStatsTables";
import { connectToDatabase } from "util/mongodb";

function Page({
    entityCounts,
    eventCounts,
    intangibleCounts,
}: {
    entityCounts: EntityCounts;
    eventCounts: EventCounts;
    intangibleCounts: IntangibleCounts;
}) {
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
                        <EntityStatsTable entityCounts={entityCounts} />
                        <IntangibleStatsTable
                            intangibleCounts={intangibleCounts}
                        />
                        <EventStatsTable eventCounts={eventCounts} />
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

export async function getServerSideProps() {
    const { db } = await connectToDatabase();

    const gpeCount = await db.collection("entities.gpes").countDocuments({});
    const logisticsServiceCount = await db
        .collection("entities.logistics.services")
        .countDocuments({});
    const orgCount = await db.collection("entities.orgs").countDocuments({});
    const productCount = await db
        .collection("entities.products")
        .countDocuments({});
    const unitCount = await db.collection("entities.units").countDocuments({});

    const sourceRequestCount = await db
        .collection("events.source_requests")
        .countDocuments({});

    const classCount = await db
        .collection("intangibles.classes")
        .countDocuments({});
    const offerCount = await db
        .collection("intangibles.offers")
        .countDocuments({});
    const propertyCount = await db
        .collection("intangibles.properties")
        .countDocuments({});

    return {
        props: {
            // JSON.parse(JSON.stringify()),
            entityCounts: [
                { name: "Geopolitical Entity", count: gpeCount },
                { name: "Logistics Services", count: logisticsServiceCount },
                { name: "Organizations", count: orgCount },
                { name: "Products", count: productCount },
                { name: "Units", count: unitCount },
            ],
            eventCounts: [
                { name: "Source Request", count: sourceRequestCount },
            ],
            intangibleCounts: [
                { name: "Class", count: classCount },
                { name: "Offer", count: offerCount },
                { name: "Property", count: propertyCount },
            ],
        },
    };
}

export default Page;
