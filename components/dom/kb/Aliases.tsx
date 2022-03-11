import Alias from "./Alias";

function Aliases({ data }) {
    return (
        <>
            {Object.entries(data).map(([key, value]) => {
                return <Alias key={key} data={value} />;
            })}
        </>
    );
}

export default Aliases;
