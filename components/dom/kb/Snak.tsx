import { propIdToLabel } from "./config";
import { datatypeToDatavalueComponent } from "./Datavalue";

function Prop({ data, isEditMode }) {
    const { datatype, datavalue, hash, property, snaktype } = data || {};
    const Datavalue = datatypeToDatavalueComponent(datatype);
    return <Datavalue data={datavalue} isEditMode={isEditMode} />;
}

function Snak({ propId, data, isEditMode }) {
    return Object.entries(data).map(([i, prop]) => {
        return (
            <div key={i}>
                <>{propIdToLabel[propId]}</>
                <Prop data={prop} isEditMode={isEditMode} />
            </div>
        );
    });
}
// function Snak() {
//     Object.entries(reference.snaks).map(
//         ([prop, values]) => {
//             const C = prop_to_component[prop];

//             return C ? (
//                 <div key={prop}>
//                     <C data={values} />
//                 </div>
//             ) : (
//                 <div className="text-red">{`Prop "${prop}" is unsupported`}</div>
//             );
//         },
//     )
// }

export default Snak;
