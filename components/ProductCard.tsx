// @ts-nocheck
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "components/Link";
import { Factory, Fingerprint, Description } from "@mui/icons-material";
import { TreeItemProps } from "@mui/lab/TreeItem";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { ElementType, ReactElement } from "react";
import theme from "styles/theme";

type StyledTreeItemProps = TreeItemProps & {
    labelIcon?: ElementType<SvgIconProps>;
    labelInfo?: string | ReactElement | null;
    label?: string | ReactElement | null;
};

function StyledTreeItem(props: StyledTreeItemProps) {
    const {
        labelIcon: LabelIcon,
        labelInfo,
        label,
        ...other
    } = props;

    return (
        <Box
            sx={{
                color: "#cacaca",
                display: "flex",
                alignItems: "center",
                p: 0.5,
                pr: 0,
            }}
        >
            <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
            {typeof label === "string" ? (
                <Typography
                    variant="body2"
                    sx={{ fontWeight: "inherit", flexGrow: 1 }}
                >
                    {label}
                </Typography>
            ) : (
                label
            )}
            {typeof label === "string" ? (
                <Typography variant="caption" color="inherit">
                    {labelInfo}
                </Typography>
            ) : (
                labelInfo
            )}
        </Box>
    );
}

function ProductCard({ id, statements: { description, image, manufacturer, manufacturer_part_num } }) {
  const mfr = (manufacturer || [])[0]?.mainsnak?.datavalue?.value?.text
  const mpn = (manufacturer_part_num || [])[0]?.mainsnak?.datavalue?.value
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
                  <CardMedia component="img" sx={{ width: 150, maxHeight: 150, marginY: "auto" }} image={img} />
              </Box>
              <Box>
                  <CardContent>
                      <StyledTreeItem labelIcon={Fingerprint} label={<Typography width={38}>cpid</Typography>} labelInfo={<Typography sx={{ mx: 1 }}>{id}</Typography>} />
                      <StyledTreeItem labelIcon={Fingerprint} label={<Typography width={38}>mpn</Typography>} labelInfo={<Typography sx={{ mx: 1 }}>{mpn}</Typography>} />
                      <StyledTreeItem labelIcon={Factory} label={<Typography width={38}>mfr</Typography>} labelInfo={<Typography sx={{ mx: 1 }}>{mfr}</Typography>} />
                      <StyledTreeItem labelIcon={Description} label={<Typography width={38}>desc</Typography>} labelInfo={<Typography sx={{ mx: 1 }}>{desc}</Typography>} />
                  </CardContent>
              </Box>
          </Box>
      </CardActionArea>
  </Card>
  )
}

export default ProductCard;
