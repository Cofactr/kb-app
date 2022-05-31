import create from "zustand";

interface AppState {
    api: string;
    apiOptions: Map<string, string>;
    setApi: (api: string) => void;
}

const useAppStore = create<AppState>((set) => ({
    api: "https://graph.cofactr.com",
    apiOptions: new Map([
        ["http://localhost:7000", "Dev"],
        ["https://graph.cofactr.com", "Prod"],
    ]),
    setApi: (api) => set(() => ({ api })),
}));

export default useAppStore;
