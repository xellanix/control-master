import { useSocketStore } from "@/stores/socket.store";
import { useEffect } from "react";
import { io } from "socket.io-client";

export function SocketInitiator() {
    useEffect(() => {
        if (typeof window === "undefined") return;

        const { setSocket, setSocketId, setDeviceName } = useSocketStore.getState();

        const origin = window.location.origin;
        let socketUrl = origin;

        // If we are accessing the Vite dev server locally or it's running in DEV mode,
        // point to the Bun backend port
        if (
            origin.includes("localhost:26042") ||
            origin.includes("127.0.0.1:26042") ||
            import.meta.env.DEV
        ) {
            socketUrl = "http://localhost:26041";
        }
        const newSocket = io(socketUrl, {
            path: "/api/socket_io",
            transports: ["websocket"],
        });
        setSocket(newSocket);

        newSocket.on("connect", () => {
            setSocketId(newSocket.id!);
            console.log("✅ Connected to server");
        });

        newSocket.on("server:socket:device:name", setDeviceName);

        newSocket.on("connect_error", (err) => {
            console.error("Socket connection error:", err);
        });

        newSocket.on("disconnect", () => {
            setSocketId(null);
            console.log("❌ Disconnected from server");
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return null;
}
