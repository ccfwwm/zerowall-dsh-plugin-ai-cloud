import { type AiCloudAccountSnapshot, type AiCloudGroupCatalog, type AiCloudGroup } from '../shared/types.js';
import type { ModelDirectoryState } from '@deepseek-ai/dsh-client-ui-model-selection/client';
/** One plugin-lifetime cache; late responses lose access after account/gateway changes. */
export declare class GroupCatalogStore {
    private value;
    private revision;
    private disposed;
    private listeners;
    subscribe: (listener: () => void) => () => void;
    getSnapshot: () => AiCloudGroupCatalog;
    private set;
    clear(): void;
    update(account: AiCloudAccountSnapshot): void;
    refresh(read: () => Promise<AiCloudGroupCatalog>): Promise<void>;
    dispose(): void;
}
export interface GroupModel {
    providerId: string;
    model: ModelDirectoryState['groups'][number]['models'][number];
}
export interface DisplayGroup {
    key: string;
    name: string;
    cloud: boolean;
    metadata?: AiCloudGroup;
    models: GroupModel[];
}
/** Join by exact route identity, never by display name or a guessed provider suffix. */
export declare function displayGroups(providers: ModelDirectoryState['groups'], catalog: AiCloudGroupCatalog): DisplayGroup[];
export declare function groupRate(group?: AiCloudGroup): string | undefined;
