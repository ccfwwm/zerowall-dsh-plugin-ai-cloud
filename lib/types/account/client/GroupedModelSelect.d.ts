import type { ModelSelectInjected } from '@deepseek-ai/dsh-client-ui-model-selection/client';
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots';
import { type GroupCatalogStore } from './group-catalog.js';
import { MODEL_NS } from './model-locales.js';
type Props = ModelSelectInjected & PropsLocale<typeof MODEL_NS> & {
    locked?: boolean;
    catalog: GroupCatalogStore;
};
export declare function GroupedModelSelect({ available, locked, directory, load, select, catalog, t }: Props): import("react").JSX.Element | null;
export {};
