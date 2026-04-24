import { cn } from "@/lib/utils";
import { useSocketStore } from "@/stores/socket.store";

export function SocketStatus() {
    const isConnected = useSocketStore((s) => s.socketId !== null);
    const deviceName = useSocketStore((s) => s.deviceName);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex h-8 items-center justify-center gap-4">
                <div
                    className={cn(
                        "relative flex aspect-square h-4 *:inline-flex *:rounded-full",
                        isConnected ? "*:bg-(--success-foreground)" : "*:bg-(--error-foreground)",
                    )}
                >
                    <div className="absolute h-full w-full animate-ping opacity-75" />
                    <div className="relative size-full" />
                </div>
                <h1 className="text-center text-2xl font-[650]">
                    {isConnected ? "Connected" : "Disconnected"}
                </h1>
            </div>
            <div className="bg-card mt-1 rounded-md px-2.5 py-1 shadow-md">
                <h2 className="text-primary text-center text-xl font-[650]">
                    {deviceName ?? "No Device"}
                </h2>
            </div>
        </div>
    );
}
