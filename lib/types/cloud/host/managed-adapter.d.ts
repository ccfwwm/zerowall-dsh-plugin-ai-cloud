import type { GenerateOptions, PreparedAdapterCall, StreamChunk } from '@deepseek-ai/dsh-llm';
import { PiAiAdapter } from '@deepseek-ai/dsh-llm-pi-ai';
import type { PiAiProviderProfile } from '@deepseek-ai/dsh-llm-pi-ai';
export declare const managedRetryPolicy: NonNullable<PiAiProviderProfile['retryPolicy']>;
/** Keep retry execution in DSH's durable agent loop, with its attempt cleanup,
 * cancellable backoff and UI retry events. Never replay a whole conversation. */
export declare function managedStream(source: AsyncIterable<StreamChunk>): AsyncIterable<StreamChunk>;
export declare class ManagedPiAiAdapter extends PiAiAdapter {
    prepareCall(provider: string, model: string, signal?: AbortSignal): Promise<PreparedAdapterCall>;
    stream(options: GenerateOptions): AsyncIterable<StreamChunk>;
}
