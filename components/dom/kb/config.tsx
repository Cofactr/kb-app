const props = [
    { id: "digikey_part_num", label: "Digi-Key part number" },
    { id: "mouser_part_num", label: "Mouser part number" },
    { id: "ref_url", label: "ref URL" },
    { id: "retrieved", label: "retrieved" },
];
const propIdToLabel = props.reduce(
    (ret, { id, label }) => ({ ...ret, [id]: label }),
    {},
);
const propLabelToId = props.reduce(
    (ret, { id, label }) => ({ ...ret, [label]: id }),
    {},
);

export { props, propIdToLabel, propLabelToId };
