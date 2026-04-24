import { Server } from "socket.io";
import { Server as Engine } from "@socket.io/bun-engine";
import { hostname } from "os";
import type { Controls } from "@/types/controls";
import { pressKey } from "$/keyboard";

const SERVER_PORT = 26041;
const FRONTEND_PORT = 26042;
const isProd = process.env.NODE_ENV === "production";

const io = new Server({ transports: ["websocket"] });
const engine = new Engine({
    path: "/api/socket_io/",
    cors: {
        origin: isProd ? false : `http://localhost:${FRONTEND_PORT}`,
    },
});
io.bind(engine);
io.on("connection", (socket) => {
    console.log("✅ Client connected:", socket.id);

    socket.emit("server:socket:device:name", hostname());
    console.log("Device name:", hostname());

    socket.on("client:control", (target: Controls) => {
        pressKey(target);
    });

    socket.on("disconnect", () => {
        const str = `❌ Client disconnected: ${socket.id}`;
        console.log(str);
        console.log("-".repeat(Bun.stringWidth(str)));
    });
});

export { engine, SERVER_PORT, FRONTEND_PORT };
