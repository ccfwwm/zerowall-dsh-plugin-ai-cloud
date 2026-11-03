export declare const accountSurface: {
    open(): void;
    subscribeOpen(listener: () => void): () => void;
    subscribe(listener: () => void): () => void;
    getSnapshot: () => HTMLElement | null;
};
export declare function AccountSection(): import("react").JSX.Element;
