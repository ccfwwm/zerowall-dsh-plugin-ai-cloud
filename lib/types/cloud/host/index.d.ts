import type { Context } from '@deepseek-ai/cordis';
import type { LlmAdapter } from '@deepseek-ai/dsh-llm';
import type { ModelSelection } from '@deepseek-ai/dsh-agent';
import { type PiAiAdapterOptions } from '@deepseek-ai/dsh-llm-pi-ai';
import type { AccountSecretStore, AiCloudAccountSnapshot } from '../../account/host/index.js';
import type { ZeroWallMediaJobs } from '../shared/media.js';
import type { ZeroWallMedia } from '../shared/media.js';
export { AiCloudMediaService, normalizeGeminiImageSize } from './media.js';
export { downloadImageBytes } from './image-download.js';
export type { ZeroWallMedia, MediaRequest, MediaTask, MediaSelection } from '../shared/media.js';
interface AgentDefaultModelService {
    currentSelection(): ModelSelection;
    saveSelection(next: ModelSelection): Promise<void>;
}
interface ManagedCredentialResolver {
    resolve(provider: string, model: string): Promise<string | undefined>;
}
declare module '@deepseek-ai/cordis' {
    interface Context {
        agentDefaultModel: AgentDefaultModelService;
        zerowallAiCloudCredentialResolver: ManagedCredentialResolver;
        zerowallMedia: ZeroWallMedia;
        zerowallMediaJobs: ZeroWallMediaJobs;
    }
}
export interface AiCloudLlmControllerOptions {
    secrets?: AccountSecretStore;
    createAdapter?: (options: PiAiAdapterOptions) => LlmAdapter;
}
export declare class AiCloudLlmController {
    private readonly ctx;
    private readonly secrets;
    private readonly adapter;
    private profiles;
    private registration?;
    private credentialRefresh;
    private credentialRefreshAt;
    constructor(ctx: Context, options?: AiCloudLlmControllerOptions);
    private refreshManagedCredentials;
    update(snapshot: AiCloudAccountSnapshot): Promise<void>;
}
export declare const name = "zerowall-ai-cloud-llm";
export declare const inject: string[];
export declare function apply(ctx: Context): void;
declare const _default: {
    name: string;
    inject: string[];
    apply: typeof apply;
};
export default _default;
export { mediaTarget } from './media-jobs.js';
export { publicReferenceURL, normalizeMediaReferences } from './media-reference.js';
