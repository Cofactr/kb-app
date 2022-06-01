import * as React from "react";
import Grid from "@mui/material/Grid";
import {
    Card,
    CardActionArea,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";
import Link from "./Link";
import {
    AutoStories,
    BarChart,
    Memory,
    QuestionAnswer,
} from "@mui/icons-material";

const features = [
    {
        name: "Browse",
        description: "Explore the knowledge base",
        href: "/browse/products",
        icon: Memory,
    },
    {
        name: "Q&A",
        description: "Answer questions about the data",
        href: "/answer",
        icon: QuestionAnswer,
    },
    {
        name: "Analyze",
        description: "View key data metrics",
        href: "/analyze",
        icon: BarChart,
    },
    {
        name: "Read",
        description: "Learn about this system",
        href: "/read",
        icon: AutoStories,
    },
];

function AppGrid() {
    return (
        <Grid container justifyContent="center">
            {features.map((f) => (
                <Grid key={f.name} item sx={{ margin: 1 }}>
                    <Card sx={{ width: 200 }}>
                        <CardActionArea
                            component={Link}
                            noLinkStyle
                            href={f.href}
                        >
                            <CardContent>
                                <Stack spacing={0.5}>
                                    <Stack
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        spacing={1}
                                    >
                                        <f.icon
                                            sx={{ height: "2rem" }}
                                            color="secondary"
                                        />
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            component="div"
                                        >
                                            {f.name}
                                        </Typography>
                                    </Stack>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {f.description}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default AppGrid;
