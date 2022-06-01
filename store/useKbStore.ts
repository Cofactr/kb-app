// @ts-nocheck
import { Entity, Id } from "types/types";
import create from "zustand";
import { v4 as uuidv4 } from "uuid";

interface KbState {
    kb: Map<Id, Entity>;
    addEntity: (entity: Entity) => void;
    deleteEntity: (id: Id) => void;
    reset: () => void;
    selectedEntityId?: Id;
    selectEntity: (id: Id) => void;
    addStatement: (id?: Id) => void;
    removeStatement: (entityId: Id, statementId: string) => void;
    addClaim: (entityId?: Id, propId: string) => void;
    removeClaim: (entityId?: Id, propId: string) => void;
    addReference: (entityId?: Id, claimId: string) => void;
    removeReference: (entityId?: Id, hash: string) => void;
}

const useKbStore = create<KbState>((set) => ({
    kb: new Map(),
    addEntity: (entity: Entity): void =>
        set((state: KbState) => {
            state.kb.set(entity.id, entity);
        }),
    deleteEntity: (id: Id): void =>
        set((state: KbState) => {
            state.kb.delete(id);
        }),
    // Clear stored entities.
    reset: (): void => set(() => ({ kb: new Map<Id, Entity>() })),
    selectedEntityId: undefined,
    selectEntity: (id: Id): void =>
        set((state: KbState) => ({ selectedEntityId: id })),
    addStatement: (id?: Id): void =>
        set((state: KbState) => {
            if (!id) {
                return {};
            }

            const entity = state.kb.get(id);

            if (!entity) {
                return {};
            }
            const { claims } = entity;

            claims[`temp_${uuidv4()}`] = [];
        }),
    removeStatement: (entityId: Id, statementId: string): void =>
        set((state: KbState) => {
            const { claims } = state.kb.get(entityId) || {};

            delete claims[statementId];
        }),
    addClaim: (entityId?: Id, propId: string): void =>
        set((state: KbState) => {
            if (!entityId) {
                return {};
            }

            const { claims } = state.kb.get(entityId) || {};

            claims[propId].push({ id: uuidv4() });
        }),
    removeClaim: (entityId?: Id, claimId: string): void =>
        set((state: KbState) => {
            if (!entityId) {
                return {};
            }

            const { claims } = state.kb.get(entityId) || {};

            Object.entries(claims).forEach(([key, data]) => {
                const idx = data.findIndex((c) => c.id == claimId);

                if (idx >= 0) {
                    claims[key].splice(idx, 1);
                }
            });
        }),
    addReference: (entityId?: Id, claimId: string): void =>
        set((state: KbState) => {
            if (!entityId) {
                return {};
            }

            const { claims } = state.kb.get(entityId) || {};

            Object.entries(claims).forEach(([key, data]) => {
                const idx = data.findIndex((c) => c.id == claimId);

                if (idx >= 0) {
                    claims[key][idx].references.push({ hash: uuidv4() });
                }
            });
        }),
    removeReference: (entityId?: Id, hash: string): void =>
        set((state: KbState) => {
            if (!entityId) {
                return {};
            }

            const { claims } = state.kb.get(entityId) || {};

            Object.entries(claims).forEach(([key, data]) => {
                data.forEach(({ references }, i) => {
                    const idx = references.findIndex((r) => r.hash == hash);

                    if (idx >= 0) {
                        claims[key][i].references.splice(idx, 1);
                    }
                });
            });
        }),
}));

export type { KbState };
export default useKbStore;
