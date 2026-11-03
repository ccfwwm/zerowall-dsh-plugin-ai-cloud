import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots';
import { NS } from '../../base-client-helpers.js';
import type { AiCloudAccountView } from './AiCloudAccountButton.js';
export declare function ManagedProviderCard({ getAccount, t }: {
    getAccount: () => Promise<AiCloudAccountView>;
} & PropsLocale<typeof NS>): import("react").JSX.Element;
