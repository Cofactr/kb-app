import { ReactNode } from "react";

function Bracket({
    isActive,
    children,
}: {
    isActive: boolean;
    children: ReactNode;
}) {
    return (
        <div className="group flex">
            <div className={isActive ? "bracket-active" : "bracket-left"}>
                [
            </div>
            <span className="capitalize">{children}</span>
            <div className={isActive ? "bracket-active" : "bracket-right"}>
                ]
            </div>
        </div>
    );
}

export default Bracket;
