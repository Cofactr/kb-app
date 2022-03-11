import Search from "components/dom/Search";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

function Page() {
    const router = useRouter();
    const {
        query: { q },
    } = router;
    const [searchTerm, setSearchTerm] = useState(router.query.q);

    useEffect(() => {
        setSearchTerm(q);
    }, [q]);

    const searchInputRef = useRef(null);

    const executeSearch = (e) => {
        e.preventDefault();
        const newTerm = searchInputRef.current.value;

        if (newTerm) {
            router.push(`/search?q=${newTerm}`);
        }
    };

    return (
        <div>
            <div className="h-full w-full flex justify-center">
                <div className="mt-8 w-[590px] mx-2">
                    <Search
                        searchInputRef={searchInputRef}
                        term={searchTerm}
                        setTerm={setSearchTerm}
                        executeSearch={executeSearch}
                    />
                </div>
            </div>
        </div>
    );
}

export default Page;
