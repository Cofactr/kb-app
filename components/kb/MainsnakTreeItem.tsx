// @ts-nocheck
import DataValue from "./DataValue";
import StyledTreeItem from "./StyledTreeItem";

function MainsnakTreeItem({
    nodeId,
    data: { datatype, datavalue, hash, property, snaktype },
    children,
}) {
    return (
        <StyledTreeItem
            nodeId={nodeId}
            label="claim"
            labelInfo={<DataValue datatype={datatype} data={datavalue} />}
        >
            {children}
        </StyledTreeItem>
    );
}
export default MainsnakTreeItem;
