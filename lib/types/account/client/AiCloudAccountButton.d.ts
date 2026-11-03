import type { AiCloudGroup, AiCloudModelSync } from '../shared/types.js';
import type { SidebarFooterActionOwnerProps } from '@deepseek-ai/dsh-client-ui-sidebar/client';
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots';
import { NS } from '../../base-client-helpers.js';
import { type ModelText } from './model-locales.js';
import type { GroupCatalogStore } from './group-catalog.js';
export interface AiCloudModelView {
    providerId: string;
    groupId: string;
    groupName: string;
    modelId: string;
    baseUrl: string;
    capability?: string;
    stale?: boolean;
}
export interface AiCloudAccountView {
    status: 'signedOut' | 'signedIn' | 'authExpired';
    autoLoginRetryable?: boolean;
    email?: string;
    balance?: number;
    currency?: string;
    balanceFreshness: 'current' | 'stale';
    rechargeUrl?: string;
    lowBalance: boolean;
    gatewayBaseUrl?: string;
    groups?: AiCloudGroup[];
    models: AiCloudModelView[];
    modelSync?: AiCloudModelSync;
    mediaModels?: Array<{
        providerId?: string;
        groupId?: string;
        modelId: string;
        profileId: string;
        groupName: string;
        mediaType: string;
        stale?: boolean;
    }>;
    mediaSync?: AiCloudModelSync;
}
export interface AiCloudGatewayView {
    baseUrl: string;
    label: string;
    preferred: boolean;
}
export interface AiCloudPublicView {
    registrationEnabled: boolean;
    emailVerifyEnabled: boolean;
    invitationCodeEnabled: boolean;
    captchaEnabled: boolean;
    passwordResetEnabled?: boolean;
    rechargeUrl?: string;
    lowBalanceThreshold?: number;
}
export interface AiCloudCheckoutView {
    enabled: boolean;
    minimumAmount: number;
    paymentTypes: string[];
    rechargeUrl?: string;
}
export interface AiCloudOrderView {
    id: number;
    outTradeNo: string;
    status: string;
    amount: number;
    paymentType: string;
    paymentUrl?: string;
    qrCode?: string;
    createdAt?: string;
}
export interface Actions {
    catalog?: GroupCatalogStore;
    modelText?: ModelText;
    getAccount: () => Promise<AiCloudAccountView>;
    forgetLogin: () => Promise<void>;
    savedLogin: () => Promise<{
        email: string;
        password: string;
        baseUrl: string;
        rememberPassword: true;
    } | undefined>;
    relogin: () => Promise<AiCloudAccountView>;
    getPublicConfig: (gatewayBaseUrl?: string) => Promise<AiCloudPublicView>;
    gateways: () => Promise<AiCloudGatewayView[]>;
    selectGateway: (baseUrl: string) => Promise<AiCloudAccountView>;
    login: (email: string, password: string, rememberPassword: boolean) => Promise<AiCloudAccountView>;
    register: (email: string, password: string, verificationCode: string, rememberPassword: boolean, gatewayBaseUrl?: string) => Promise<AiCloudAccountView>;
    sendCode: (email: string, gatewayBaseUrl?: string) => Promise<{
        countdown: number;
        gatewayBaseUrl: string;
    }>;
    forgotPassword: (email: string, gatewayBaseUrl?: string) => Promise<void>;
    logout: () => Promise<void>;
    discoverModels: () => Promise<AiCloudAccountView>;
    /** Refresh the shared model directory after the account has replaced its routes. */
    refreshModelCatalog?: () => Promise<void>;
    checkoutInfo: () => Promise<AiCloudCheckoutView>;
    listOrders: () => Promise<AiCloudOrderView[]>;
    createOrder: (amount: number, paymentType: string) => Promise<AiCloudOrderView>;
    getOrder: (orderId: number) => Promise<AiCloudOrderView>;
    verifyOrder: (outTradeNo: string) => Promise<AiCloudOrderView>;
}
type Props = SidebarFooterActionOwnerProps & Actions & PropsLocale<typeof NS>;
export declare function AiCloudAccountButton(props: Props): import("react").JSX.Element;
export declare function mergePaymentOrder(previous: AiCloudOrderView, next: AiCloudOrderView): AiCloudOrderView;
export {};
