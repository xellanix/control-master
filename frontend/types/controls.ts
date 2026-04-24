export const CONTROL_MAP = {
    left: 0x25,
    up: 0x26,
    right: 0x27,
    down: 0x28,
    enter: 0x0d,
} as const;
export type Controls = keyof typeof CONTROL_MAP;
