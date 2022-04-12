import create from "zustand";

interface AppState {
    api: string;
    apiOptions: Map<string, string>;
    setApi: (api: string) => void;
}

const PROD_API_URL = "https://graph.cofactr.com"

const useAppStore = create<AppState>((set) => ({
    api: PROD_API_URL,
    apiOptions: new Map([
        ["http://localhost:8000", "Dev"],
        [PROD_API_URL, "Prod"],
    ]),
    setApi: (api) => set(() => ({ api })),
}));

export default useAppStore;
