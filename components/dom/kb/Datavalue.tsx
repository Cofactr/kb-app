const typeToValueComponent = {
    string: ({ data }) => <p>{data}</p>,
};

function Default({ data, isEditMode }) {
    const { type, value } = data || {};
    const Value = typeToValueComponent[type];

    return (
        <div key={value} className="p-2">
            {isEditMode ? (
                <div>
                    {/* <label>value</label> */}
                    <input
                        type="text"
                        name="value"
                        id="value"
                        className="block rounded-md border border-gray-300 bg-white py-1 px-3 shadow-sm focus:border-blue-light focus:outline-none focus:ring-1 focus:ring-blue-light sm:text-sm"
                        placeholder="value"
                        value={value}
                        onChange={() => console.log("change value")}
                    />
                </div>
            ) : (
                <Value data={value} />
            )}
        </div>
    );
}

function Time({ data: { type, value }, isEditMode }) {
    const date = value["$date"];

    return (
        <div key={date} className="p-2">
            {isEditMode ? (
                <div>
                    {/* <label>value</label> */}
                    <input
                        type="text"
                        name="value"
                        id="value"
                        className="block rounded-md border border-gray-300 bg-white py-1 px-3 shadow-sm focus:border-blue-light focus:outline-none focus:ring-1 focus:ring-blue-light sm:text-sm"
                        placeholder="value"
                        value={date}
                        onChange={() => console.log("change value")}
                    />
                </div>
            ) : (
                <>{date}</>
            )}
        </div>
    );
}

const _datatypeToDatavalueComponent = { time: Time };
const datatypeToDatavalueComponent = (datatype) =>
    _datatypeToDatavalueComponent[datatype] || Default;

export { datatypeToDatavalueComponent };
