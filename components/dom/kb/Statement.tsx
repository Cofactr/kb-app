import {
    CheckIcon,
    PencilIcon,
    PlusSmIcon,
    XIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import useItemStore from "store/useItemStore";
import Remove from "../Remove";
import Claim from "./Claim";
import { propIdToLabel } from "./config";
import Prop from "./Prop";

const validateProperty = ({ prop: { id } }) => Boolean(propIdToLabel[id]);

function Statement({ propId, data }) {
    const [isEditMode, setIsEditMode] = useState(propId.startsWith("temp_"));
    const [prop, setProp] = useState({
        id: propId,
        label: propIdToLabel[propId] || "",
    });

    const { addClaim, removeStatement, selectedItemId } = useItemStore();

    const isPropValid = validateProperty({ prop });
    const hasClaim = data.length > 0;

    const isValid = isPropValid && hasClaim;

    const enterEditMode = () => setIsEditMode(true);
    const exitEditMode = () => setIsEditMode(false);

    const save = () => {
        // TODO: Save to db.
        exitEditMode();
    };

    const remove = () => removeStatement(selectedItemId, propId);

    return (
        <div className="flex">
            <div className="w-full">
                <div className="w-full bg-gray-100 text-sm">
                    <div className="p-1">
                        {isEditMode ? (
                            <div className="flex space-x-2">
                                <button
                                    className="flex items-center text-blue-light hover:underline disabled:opacity-50"
                                    onClick={save}
                                    disabled={!isValid}
                                >
                                    <div className="w-4 h-4">
                                        <CheckIcon />
                                    </div>
                                    <p className="text-sm">save</p>
                                </button>
                                <Remove onClick={remove} />
                            </div>
                        ) : (
                            <button
                                className="ml-2 flex items-center text-blue-light hover:underline"
                                onClick={enterEditMode}
                            >
                                <div className="w-4 h-4">
                                    <PencilIcon />
                                </div>
                                <p className="text-sm">edit</p>
                            </button>
                        )}
                    </div>
                    <Prop
                        prop={prop}
                        setProp={setProp}
                        isEditMode={isEditMode}
                        isValid={isPropValid}
                    />
                    {data.map((claim, i) => (
                        <Claim
                            key={`${propId}${i}`}
                            data={claim}
                            isEditMode={isEditMode}
                        />
                    ))}
                    {isEditMode && (
                        <div>
                            <button
                                className="p-1 flex items-center text-blue-light hover:underline"
                                onClick={() => addClaim(selectedItemId, propId)}
                            >
                                <div className="w-4 h-4">
                                    <PlusSmIcon />
                                </div>
                                <p className="text-sm">add claim</p>
                            </button>
                            {hasClaim || (
                                <p className="pl-2 text-sm text-red">
                                    Add at least one claim.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Statement;
