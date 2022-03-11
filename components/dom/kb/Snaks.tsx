import Snak from "./Snak";

function Snaks({ data, isEditMode, order }) {
    const snaks = {};

    if (!data) {
        return [];
    }

    Object.entries(data).forEach(([propId, snak]) => {
        snaks[propId] = (
            <Snak
                key={propId}
                propId={propId}
                data={snak}
                isEditMode={isEditMode}
            />
        );
    });

    return order.map((key) => snaks[key]);
}

export default Snaks;
