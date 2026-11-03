import type { AccountSecretStore, AiCloudAccountSnapshot } from '../../account/host/index.js';
import type { MediaCatalog, MediaDiagnostics, MediaRequest, MediaTask, ZeroWallMedia } from '../shared/media.js';
interface Account {
    current(): Promise<AiCloudAccountSnapshot>;
    discoverModels(): Promise<AiCloudAccountSnapshot>;
}
/** Gemini tiers are enums; a pixel canvas is not an imageSize. */
export declare function normalizeGeminiImageSize(raw: string): string;
/** Host-only credentials, durable task identities and bounded artifact storage. */
export declare class AiCloudMediaService implements ZeroWallMedia {
    private readonly account;
    private readonly secrets;
    private readonly fetcher;
    private readonly cacheDir;
    private readonly externalFetch;
    private readonly operations;
    private writes;
    constructor(account: Account, secrets: AccountSecretStore, options?: {
        fetch?: typeof fetch;
        cacheDir?: string;
    });
    catalog(refresh?: boolean): Promise<MediaCatalog>;
    private resolve;
    private validate;
    private wire;
    private json;
    preview(input: MediaRequest): Promise<MediaDiagnostics>;
    estimate(input: MediaRequest): Promise<{
        currency: string;
        maximumCharge?: string;
        total?: string;
    }>;
    submit(input: MediaRequest, signal?: AbortSignal): Promise<MediaTask>;
    private submitOnce;
    private accept;
    private artifactURL;
    private assertOwner;
    private owner;
    query(requestId: string, signal?: AbortSignal): Promise<MediaTask>;
    wait(requestId: string, timeoutMs?: number, signal?: AbortSignal): Promise<MediaTask>;
    download(requestId: string, artifactKey: string, signal?: AbortSignal): Promise<{
        bytes: Uint8Array;
        mediaType: string;
        sha256: string;
        duration?: number;
    }>;
    private cache;
    private all;
    private get;
    private save;
    list(): Promise<MediaTask[]>;
}
export {};
