import Search from "components/dom/Search";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { ChipIcon } from "@heroicons/react/solid";
import Link from "next/link";

const features = [
    {
        name: "Browse",
        description: "Explore the knowledge base",
        icon: ChipIcon,
        href: "/browse",
    },
];

function Page() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const searchInputRef = useRef(null);

    const executeSearch = (e) => {
        e.preventDefault();
        const newTerm = searchInputRef.current.value;

        if (newTerm) {
            router.push(`/search?q=${newTerm}`);
        }
    };

    return (
        <div className="App flex justify-center">
            <div className="max-w-screen-md mx-2">
                <div className="flex justify-center">
                    <div className="mt-56 w-[590px] mx-2">
                        <Search
                            searchInputRef={searchInputRef}
                            term={searchTerm}
                            setTerm={setSearchTerm}
                            executeSearch={executeSearch}
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <dl className="my-8 flex flex-wrap max-w-lg">
                        {features.map((feature) => (
                            <Link href={feature.href} key={feature.name}>
                                <a>
                                    <div className="p-2 border-2 border-white hover:border-gray-100 rounded-md">
                                        <dt>
                                            <div className="flex items-center justify-center h-12 w-12 rounded-md text-blue-light bg-gray-100">
                                                <feature.icon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <p className="mt-5 text-lg leading-6 font-medium text-gray-900">
                                                {feature.name}
                                            </p>
                                        </dt>
                                        <dd className="mt-2 text-sm text-gray-500 w-56">
                                            {feature.description}
                                        </dd>
                                    </div>
                                </a>
                            </Link>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}

export default Page;
