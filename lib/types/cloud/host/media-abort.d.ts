/** Also releases callers when an injected/provider implementation ignores abort. */
export declare function mediaAbortable<T>(operation: Promise<T>, signal: AbortSignal): Promise<T>;
