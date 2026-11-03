import type { AiCloudAccountView } from './AiCloudAccountButton.js';
export declare function gatewayPlatformUrl(baseUrl?: string): string | undefined;
export declare function accountConnection(account?: AiCloudAccountView, unavailable?: boolean): 'loading' | 'online' | 'offline' | 'expired' | 'unavailable';
export declare function openPlatform(url: string): void;
