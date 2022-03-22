// @ts-nocheck
import DescriptionIcon from "@mui/icons-material/Description";
import StyledTreeItem from "./StyledTreeItem";

function DescriptionsTreeItem({ data }) {
    return (
        <StyledTreeItem
            nodeId="descriptions"
            label="descriptions"
            labelIcon={DescriptionIcon}
        >
            {Object.entries(data).map(([key, { language, value }]) => {
                return (
                    <StyledTreeItem
                        key={key}
                        nodeId={key}
                        label="claim"
                        labelInfo={value}
                    >
                        <StyledTreeItem
                            nodeId="55"
                            label="language"
                            labelInfo={language}
                        />
                    </StyledTreeItem>
                );
            })}
        </StyledTreeItem>
    );
}

export default DescriptionsTreeItem;
