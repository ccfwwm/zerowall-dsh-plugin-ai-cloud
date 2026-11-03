/** Bounded diagnostics only. Full request bytes and credentials never cross the UI boundary. */
export declare function safeMediaValue(value: unknown, secrets?: string[], depth?: number): any;
/** Authenticated download locations remain Host-only, including in diagnostic replies. */
export declare function safeMediaResponse(value: unknown, secrets: string[]): any;
