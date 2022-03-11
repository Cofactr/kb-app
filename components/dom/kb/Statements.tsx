import { PlusSmIcon } from "@heroicons/react/solid";
import useItemStore from "store/useItemStore";
import Statement from "./Statement";

function Statements({ data }) {
    const { addStatement, selectedItemId } = useItemStore();

    const statements = Object.entries(data);

    return (
        <>
            <h2 className="text-base">Statements</h2>
            {statements.length > 0 && (
                <div className="space-y-2 mb-6">
                    {statements.map(([propId, claims]) => (
                        <Statement key={propId} propId={propId} data={claims} />
                    ))}
                </div>
            )}
            <button
                className="p-1 flex items-center text-blue-light hover:underline"
                onClick={() => addStatement(selectedItemId)}
            >
                <div className="w-4 h-4">
                    <PlusSmIcon />
                </div>
                <p className="text-sm">add statement</p>
            </button>
        </>
    );
}

export default Statements;
