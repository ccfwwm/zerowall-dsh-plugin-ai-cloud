import { type RefObject, type CSSProperties } from 'react';
/** Keep portaled menus above their trigger where possible and inside the viewport. */
export declare function useFloatingPanel(open: boolean, anchor: RefObject<HTMLElement>, panel: RefObject<HTMLElement>): CSSProperties;
