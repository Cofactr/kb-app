import { connectToDatabase } from "util/mongodb";

export default async function handler(req, res) {
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

    console.log("Hello");

    const stats = {
        // JSON.parse(JSON.stringify()),
        entityCounts: [
            { name: "Geopolitical Entity", count: gpeCount },
            { name: "Logistics Services", count: logisticsServiceCount },
            { name: "Organizations", count: orgCount },
            { name: "Products", count: productCount },
            { name: "Units", count: unitCount },
        ],
        eventCounts: [{ name: "Source Request", count: sourceRequestCount }],
        intangibleCounts: [
            { name: "Class", count: classCount },
            { name: "Offer", count: offerCount },
            { name: "Property", count: propertyCount },
        ],
    };

    res.status(200).json(stats);
}
