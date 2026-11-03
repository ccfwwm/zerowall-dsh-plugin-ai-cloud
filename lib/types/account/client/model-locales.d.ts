import type { TranslateNS } from '@deepseek-ai/dsh-client-ui-slots';
export declare const MODEL_NS = "zerowallAccountModels";
export declare const zh: {
    readonly group: "分组";
    readonly model: "模型";
    readonly effort: "推理强度";
    readonly select: "选择模型";
    readonly menu: "分组、模型与推理强度";
    readonly searchGroups: "搜索分组…";
    readonly searchModels: "搜索模型…";
    readonly back: "返回";
    readonly empty: "没有匹配的模型或分组";
    readonly info: "分组介绍";
    readonly noDescription: "暂无分组介绍。";
    readonly rate: "分组倍率";
    readonly unknownRate: "倍率未提供";
    readonly billing: "分组倍率作用于基础价格，实际费用以平台结算为准。";
    readonly external: "使用已配置的供应商，费用以该供应商定价为准。";
    readonly mediaBilling: "媒体模型可能采用独立计费规则，请查看平台模型价格。";
    readonly close: "关闭介绍";
    readonly retry: "重试";
    readonly defaultEffort: "供应商默认";
    readonly unavailable: "当前选择暂不可用";
    readonly configured: "已配置供应商";
    readonly cloud: "ZeroWall AI Cloud";
    readonly updated: "最近同步";
    readonly syncing: "正在同步…";
    readonly noEffort: "当前模型未提供推理强度。";
};
export declare const en: Record<keyof typeof zh, string>;
export type ModelText = (key: keyof typeof zh) => string;
export declare const defaultModelText: ModelText;
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        zerowallAccountModels: keyof typeof zh;
    }
}
export type ModelTranslate = TranslateNS<typeof MODEL_NS>;
