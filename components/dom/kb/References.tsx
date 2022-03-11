import {
    ChevronDownIcon,
    ChevronRightIcon,
    PlusSmIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import useItemStore from "store/useItemStore";
import Reference from "./Reference";

function References({ claimId, data, isEditMode }) {
    const [expandRefs, setExpandRefs] = useState(false);

    const { addReference, selectedItemId } = useItemStore();

    const refs = data || [];

    const num_refs = refs.length;

    return (
        <>
            <button
                className="flex items-center h-4"
                onClick={() => setExpandRefs(!expandRefs)}
            >
                <div className="w-4 h-4">
                    {expandRefs ? <ChevronDownIcon /> : <ChevronRightIcon />}
                </div>
                {`${num_refs} `}reference
                {num_refs == 1 || "s"}
            </button>
            {expandRefs && (
                <div className="ml-6">
                    {refs.map((reference, i) => (
                        // TODO: Consider using ref hash for key.
                        <div key={i} className="my-2">
                            <Reference
                                data={reference}
                                isEditMode={isEditMode}
                            />
                        </div>
                    ))}
                    {isEditMode && (
                        <button
                            className="flex items-center text-blue-light hover:underline"
                            onClick={() =>
                                addReference(selectedItemId, claimId)
                            }
                        >
                            <div className="w-4 h-4">
                                <PlusSmIcon />
                            </div>
                            <p className="text-sm">add reference</p>
                        </button>
                    )}
                </div>
            )}
        </>
    );
}

export default References;
