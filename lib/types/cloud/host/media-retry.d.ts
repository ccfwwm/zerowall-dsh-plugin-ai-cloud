/** Only bounded, credential-free retry metadata crosses the HTTP boundary. */
export declare function mediaHttpError(prefix: 'MEDIA_HTTP' | 'MEDIA_DOWNLOAD_HTTP', response: Response): Error & {
    retryAfterMs?: number;
};
export declare function retryableMediaError(error: unknown): boolean;
export declare function mediaRetryAfter(error: unknown): number;
