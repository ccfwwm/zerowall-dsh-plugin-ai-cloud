import type { ZeroWallKey } from './account/client/locales.js';
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        zerowall: ZeroWallKey;
    }
}
import type { RemoteResult } from '@deepseek-ai/dsh-typert-protocol';
export declare const NS = "zerowall";
export declare function unwrapRemoteResult<T>(operation: string, result: RemoteResult<T>): T;
