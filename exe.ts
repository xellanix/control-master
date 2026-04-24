import version from "./frontend/data/version.json";

console.log("⌛ Building server...");

const result = await Bun.build({
    entrypoints: ["./server/index.ts"],
    compile: {
        target: "bun-windows-x64",
        outfile: "./dist/server/control-master",
        execArgv: ["--smol"],
        autoloadDotenv: false,
        autoloadBunfig: false,
        windows: {
            icon: "./public/favicon.ico",
            hideConsole: false,
            title: "Xellanix ControlMaster",
            publisher: "Xellanix",
            version: version.version,
            description: "Xellanix ControlMaster",
            copyright: "Copyright (c) 2026, Xellanix",
        },
    },
    minify: true,
    sourcemap: "none",
    bytecode: true,
    define: {
        "process.env.NODE_ENV": JSON.stringify("production"),
        VERSION: JSON.stringify(version.version),
    },
});

if (result.success) {
    console.log("✅ Successfully built server:", result.outputs[0].path);
} else {
    console.error("❌ Failed to build server:", result.logs);
}

export {};
