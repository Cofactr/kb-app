import { useState } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Select({ label, selected, setSelected, options }) {
    const [query, setQuery] = useState(selected.label);

    const filteredValues =
        query === ""
            ? options
            : options.filter((o) => {
                  return o.label.toLowerCase().includes(query.toLowerCase());
              });

    return (
        <Combobox as="div" value={selected} onChange={setSelected}>
            <Combobox.Label className="block text-sm font-medium text-gray-dark">
                {label}
            </Combobox.Label>
            <div className="relative mt-1">
                <Combobox.Input
                    className="w-full rounded-md border border-gray-300 bg-white py-1 pl-3 pr-10 shadow-sm focus:border-blue-light focus:outline-none focus:ring-1 focus:ring-blue-light sm:text-sm"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(o) => o.label}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <SelectorIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </Combobox.Button>

                {filteredValues.length > 0 && (
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredValues.map((o) => {
                            const isSelected = o.id == selected.id;
                            return (
                                <Combobox.Option
                                    key={o.id}
                                    value={o}
                                    className={() =>
                                        classNames(
                                            "list-none relative cursor-default select-none py-1 pl-8 pr-4",
                                            isSelected
                                                ? "bg-blue-light text-white"
                                                : "text-gray-dark",
                                        )
                                    }
                                >
                                    {() => (
                                        <>
                                            <span
                                                className={classNames(
                                                    "block truncate",
                                                    selected && "font-semibold",
                                                )}
                                            >
                                                {o.label}
                                            </span>

                                            {isSelected && (
                                                <span
                                                    className={classNames(
                                                        "absolute inset-y-0 left-0 flex items-center pl-1.5",
                                                        isSelected
                                                            ? "text-white"
                                                            : "text-blue-light",
                                                    )}
                                                >
                                                    <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            )}
                                        </>
                                    )}
                                </Combobox.Option>
                            );
                        })}
                    </Combobox.Options>
                )}
            </div>
        </Combobox>
    );
}
