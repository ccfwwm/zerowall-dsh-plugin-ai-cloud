/** Inspect actual file signatures; provider labels never establish the format. */
export declare function artifactFormat(data: Uint8Array): {
    mediaType: string;
    duration?: number;
};
