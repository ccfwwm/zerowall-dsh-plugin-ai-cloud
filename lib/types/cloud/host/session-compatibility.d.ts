import type { SystemPromptUpdate, ToolUpdate } from '@deepseek-ai/dsh-llm';
export interface PiAiSessionUpdates {
    systemPromptUpdate?: SystemPromptUpdate;
    toolUpdate?: ToolUpdate;
}
export type ManagedWireApi = 'openai-responses' | 'anthropic-messages' | 'openai-completions';
export interface ManagedSessionCompatibilityEntry {
    origin: string;
    modelId: string;
    api: ManagedWireApi;
    updates: PiAiSessionUpdates;
    probe: {
        systemPromptUpdate?: {
            passed: boolean;
            turns: number;
        };
        toolUpdate?: {
            passed: boolean;
            turns: number;
        };
    };
}
export declare const MANAGED_SESSION_COMPATIBILITY: readonly ManagedSessionCompatibilityEntry[];
export declare function managedSessionUpdates(baseUrl: string, modelId: string, api: ManagedWireApi, directory?: readonly ManagedSessionCompatibilityEntry[]): PiAiSessionUpdates | undefined;
