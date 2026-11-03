import type { AiCloudGroup } from '../shared/types.js';
import { type ModelText } from './model-locales.js';
export declare function RateBadge({ group, t }: {
    group?: AiCloudGroup | undefined;
    t?: ModelText;
}): import("react").JSX.Element;
export declare function GroupInfo({ name, group, cloud, media, t }: {
    name: string;
    group?: AiCloudGroup | undefined;
    cloud?: boolean;
    media?: boolean;
    t?: ModelText;
}): import("react").JSX.Element;
