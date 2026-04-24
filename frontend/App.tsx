import { SocketStatus } from "@/components/socket-status";
import { Button } from "@/components/ui/button";
import { ArrowBigDown, ArrowBigLeft, ArrowBigRight, ArrowBigUp } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function App() {
    return (
        <main className="flex h-dvh w-dvw flex-col overflow-hidden px-8 py-16 *:select-none">
            <section className="flex-1">
                <SocketStatus />
            </section>
            <section className="grid grid-cols-[1fr_auto_1fr] grid-rows-3 items-center justify-items-center">
                <Button size={"icon-lg"} className="col-start-2 row-start-1 size-20 rounded-2xl">
                    <HugeiconsIcon icon={ArrowBigUp} className="size-12 fill-current" />
                </Button>
                <Button size={"icon-lg"} className="col-start-2 row-start-3 size-20 rounded-2xl">
                    <HugeiconsIcon icon={ArrowBigDown} className="size-12 fill-current" />
                </Button>
                <Button
                    size={"icon-lg"}
                    className="col-start-1 row-start-2 size-20 justify-self-end rounded-2xl"
                >
                    <HugeiconsIcon icon={ArrowBigLeft} className="size-12 fill-current" />
                </Button>
                <Button
                    size={"icon-lg"}
                    className="col-start-3 row-start-2 size-20 justify-self-start rounded-2xl"
                >
                    <HugeiconsIcon icon={ArrowBigRight} className="size-12 fill-current" />
                </Button>
                <Button
                    size={"icon-lg"}
                    className="col-start-2 row-start-2 size-20 justify-self-start rounded-2xl text-3xl font-extrabold"
                >
                    OK
                </Button>
            </section>
        </main>
    );
}
