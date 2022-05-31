// @ts-nocheck
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

function OrgCard({ labels }) {
  const label = labels?.en?.value;

  return (
    <Card key={label}>
        <Box sx={{ display: "flex" }}>
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
                                {label}
                            </Typography>
                        </Stack>
                    </Stack>
                </CardContent>
            </Box>
        </Box>
  </Card>
  )
}

export default OrgCard;
