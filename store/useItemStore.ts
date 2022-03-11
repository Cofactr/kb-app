import { Item, OID } from "types/types";
import create from "zustand";
import { v4 as uuidv4 } from "uuid";

interface ItemState {
    items: Map<OID, Item>;
    addItem: (item: Item) => void;
    deleteItem: (id: OID) => void;
    reset: () => void;
    selectedItemId?: OID;
    selectItem: (id: OID) => void;
    addStatement: (id?: OID) => void;
    removeStatement: (itemId: OID, statementId: string) => void;
    addClaim: (itemId?: OID, propId: string) => void;
    removeClaim: (itemId?: OID, propId: string) => void;
    addReference: (itemId?: OID, claimId: string) => void;
    removeReference: (itemId?: OID, hash: string) => void;
}

const useItemStore = create<ItemState>((set) => ({
    items: new Map(),
    addItem: (item: Item): void =>
        set((state: ItemState) => {
            state.items.set(item._id, item);
        }),
    deleteItem: (id: OID): void =>
        set((state: ItemState) => {
            state.items.delete(id);
        }),
    // Clear stored items.
    reset: (): void => set(() => ({ items: new Map<OID, Item>() })),
    selectedItemId: undefined,
    selectItem: (id: OID): void =>
        set((state: ItemState) => ({ selectedItemId: id })),
    addStatement: (id?: OID): void =>
        set((state: ItemState) => {
            if (!id) {
                return {};
            }

            const item = state.items.get(id);

            if (!item) {
                return {};
            }
            const { claims } = item;

            claims[`temp_${uuidv4()}`] = [];
        }),
    removeStatement: (itemId: OID, statementId: string): void =>
        set((state: ItemState) => {
            const { claims } = state.items.get(itemId) || {};

            delete claims[statementId];
        }),
    addClaim: (itemId?: OID, propId: string): void =>
        set((state: ItemState) => {
            if (!itemId) {
                return {};
            }

            const { claims } = state.items.get(itemId) || {};

            claims[propId].push({ id: uuidv4() });
        }),
    removeClaim: (itemId?: OID, claimId: string): void =>
        set((state: ItemState) => {
            if (!itemId) {
                return {};
            }

            const { claims } = state.items.get(itemId) || {};

            Object.entries(claims).forEach(([key, data]) => {
                const idx = data.findIndex((c) => c.id == claimId);

                if (idx >= 0) {
                    claims[key].splice(idx, 1);
                }
            });
        }),
    addReference: (itemId?: OID, claimId: string): void =>
        set((state: ItemState) => {
            if (!itemId) {
                return {};
            }

            const { claims } = state.items.get(itemId) || {};

            Object.entries(claims).forEach(([key, data]) => {
                const idx = data.findIndex((c) => c.id == claimId);

                if (idx >= 0) {
                    claims[key][idx].references.push({ hash: uuidv4() });
                }
            });
        }),
    removeReference: (itemId?: OID, hash: string): void =>
        set((state: ItemState) => {
            console.log("hello", hash);
            if (!itemId) {
                return {};
            }

            const { claims } = state.items.get(itemId) || {};

            Object.entries(claims).forEach(([key, data]) => {
                data.forEach(({ references }, i) => {
                    const idx = references.findIndex((r) => r.hash == hash);

                    if (idx >= 0) {
                        claims[key][i].references.splice(idx, 1);
                    }
                });
            });

            console.log(claims);
        }),
}));

export type { ItemState };
export default useItemStore;
