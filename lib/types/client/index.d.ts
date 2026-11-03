import type { Context } from '@deepseek-ai/cordis';
export declare const inject: string[];
/** Mount this plugin's generated namespaces before its account UI. */
export declare function apply(ctx: Context): Promise<void>;
