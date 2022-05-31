import create from "zustand";

interface AppState {
    api: string;
    apiOptions: Map<string, string>;
    setApi: (api: string) => void;
}

const DEV_API_URL = "http://localhost:7000"
const PROD_API_URL = "https://graph.cofactr.com"

const useAppStore = create<AppState>((set) => ({
    api: PROD_API_URL,
    apiOptions: new Map([
        [DEV_API_URL, "Dev"],
        [PROD_API_URL, "Prod"],
    ]),
    setApi: (api) => set(() => ({ api })),
}));

export default useAppStore;
