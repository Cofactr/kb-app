import Link from "next/link";
import { ReactNode } from "react";
import Bracket from "./Bracket";

function A({
    href,
    route,
    onClick,
    children,
}: {
    href: string;
    route: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    children: ReactNode;
}) {
    const isActive = route === href;

    return (
        <Link href={href}>
            <a onClick={onClick}>
                <Bracket isActive={isActive}>{children}</Bracket>
            </a>
        </Link>
    );
}

export default A;
