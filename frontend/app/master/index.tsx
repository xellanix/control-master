import { ShowQRDialog } from "@/components/dialogs/qr";
import { Toggle } from "@/components/ui/toggle";
import { useSocketStore } from "@/stores/socket.store";
import { UserLock01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function MasterPage() {
    const isTrulyLocal = useSocketStore((s) => s.isLocal);
    if (!isTrulyLocal) return null;

    if (typeof window === "undefined") return null;

    const href = window.location.href;
    const port = import.meta.env.DEV ? "26042" : "26041";
    if (!(href.endsWith(`localhost:${port}/master`) || href.endsWith(`127.0.0.1:${port}/master`))) {
        console.log("test", href);
        return null;
    }

    return (
        <div className="mt-8 flex items-center justify-center gap-4 *:size-20 *:rounded-2xl">
            <ShowQRDialog />
            <Toggle variant={"outline"} size={"lg"}>
                <HugeiconsIcon icon={UserLock01Icon} className="size-12" />
            </Toggle>
        </div>
    );
}
