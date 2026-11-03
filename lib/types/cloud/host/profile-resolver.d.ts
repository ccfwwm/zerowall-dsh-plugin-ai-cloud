import type { PiAiProviderProfile, ResolvedPiAiProviderProfile } from '@deepseek-ai/dsh-llm-pi-ai';
/** Build the minimal validated profile shape consumed by the public PiAiAdapter. */
export declare function resolveManagedProfiles(routes: Readonly<Record<string, PiAiProviderProfile>>): Map<string, ResolvedPiAiProviderProfile>;
