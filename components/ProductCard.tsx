// @ts-nocheck
import { Box, Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import Link from "components/Link";

function ProductCard({ id, statements: { description, image } }) {
  const img = (image || [])[0]?.mainsnak?.datavalue?.value
  const desc = (description || [])[0]?.mainsnak?.datavalue?.value?.text

  return (
    <Card key={id}>
      <CardActionArea
          component={Link}
          noLinkStyle
          href={`/products/${id}`}
      >
          <Box sx={{ display: "flex" }}>
              <Box sx={{ display: "flex" }} >
                  <CardMedia component="img" sx={{ width: 150, maxHeight: 150 }} image={img} />
              </Box>
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
                                  {id}
                              </Typography>
                          </Stack>
                          <Typography
                              variant="body2"
                              color="text.secondary"
                          >
                              {
                                  desc
                              }
                          </Typography>
                      </Stack>
                  </CardContent>
              </Box>
          </Box>
      </CardActionArea>
  </Card>
  )
}

export default ProductCard;
