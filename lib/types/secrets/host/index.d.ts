import { type CredentialProvider } from '@deepseek-ai/dsh-credentials';
import type { AccountSecretStore } from '../../account/host/index.js';
/** Private DSH credential records; no dependence on the ZeroWall desktop IPC. */
export declare class DshSecretStore implements AccountSecretStore {
    private readonly credentials;
    constructor(credentials: Pick<CredentialProvider, 'readRecord' | 'modifyRecord' | 'deleteRecord'>);
    private key;
    get(id: string): Promise<string | undefined>;
    set(id: string, value: string): Promise<void>;
    delete(id: string): Promise<void>;
}
