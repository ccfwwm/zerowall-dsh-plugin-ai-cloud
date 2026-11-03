import type { Context } from '@deepseek-ai/cordis';
declare const en: {
    title: string;
    refresh: string;
    model: string;
    prompt: string;
    size: string;
    quality: string;
    automatic: string;
    generate: string;
    billing: string;
    status: string;
    preview: string;
    download: string;
    empty: string;
    busy: string;
};
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        zerowallImages: keyof typeof en;
    }
}
export declare const inject: string[];
/** Register an independent global panel through the public sidebar and main slots. */
export declare function apply(ctx: Context): void;
export {};
