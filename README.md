# Xellanix ControlMaster

**Control your Windows PC remotely with ease.**

ControlMaster is a low-latency remote control application that allows you to simulate keyboard inputs on your Windows machine from any web-connected device. It features a modern React-based interface, real-time WebSocket communication, and integrated Cloudflare Tunneling for secure remote access without port forwarding.

> [!IMPORTANT]
> **Windows Only**: This application utilizes the Windows native `user32.dll` via Bun FFI for keyboard hooks and simulation. It will not work on macOS or Linux.

---

## 🚀 Getting Started

### Option 1: Use the Prebuilt App (Recommended)
If you just want to use the app without messing with the code:
1. Go to the [Releases](https://github.com/xellanix/control-master/releases) page.
2. Download the latest `control-master.exe`.
3. Run the executable on your Windows PC.
4. Open the displayed local URL (or activate the Tunnel for remote access) on your phone or another device.

### Option 2: Run from Source
To run this project locally, you need [Bun](https://bun.com/) installed.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/xellanix/control-master.git
   cd control-master
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Start in development mode:**
   ```bash
   bun run dev
   ```
   This will start both the Vite frontend and the Bun backend concurrently.

---

## ✨ Features

- **Real-time Control**: Uses Socket.io for near-instantaneous keyboard input simulation.
- **Remote Access (Tunneling)**: Integrated support for Cloudflare Tunnels (`cloudflared`). You can generate a public `.trycloudflare.com` URL with one click to control your PC from outside your local network.
- **Native Performance**: Built with Bun and native Windows API calls (`keybd_event`) for minimal overhead.
- **Modern UI**: A clean, responsive interface built with React, Tailwind CSS, and Shadcn UI (`b5JiAHxRo`).
- **Self-contained**: Can be compiled into a single `.exe` file for easy distribution.

---

## 🛠️ Requirements

- **Operating System**: Windows 10/11 (x64).
- **Remote Access**: To use the Tunnel feature, you must have `cloudflared` installed in your system PATH. You can download it from [here](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/).
- **Runtime (for dev)**: [Bun](https://bun.com/).

---

## 🏗️ Architecture

1. **Frontend**: A React application that provides the user interface (buttons, status, QR code).
2. **Backend**: A Bun server that:
   - Serves the static frontend files.
   - Manages WebSocket connections.
   - Interfaces with `user32.dll` using FFI to trigger system-level keyboard events.
   - Manages the `cloudflared` child process for tunneling.

---

## 📜 Development Scripts

- `bun run dev`: Runs frontend and server in watch mode.
- `bun run build`: Builds the production frontend and compiles the server into an executable.
- `bun run build:server`: Compiles the server into `dist/server/control-master.exe`.
- `bun run pretty`: Formats the codebase using Prettier.

---

## 📄 License

This project is licensed under the [BSD 2-Clause License](LICENSE).

---
