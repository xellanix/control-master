import { ControlButton } from "@/components/control-button";
import { SocketStatus } from "@/components/socket-status";
import { ArrowBigDown, ArrowBigLeft, ArrowBigRight, ArrowBigUp } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <main className="flex h-dvh w-dvw flex-col overflow-hidden px-8 py-16 *:select-none">
            <section className="flex-1">
                <SocketStatus />
                <Outlet />
            </section>
            <section className="grid grid-cols-[1fr_auto_1fr] grid-rows-3 items-center justify-items-center *:size-20 *:rounded-2xl">
                <ControlButton target="up" size={"icon-lg"} className="col-start-2 row-start-1">
                    <HugeiconsIcon icon={ArrowBigUp} className="size-12 fill-current" />
                </ControlButton>
                <ControlButton target="down" size={"icon-lg"} className="col-start-2 row-start-3">
                    <HugeiconsIcon icon={ArrowBigDown} className="size-12 fill-current" />
                </ControlButton>
                <ControlButton
                    target="left"
                    size={"icon-lg"}
                    className="col-start-1 row-start-2 justify-self-end"
                >
                    <HugeiconsIcon icon={ArrowBigLeft} className="size-12 fill-current" />
                </ControlButton>
                <ControlButton
                    target="right"
                    size={"icon-lg"}
                    className="col-start-3 row-start-2 justify-self-start"
                >
                    <HugeiconsIcon icon={ArrowBigRight} className="size-12 fill-current" />
                </ControlButton>
                <ControlButton
                    target="enter"
                    size={"icon-lg"}
                    className="col-start-2 row-start-2 justify-self-start text-3xl font-extrabold"
                >
                    OK
                </ControlButton>
            </section>
        </main>
    );
}
