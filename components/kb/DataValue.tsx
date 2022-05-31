// @ts-nocheck
import { Typography } from "@mui/material";
import Link from "components/Link";

function String({ value }) {
    return (
        <Typography variant="body2" sx={{ fontWeight: "inherit", flexGrow: 1 }}>
            {value}
        </Typography>
    );
}

function Url({ value }) {
    return (
        <Typography
            variant="body2"
            component={Link}
            href={value}
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
        >
            {value}
        </Typography>
    );
}

function MonolingualText({ value: { text, language } }) {
    return (
        <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
        >
            {text}
        </Typography>
    )
}

const DataTypeToComponent = {
    external_id: String,
    string: String,
    url: Url,
    monolingual_text: MonolingualText,
};

function DataValue({ datatype, data: { type, value } }) {
    const Value = DataTypeToComponent[type] || String;

    return <Value value={value} />;
}

export default DataValue;
