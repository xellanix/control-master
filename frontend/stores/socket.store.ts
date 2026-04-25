import { type Socket } from "socket.io-client";
import { create } from "zustand";

interface SocketState {
    socket: Socket | null;
    socketId: string | null;
    isLocal: boolean;
    deviceName: string | null;
}

interface SocketActions {
    setSocket: (socket: Socket | null) => void;
    setSocketId: (socketId: string | null) => void;
    setLocal: (isLocal: boolean) => void;
    setDeviceName: (deviceName: string | null) => void;

    emit: (event: string, ...args: unknown[]) => void;
}

type SocketStore = SocketState & SocketActions;

export const useSocketStore = create<SocketStore>((set, get) => ({
    socket: null,
    socketId: null,
    isLocal: false,
    deviceName: null,

    setSocket: (socket) => set({ socket }),
    setSocketId: (socketId) => set({ socketId }),
    setLocal: (isLocal) => set({ isLocal }),
    setDeviceName: (deviceName) => set({ deviceName }),

    emit: (event, ...args) => get().socket?.emit(event, ...args),
}));
