import { Button } from "@/components/ui/button";
import { useSocketStore } from "@/stores/socket.store";
import type { Controls } from "@/types/controls";
import { useCallback } from "react";

interface ControlButtonProps extends Omit<React.ComponentProps<typeof Button>, "onClick"> {
    target: Controls;
}

export function ControlButton({ target, children, ...props }: ControlButtonProps) {
    const clickHandle = useCallback(() => {
        useSocketStore.getState().emit("client:control", target);
    }, [target]);

    return (
        <Button onClick={clickHandle} {...props}>
            {children}
        </Button>
    );
}
