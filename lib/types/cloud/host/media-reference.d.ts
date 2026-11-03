import type { MediaReference, MediaRequest } from '../shared/media.js';
export declare const MAX_REFERENCE_BYTES: number;
export declare const MAX_MEDIA_REQUEST_BYTES: number;
/** Keep URLs as references. DNS/redirect/content validation remains gateway-owned. */
export declare function publicReferenceURL(raw: string): string;
export declare function referenceValue(ref: MediaReference): string;
export declare function referenceBytes(ref: MediaReference): Uint8Array | undefined;
export declare function validateFrameReferences(refs: MediaReference[]): void;
/** Consume all documented reference aliases once; never let a later spread replace them. */
export declare function normalizeMediaReferences<T extends {
    parameters?: MediaRequest['parameters'];
    references?: MediaReference[] | undefined;
}>(input: T): T;
export declare function referenceSignature(refs: MediaReference[]): string;
export declare function referenceProperties(ref: MediaReference): Record<string, unknown>;
