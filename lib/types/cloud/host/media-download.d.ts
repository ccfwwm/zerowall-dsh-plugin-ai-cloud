/** Gateway task content supports ranges. Bounded chunks avoid restarting a
 * complete video on a transient timeout; external hosts never receive a key. */
export declare function downloadMediaBytes(fetchPart: (headers: Record<string, string>, signal: AbortSignal) => Promise<Response>, signal: AbortSignal, ranged: boolean): Promise<Uint8Array>;
