export declare function publicIPv4(address: string): boolean;
/** Resolve once and pin the checked address to the TLS socket (no redirects). */
export declare function externalArtifact(url: URL, signal: AbortSignal, requestHeaders?: Record<string, string>): Promise<Response>;
