import Aliases from "./Aliases";
import Descriptions from "./Descriptions";
import Labels from "./Labels";
import Statements from "./Statements";

function Item({ data }) {
    const { aliases, claims, descriptions, labels } = data;

    return (
        <div className="flex justify-center pb-6">
            <div className="w-full max-w-screen-md text-gray-dark">
                <div className="w-full">
                    <div className="text-sm">
                        <Labels data={labels} />
                    </div>
                    <div className="text-sm mt-2">
                        <Descriptions data={descriptions} />
                    </div>
                    <div className="text-sm mt-2">
                        <Aliases data={aliases} />
                    </div>
                    <div className="mt-8">
                        <Statements data={claims} />
                    </div>
                    <p className="text-sm text-gray-500 mt-6">{`This page was last modified on ${data.modified["$date"]}`}</p>
                </div>
            </div>
        </div>
    );
}

export default Item;
