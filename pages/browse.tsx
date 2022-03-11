import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const tabs = {
    products: { label: "Products", href: "#products" },
    organizations: { label: "Organizations", href: "#organizations" },
};

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function Page() {
    const [curTab, setCurTab] = useState();
    const [data, setData] = useState([]);

    const { asPath } = useRouter();

    useEffect(() => {
        async function getData() {
            const tab = asPath.replace(/\/browse\/?#?/, "") || "products";

            if (tab == curTab) {
                return;
            }
            setCurTab(tab);
            setData([]);

            const res = await fetch(`http://localhost:5000/${tab}`);
            const resJson = await res.json();
            const { data } = resJson;
            setData(data);
        }

        getData();
    }, [asPath]);

    useEffect(() => {}, []);

    return (
        <div className="text-gray-dark flex justify-center mt-4">
            <div className="w-full max-w-screen-md mx-2 space-y-4">
                <div className="block">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            {Object.entries(tabs).map(([tabKey, tabValue]) => (
                                <Link href={tabValue.href} key={tabKey}>
                                    <a
                                        className={classNames(
                                            tabKey == curTab
                                                ? "border-blue-light text-blue-light"
                                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                            "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm",
                                        )}
                                    >
                                        {tabValue.label}
                                    </a>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
                {data &&
                    data.map((p) => {
                        const id = p._id["$oid"];
                        const label = p.labels.en.value;

                        return (
                            <div key={label}>
                                <dt>
                                    <Link href={`/${curTab}/${id}`} key={label}>
                                        <a className="text-lg leading-6 font-medium text-blue-light hover:underline">
                                            {label}
                                        </a>
                                    </Link>
                                </dt>
                                <dd className="mt-1 text-sm text-gray-500">
                                    {p.descriptions?.en?.value}
                                </dd>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default Page;
