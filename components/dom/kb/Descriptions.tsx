import Description from "./Description";

function Descriptions({ data }) {
    return (
        <>
            {Object.entries(data).map(([key, value]) => {
                return <Description key={key} data={value} />;
            })}
        </>
    );
}

export default Descriptions;
