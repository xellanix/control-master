import { serve, file } from "bun";
import { dirname, join } from "path";
import { engine, SERVER_PORT } from "$/socket";

import index from "../dist/frontend/index.html";

const isProd = process.env.NODE_ENV === "production";
const EXEC_DIR = dirname(process.execPath);
const { fetch, ...socketEngineHandler } = engine.handler();

declare const VERSION: string;

console.log("┌────────────────────────────────┐");
console.log("│ Xellanix ControlMaster         │");
{
    const len = 22 - VERSION.length;
    console.log(`│ Version ${VERSION}${len > 0 ? " ".repeat(len) : ""} │`);
}
console.log("├────────────────────────────────┤");

serve({
    ...socketEngineHandler,

    // Set it at the end of the server configuration options
    // so that all custom settings are fully applied
    // and not overridden by the configuration
    // from the libraries being used.
    port: SERVER_PORT,
    routes: {
        "/": prod(index),
        "/master": prod(index),
        "/index.html": prod(index),
    },
    async fetch(req, server) {
        const url = new URL(req.url);
        const path = url.pathname;

        if (path.startsWith(engine.opts.path)) {
            return engine.handleRequest(req, server);
        }

        return prod(serveStaticFile(path));
    },
});

function prod<T>(val: T) {
    if (!isProd) {
        return new Response(
            "Bun Backend: Running in DEV mode. Please use the Vite dev server to view the frontend.",
            { headers: { "Content-Type": "text/plain" } },
        );
    }

    return val;
}

async function serveStaticFile(reqPath: string): Promise<Response> {
    const targetPath = join(EXEC_DIR, decodeURIComponent(reqPath));
    if (!targetPath.startsWith(EXEC_DIR)) {
        return new Response("Forbidden: Invalid Path", { status: 403 });
    }

    let requestedFile = file(targetPath);
    if (!(await requestedFile.exists())) {
        requestedFile = file(join(EXEC_DIR, "index.html"));

        // Safety check: if index.html is completely missing, return a clean 404
        if (!(await requestedFile.exists())) {
            return new Response(
                "Frontend files not found. Ensure the 'frontend' folder is located in the same directory as this executable.",
                { status: 404, headers: { "Content-Type": "text/plain" } },
            );
        }
    }

    return new Response(requestedFile);
}

console.log(`│ Server: http://localhost:${SERVER_PORT} │`);
console.log(`│ Mode  : ${isProd ? "production " : "development"}            │`);
console.log("└────────────────────────────────┘");
