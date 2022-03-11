import { XIcon } from "@heroicons/react/solid";
import useItemStore from "store/useItemStore";
import Remove from "../Remove";
import Mainsnak from "./Mainsnak";
import References from "./References";

function Claim({ data, isEditMode }) {
    const { mainsnak, id, rank, references, type } = data || {};
    const { property } = mainsnak || {};

    const { removeClaim, selectedItemId } = useItemStore();

    return (
        <div className="px-4 py-2 border-y-2" key={property}>
            {isEditMode && (
                <Remove onClick={() => removeClaim(selectedItemId, id)} />
            )}
            <Mainsnak data={mainsnak} isEditMode={isEditMode} />
            <References
                claimId={id}
                data={references}
                isEditMode={isEditMode}
            />
        </div>
    );
}

export default Claim;
