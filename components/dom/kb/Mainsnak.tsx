import { datatypeToDatavalueComponent } from "./Datavalue";

function Mainsnak({ data, isEditMode }) {
    const { datatype, datavalue, property, snaktype } = data || {};

    const Datavalue = datatypeToDatavalueComponent(datatype);

    return <Datavalue data={datavalue} isEditMode={isEditMode} />;
}

export default Mainsnak;
