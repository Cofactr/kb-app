import Label from "./Label";

function Labels({ data }) {
    return (
        <>
            {Object.entries(data).map(([key, value]) => {
                return <Label key={key} data={value} />;
            })}
        </>
    );
}

export default Labels;
