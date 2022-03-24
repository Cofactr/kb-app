import {
    Box,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
} from "@mui/material";
import useAppStore from "store/useAppStore";

function Page() {
    const { api, apiOptions, setApi } = useAppStore();

    const apiLabelToUrl = new Map(
        Array.from(apiOptions).map(([k, v]) => [v, k]),
    );

    const handleChange = (event: SelectChangeEvent<string>) => {
        const {
            target: { value },
        } = event;
        setApi(apiLabelToUrl.get(value) || "Prod");
    };

    return (
        <>
            <Box
                sx={{
                    bgcolor: "background",
                    pt: 24,
                    pb: 6,
                }}
            >
                <Container maxWidth="sm">
                    <Stack spacing={4}>
                        <FormControl sx={{ width: 100 }}>
                            <InputLabel id="demo-simple-select-label">
                                API
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={apiOptions.get(api)}
                                label="API"
                                onChange={handleChange}
                            >
                                {Array.from(apiOptions.values()).map(
                                    (label) => (
                                        <MenuItem key={label} value={label}>
                                            {label}
                                        </MenuItem>
                                    ),
                                )}
                            </Select>
                        </FormControl>
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

export default Page;
