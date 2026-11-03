import type { Context } from '@deepseek-ai/cordis';
import { TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol';
import type { AiCloudAccountSnapshot, AiCloudCreateOrderRequest, AiCloudGateway, AiCloudLoginRequest, AiCloudCheckoutInfo, AiCloudGetOrderRequest, AiCloudPaymentOrder, AiCloudPublicConfig, AiCloudRegisterRequest, AiCloudSendCodeRequest, AiCloudSendCodeResult, AiCloudForgotPasswordRequest, AiCloudVerifyOrderRequest, AiCloudSavedLogin, AiCloudGroupCatalog } from '../shared/types.js';
export { uniqueMediaModels } from '../shared/types.js';
export type { AiCloudAccountSnapshot, AiCloudCheckoutInfo, AiCloudCreateOrderRequest, AiCloudGateway, AiCloudGetOrderRequest, AiCloudLoginRequest, AiCloudManagedModel, AiCloudPaymentOrder, AiCloudPublicConfig, AiCloudRegisterRequest, AiCloudSendCodeRequest, AiCloudVerifyOrderRequest, AiCloudSendCodeResult, AiCloudForgotPasswordRequest, AiCloudSavedLogin, AiCloudMediaModel, } from '../shared/types.js';
export interface AccountSecretStore {
    get(key: string): Promise<string | undefined>;
    set(key: string, value: string): Promise<void>;
    delete(key: string): Promise<void>;
}
export interface AiCloudClientOptions {
    secrets?: AccountSecretStore;
    fetch?: typeof fetch;
    bases?: string[];
}
export declare class AiCloudClient {
    private identityRevision;
    private secretWrites;
    private readonly discoveredGroups;
    private modelDiscovery;
    private currentOperation;
    private identityAction;
    private readonly secrets;
    private readonly fetcher;
    private readonly bases;
    constructor(options?: AiCloudClientOptions);
    gateways(): Promise<AiCloudGateway[]>;
    /** Persist a selected supported endpoint without exposing account credentials. */
    selectGateway(baseUrl: string): Promise<AiCloudAccountSnapshot>;
    private selectGatewayAtRevision;
    publicConfig(gatewayBaseUrl?: string): Promise<AiCloudPublicConfig>;
    sendCode(input: AiCloudSendCodeRequest): Promise<AiCloudSendCodeResult>;
    forgotPassword(input: AiCloudForgotPasswordRequest): Promise<void>;
    login(input: AiCloudLoginRequest): Promise<AiCloudAccountSnapshot>;
    private loginAtRevision;
    register(input: AiCloudRegisterRequest): Promise<AiCloudAccountSnapshot>;
    private registerAtRevision;
    current(): Promise<AiCloudAccountSnapshot>;
    private readCurrent;
    logout(): Promise<void>;
    private finishLogout;
    private trackIdentityAction;
    forgetLogin(): Promise<void>;
    savedLogin(): Promise<AiCloudSavedLogin | undefined>;
    /** Re-authenticate with the encrypted login record without asking for input again. */
    relogin(): Promise<AiCloudAccountSnapshot>;
    /** Read synchronized metadata without network requests, login restoration, or secret writes. */
    groupCatalog(): Promise<AiCloudGroupCatalog>;
    discoverModels(): Promise<AiCloudAccountSnapshot>;
    private discoverSessionModels;
    listOrders(): Promise<AiCloudPaymentOrder[]>;
    checkoutInfo(): Promise<AiCloudCheckoutInfo>;
    createOrder(input: AiCloudCreateOrderRequest): Promise<AiCloudPaymentOrder>;
    getOrder(input: AiCloudGetOrderRequest): Promise<AiCloudPaymentOrder>;
    verifyOrder(input: AiCloudVerifyOrderRequest): Promise<AiCloudPaymentOrder>;
    private finishAuthentication;
    private authenticate;
    private restoreSavedLogin;
    private catalogFailure;
    private loadSession;
    private loadLogin;
    private requireSession;
    private mutateSecrets;
    private storeSession;
    private storeLogin;
    private isManuallySignedOut;
    private clearSession;
    private preferredBase;
    private requireBase;
    private orderedBases;
    private withFailover;
    private request;
    private rawRequest;
}
declare module '@deepseek-ai/cordis' {
    interface Context {
        zerowallAccount: ZeroWallAccountService;
    }
    interface Events {
        'zerowall/account-updated'(snapshot: AiCloudAccountSnapshot): void;
    }
}
export declare class ZeroWallAccountService extends TypertRemoteService {
    private readonly runtimeCtx;
    static inject: string[];
    private readonly client;
    constructor(runtimeCtx: Context);
    publicConfig(gatewayBaseUrl?: string): Promise<AiCloudPublicConfig>;
    gateways(): Promise<AiCloudGateway[]>;
    groupCatalog(): Promise<AiCloudGroupCatalog>;
    selectGateway(baseUrl: string): Promise<AiCloudAccountSnapshot>;
    sendCode(input: AiCloudSendCodeRequest): Promise<AiCloudSendCodeResult>;
    forgotPassword(input: AiCloudForgotPasswordRequest): Promise<void>;
    login(input: AiCloudLoginRequest): Promise<AiCloudAccountSnapshot>;
    register(input: AiCloudRegisterRequest): Promise<AiCloudAccountSnapshot>;
    current(): Promise<AiCloudAccountSnapshot>;
    forgetLogin(): Promise<void>;
    savedLogin(): Promise<AiCloudSavedLogin | undefined>;
    relogin(): Promise<AiCloudAccountSnapshot>;
    logout(): Promise<void>;
    discoverModels(): Promise<AiCloudAccountSnapshot>;
    listOrders(): Promise<AiCloudPaymentOrder[]>;
    checkoutInfo(): Promise<AiCloudCheckoutInfo>;
    createOrder(input: AiCloudCreateOrderRequest): Promise<AiCloudPaymentOrder>;
    getOrder(input: AiCloudGetOrderRequest): Promise<AiCloudPaymentOrder>;
    verifyOrder(input: AiCloudVerifyOrderRequest): Promise<AiCloudPaymentOrder>;
    private publish;
}
export declare function apply(ctx: Context): void;
declare const _default: {
    apply: typeof apply;
};
export default _default;
