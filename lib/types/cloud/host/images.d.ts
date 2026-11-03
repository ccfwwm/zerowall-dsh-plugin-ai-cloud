import type { Context } from '@deepseek-ai/cordis';
import { TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol';
import type { CloudImageData, CloudImageModel, CloudImageRequest, CloudImageTask } from '../shared/images.js';
declare module '@deepseek-ai/cordis' {
    interface Context {
        zerowallImages: ZeroWallImages;
    }
}
/** Image calls use the existing durable media service and Host credential store. */
export declare class ZeroWallImages extends TypertRemoteService {
    private readonly runtime;
    static inject: string[];
    constructor(runtime: Context);
    /** List currently available image generation routes without credentials. */
    models(): Promise<CloudImageModel[]>;
    /** Submit one paid image request; reuse its requestId to recover an uncertain result. */
    generate(input: CloudImageRequest): Promise<CloudImageTask>;
    /** Read a persisted task without creating another paid request. */
    query(requestId: string): Promise<CloudImageTask>;
    /** Read a bounded image for preview and download after Host digest validation. */
    imageData(requestId: string, artifactKey: string): Promise<CloudImageData>;
}
