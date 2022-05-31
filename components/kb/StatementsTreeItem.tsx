// @ts-nocheck
import { Info } from "@mui/icons-material";
import { propIdToIcon } from "./config";
import MainsnakTreeItem from "./MainsnakTreeItem";
import StyledTreeItem from "./StyledTreeItem";

function StatementsTreeItem({ data }) {
    const statements = data ? Object.entries(data) : [];

    return (
        <StyledTreeItem nodeId="statements" label="statements" labelIcon={Info}>
            {statements.map(([propId, statements]) => (
                <StyledTreeItem
                    key={propId}
                    nodeId={propId}
                    label={propId}
                    labelIcon={propIdToIcon[propId] || Info}
                >
                    {statements.map(({ mainsnak, rank, references }, key) => {
                        return (
                            <MainsnakTreeItem
                                key={key}
                                nodeId={key}
                                data={mainsnak}
                            >
                                {/* Rank, refs */}
                            </MainsnakTreeItem>
                        );
                    })}
                </StyledTreeItem>
            ))}
        </StyledTreeItem>
    );
}

export default StatementsTreeItem;
