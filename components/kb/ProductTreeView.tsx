// @ts-nocheck
import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { AccessTime, Fingerprint, Info } from "@mui/icons-material";
import DescriptionsTreeItem from "./DescriptionsTreeItem";
import StyledTreeItem from "./StyledTreeItem";
import StatementsTreeItem from "./StatementsTreeItem";

function ProductTreeView({
    data: {
        id,
        statements,
    },
}) {
    return (
        <TreeView
            aria-label="gmail"
            defaultExpanded={["3"]}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
        >
            <StyledTreeItem
                nodeId="id"
                label="id"
                labelIcon={Fingerprint}
                labelInfo={id}
            />
            {/* <StyledTreeItem
                nodeId="modified"
                label="modified"
                labelIcon={AccessTime}
                labelInfo={modified}
            /> */}
            <StatementsTreeItem data={statements} />
        </TreeView>
    );
}

export default ProductTreeView;
