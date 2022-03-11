import useItemStore from "store/useItemStore";
import Remove from "../Remove";
import Snaks from "./Snaks";

function Reference({ data, isEditMode }) {
    const { hash, snaks, snaks_order } = data;
    const { removeReference, selectedItemId } = useItemStore();

    return (
        <div>
            <div>
                <Remove onClick={() => removeReference(selectedItemId, hash)} />
            </div>
            <div className="bg-gray-200 p-2">
                <Snaks
                    data={snaks}
                    isEditMode={isEditMode}
                    order={snaks_order}
                />
            </div>
        </div>
    );
}

export default Reference;
