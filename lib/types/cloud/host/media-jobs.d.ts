import type { MediaDraft, MediaJob, MediaPreparationInput, MediaReview, MediaScope, ZeroWallMedia, ZeroWallMediaJobs } from '../shared/media.js';
export declare const MEDIA_COLLECTION_MAX_BACKOFF_MS = 30000;
export declare const MEDIA_COLLECTION_POLL_MS = 5000;
interface CollectionRuntime {
    now?: () => number;
    sleep?: (ms: number, signal: AbortSignal) => Promise<void>;
    autoCollect?: boolean;
}
export declare function mediaTarget(cwd: string, path: string, create?: boolean): Promise<string>;
/** Host-only ledger. Native authenticated Remote is the sole submitReviewed caller. */
export declare class MediaJobLedger implements ZeroWallMediaJobs {
    private media;
    private owner;
    private root;
    private runtime;
    private serial;
    private mutations;
    private running;
    private collections;
    private disposed;
    constructor(media: ZeroWallMedia, owner: () => Promise<string>, root?: string, runtime?: CollectionRuntime);
    private now;
    suspend(): void;
    dispose(): Promise<void>;
    /** Restore only eligible account-owned work; persisted manual stops remain authoritative. */
    resumePending(): Promise<void>;
    private lock;
    private mutate;
    private path;
    private read;
    private save;
    private check;
    prepare(scope: MediaScope, draft: MediaDraft, id?: `${string}-${string}-${string}-${string}-${string}`): Promise<MediaJob>;
    recordValidationFailure(scope: MediaScope, draft: MediaDraft, error: string, id?: `${string}-${string}-${string}-${string}-${string}`, recoveryInput?: MediaPreparationInput): Promise<MediaJob>;
    preparationInput(scope: MediaScope, id: string): Promise<MediaPreparationInput | undefined>;
    references(scope: MediaScope, id: string): Promise<import("../shared/media.js").MediaReference[]>;
    list(scope: Pick<MediaScope, 'sessionId' | 'cwd'>): Promise<MediaJob[]>;
    recover(scope: MediaScope, requestId: string): Promise<MediaJob>;
    /** Host-only: the authenticated review route issues this token, never a model tool. */
    authorize(scope: Pick<MediaScope, 'sessionId' | 'cwd'>, id: string, revision: number): Promise<string>;
    submitReviewed(scope: Pick<MediaScope, 'sessionId' | 'cwd'>, reviews: MediaReview[]): Promise<MediaJob[]>;
    private request;
    submitRequested(scope: Pick<MediaScope, 'sessionId' | 'cwd'>, id: string, revision: number): Promise<MediaJob>;
    private start;
    refresh(scope: MediaScope, id: string, options?: {
        background?: boolean;
        signal?: AbortSignal;
        automatic?: boolean;
    }): Promise<MediaJob>;
    pause(scope: MediaScope, id: string): Promise<MediaJob>;
    private refreshOnce;
}
export {};
