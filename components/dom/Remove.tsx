import { XIcon } from "@heroicons/react/solid";

function Remove(props) {
    return (
        <button
            className="flex items-center text-blue-light hover:underline"
            {...props}
        >
            <div className="w-4 h-4">
                <XIcon />
            </div>
            <p className="text-sm">remove</p>
        </button>
    );
}

export default Remove;
