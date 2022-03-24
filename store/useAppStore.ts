import create from "zustand";

interface AppState {
    api: string;
    apiOptions: Map<string, string>;
    setApi: (api: string) => void;
}

const useAppStore = create<AppState>((set) => ({
    api: "https://kb-api-37536907ae76e987.onporter.run",
    apiOptions: new Map([
        ["http://localhost:8000", "Dev"],
        ["https://kb-api-37536907ae76e987.onporter.run", "Prod"],
    ]),
    setApi: (api) => set(() => ({ api })),
}));

export default useAppStore;
