import type { Context } from '@deepseek-ai/cordis';
export declare const name = "zerowall-ai-cloud";
export declare const inject: string[];
/** Compose the account provider before the managed inference service. */
export declare function apply(ctx: Context): void;
export { AiCloudClient, ZeroWallAccountService } from '../account/host/index.js';
export type { AccountSecretStore } from '../account/host/index.js';
export { ZeroWallImages } from '../cloud/host/images.js';
