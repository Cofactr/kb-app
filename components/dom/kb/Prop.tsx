import useItemStore from "store/useItemStore";
import Select from "../Select";
import { propIdToLabel, props } from "./config";

function Prop({ prop, setProp, isEditMode, isValid }) {
    const { items, selectedItemId } = useItemStore();

    const { claims } = items.get(selectedItemId) || {};

    const usedPropIds = new Set([...Object.keys(claims)]);

    const propOptions = props.filter((x) => !usedPropIds.has(x.id));

    return (
        <div className="bg-gray-200 p-2 flex items-center">
            {isEditMode ? (
                <div>
                    <div className="flex items-center">
                        <Select
                            label="property"
                            selected={prop}
                            setSelected={setProp}
                            options={propOptions}
                        />
                    </div>
                    {isEditMode &&
                        (isValid || (
                            <p
                                className="mt-2 text-sm text-red"
                                id="email-error"
                            >
                                Select a valid property.
                            </p>
                        ))}
                </div>
            ) : (
                <p className="text-sm">{prop.label}</p>
            )}
        </div>
    );
}

export default Prop;
