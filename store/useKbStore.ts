// @ts-nocheck
import { Entity, OID } from "types/types";
import create from "zustand";
import { v4 as uuidv4 } from "uuid";

interface KbState {
    kb: Map<OID, Entity>;
    addEntity: (entity: Entity) => void;
    deleteEntity: (id: OID) => void;
    reset: () => void;
    selectedEntityId?: OID;
    selectEntity: (id: OID) => void;
    addStatement: (id?: OID) => void;
    removeStatement: (entityId: OID, statementId: string) => void;
    addClaim: (entityId?: OID, propId: string) => void;
    removeClaim: (entityId?: OID, propId: string) => void;
    addReference: (entityId?: OID, claimId: string) => void;
    removeReference: (entityId?: OID, hash: string) => void;
}

const useKbStore = create<KbState>((set) => ({
    kb: new Map(),
    addEntity: (entity: Entity): void =>
        set((state: KbState) => {
            state.kb.set(entity._id, entity);
        }),
    deleteEntity: (id: OID): void =>
        set((state: KbState) => {
            state.kb.delete(id);
        }),
    // Clear stored entities.
    reset: (): void => set(() => ({ kb: new Map<OID, Entity>() })),
    selectedEntityId: undefined,
    selectEntity: (id: OID): void =>
        set((state: KbState) => ({ selectedEntityId: id })),
    addStatement: (id?: OID): void =>
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
    removeStatement: (entityId: OID, statementId: string): void =>
        set((state: KbState) => {
            const { claims } = state.kb.get(entityId) || {};

            delete claims[statementId];
        }),
    addClaim: (entityId?: OID, propId: string): void =>
        set((state: KbState) => {
            if (!entityId) {
                return {};
            }

            const { claims } = state.kb.get(entityId) || {};

            claims[propId].push({ id: uuidv4() });
        }),
    removeClaim: (entityId?: OID, claimId: string): void =>
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
    addReference: (entityId?: OID, claimId: string): void =>
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
    removeReference: (entityId?: OID, hash: string): void =>
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
