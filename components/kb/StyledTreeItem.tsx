import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeItem, { TreeItemProps, treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { ElementType, ReactElement } from "react";

declare module "react" {
    interface CSSProperties {
        "--tree-view-focus-color"?: string;
        "--tree-view-focus-bg-color"?: string;
    }
}

type StyledTreeItemProps = TreeItemProps & {
    focusBgColor?: string;
    focusColor?: string;
    labelIcon?: ElementType<SvgIconProps>;
    labelInfo?: string | ReactElement | null;
    label?: string | ReactElement | null;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        "&.Mui-expanded": {
            fontWeight: theme.typography.fontWeightRegular,
        },
        "&:hover": {
            backgroundColor: theme.palette.action.hover,
        },
        "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
            backgroundColor: `var(--tree-view-focus-bg-color, ${theme.palette.action.selected})`,
            color: "var(--tree-view-focus-color)",
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: "inherit",
            color: "inherit",
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 0,
        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2),
        },
    },
}));

function StyledTreeItem(props: StyledTreeItemProps) {
    const {
        focusBgColor,
        focusColor,
        labelIcon: LabelIcon,
        labelInfo,
        label,
        ...other
    } = props;

    return (
        <StyledTreeItemRoot
            label={
                <Box
                    sx={{
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
            }
            style={{
                // TODO: Should use the theme variables.
                "--tree-view-focus-color": focusColor,
                "--tree-view-focus-bg-color": focusBgColor,
            }}
            {...other}
        />
    );
}

export default StyledTreeItem;
