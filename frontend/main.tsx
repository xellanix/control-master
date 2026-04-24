import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/figtree/index.css";
import "@/styles/globals.css";
import App from "./App.tsx";
import { SocketInitiator } from "@/components/stores/socket-initiator.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SocketInitiator />
        <App />
    </StrictMode>,
);
