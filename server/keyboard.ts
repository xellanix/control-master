import { type Controls, CONTROL_MAP } from "@/types/controls";
import { dlopen, FFIType } from "bun:ffi";

// Load the Windows User32 library
const { symbols } = dlopen("user32.dll", {
    keybd_event: {
        args: [FFIType.u8, FFIType.u8, FFIType.u32, FFIType.ptr],
        returns: FFIType.void,
    },
});

const KEYEVENTF_KEYUP = 0x0002;

export function pressKey(code: Controls) {
    if (!(code in CONTROL_MAP)) return;

    const vk = CONTROL_MAP[code];

    // Key Down
    symbols.keybd_event(vk, 0, 0, null);
    // Key Up
    symbols.keybd_event(vk, 0, KEYEVENTF_KEYUP, null);
}
