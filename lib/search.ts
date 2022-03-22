import { NextRouter } from "next/router";
import { KeyboardEvent } from "react";

const executeSearch = (
    router: NextRouter,
    query: string,
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
    event.preventDefault();

    if (query) {
        router.push(`/search?q=${query}`);
    }
};

export { executeSearch}