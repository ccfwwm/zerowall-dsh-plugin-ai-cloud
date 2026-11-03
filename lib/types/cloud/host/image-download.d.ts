export type ImageArtifactFetch = (url: URL, signal: AbortSignal, headers?: Record<string, string>) => Promise<Response>;
/** One paid generation can have several safe, credential-free CDN transfers. */
export declare function downloadImageBytes(url: URL, options?: {
    signal?: AbortSignal;
    fetch?: ImageArtifactFetch;
    timeoutMs?: number;
    slowAfterMs?: number;
}): Promise<{
    bytes: Uint8Array;
    transport: 'single' | 'range';
    attempts: number;
}>;
