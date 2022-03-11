import { GlobeAltIcon } from "@heroicons/react/solid";
import A from "components/dom/A";
import Link from "next/link";
import { ReactElement, ReactNode, useEffect, useState } from "react";

function hideBody() {
    const body = document.querySelector("body");

    if (body) {
        body.style.overflow = "hidden";
        body.style.height = "100%";
    }
}

function showBody() {
    const body = document.querySelector("body");

    if (body) {
        body.style.overflow = "auto";
        body.style.height = "auto";
    }
}

function Navigation({ route }: { route: string }) {
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

    useEffect(() => {
        if (isNavMenuOpen) {
            hideBody();
        } else {
            showBody();
        }
    }, [isNavMenuOpen]);

    const navEls: [string, ReactElement][] = [
        ["/", <p key="home">Home</p>],
        [
            "/system",
            <>
                <div className="flex">
                    <div className="w-4 mr-1">
                        <GlobeAltIcon />
                    </div>
                    System
                </div>
            </>,
        ],
    ];

    return (
        <nav className="z-40 absolute top-0 left-0 right-0">
            <div className="h-[length:var(--nav-height)] flex justify-between text-sm px-5 py-3">
                <Link href="/">
                    <a
                        className="flex items-center"
                        onClick={(_) => setIsNavMenuOpen((_) => false)}
                    >
                        <p
                            className="text-2xl ml-2 text-blue-light mono"
                            style={{
                                fontSize: "1.4rem",
                                letterSpacing: "0.12rem",
                                fontWeight: "400",
                            }}
                        >
                            cofactr
                        </p>
                    </a>
                </Link>
                {/* Wide nav */}
                <div className="hidden md:flex w-2/3 justify-end items-center text-gray-800 font-mono space-x-6">
                    {navEls.map(([href, page]) => {
                        return (
                            <A key={`${href}`} href={href} route={route}>
                                {page}
                            </A>
                        );
                    })}
                </div>
                {/* Hamburger nav */}
                <div className="z-50 h-5 w-5 my-auto">
                    {isNavMenuOpen ? (
                        <div className="md:hidden">
                            <button
                                className="text-blue-light"
                                onClick={(_) => setIsNavMenuOpen((_) => false)}
                            >
                                <svg
                                    className="fill-current block w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 17 17"
                                    fill="none"
                                >
                                    <path
                                        d="M1.1001 16.1001L16.1001 1.1001"
                                        stroke="#48D597"
                                    />
                                    <path
                                        d="M1.1001 1.1001L16.1001 16.1001"
                                        stroke="#48D597"
                                    />
                                </svg>
                            </button>
                            <div className="z-40 block absolute top-[length:var(--nav-height)] left-0 w-screen h-screen bg-gray-light opacity-90" />
                            <div className="z-50 block absolute top-[length:var(--nav-height)] left-0 right-0 bottom-0">
                                <div className="w-full h-full">
                                    <div className="border-t-[1px] border-b-[1px] border-gray-600">
                                        <div className="w-full bg-gray-light divide-y divide-gray-600 text-gray-800 font-mono">
                                            {navEls.map(([href, page]) => {
                                                <div
                                                    key={page}
                                                    className="px-4 py-3"
                                                >
                                                    <A
                                                        href={href}
                                                        route={route}
                                                        onClick={(_) =>
                                                            setIsNavMenuOpen(
                                                                (_) => false,
                                                            )
                                                        }
                                                    >
                                                        <div className="flex">
                                                            {page}
                                                        </div>
                                                    </A>
                                                </div>;
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            className="text-green md:hidden"
                            onClick={(_) => setIsNavMenuOpen((_) => true)}
                        >
                            <svg
                                className="fill-current block w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 17 17"
                                fill="none"
                            >
                                <path d="M16 2H1V3H16V2Z" fill="#48D597" />
                                <path d="M16 8H1V9H16V8Z" fill="#48D597" />
                                <path d="M16 14H1V15H16V14Z" fill="#48D597" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

function MainLayout({
    route,
    children,
}: {
    route: string;
    children: ReactNode;
}) {
    return (
        <div style={{ minWidth: "20rem" }}>
            <div className="w-full">
                <Navigation route={route} />
                <main className="absolute top-0 left-0 w-screen h-screen pt-[length:var(--nav-height)]">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default MainLayout;
