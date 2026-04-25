import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemTitle,
} from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { isValidUrl } from "@/lib/qr";
import { useRemoteStore } from "@/stores/remote.store";
import { useSocketStore } from "@/stores/socket.store";
import type { TunnelStatus } from "@/types/tunnel";
import {
    Alert02Icon,
    HotspotOfflineIcon,
    Idea01Icon,
    QrCodeIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useCallback, useEffect, useState } from "react";
import { QRCode } from "react-qr-code";

export function ShowQRDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} size={"icon-lg"}>
                    <HugeiconsIcon icon={QrCodeIcon} className="size-12" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Remote Control</DialogTitle>
                    <DialogDescription>
                        Use this QR code or link to access the controller from another device.
                    </DialogDescription>
                </DialogHeader>

                <ItemGroup className="gap-0! *:not-first:rounded-t-none *:not-first:border-t-0 *:not-last:rounded-b-none">
                    <Item variant={"outline"}>
                        <ItemContent>
                            <ItemTitle>Remote Control</ItemTitle>
                            <ItemDescription>Enable or disable remote control.</ItemDescription>
                        </ItemContent>
                        <RemoteAction />
                    </Item>
                    <Alert>
                        <HugeiconsIcon icon={Idea01Icon} />
                        <AlertDescription className="text-pretty">
                            Once you enable the remote control, the system will generate a temporary
                            remote control link. It will expire when the remote control is disabled,
                            and a new temporary link will be generated when it is re-enabled.
                        </AlertDescription>
                    </Alert>
                    <Alert>
                        <HugeiconsIcon icon={Alert02Icon} />
                        <AlertDescription className="text-pretty">
                            Only share the QR code or link with trusted users.
                        </AlertDescription>
                    </Alert>
                </ItemGroup>

                <Item variant={"outline"} className="overflow-hidden p-0">
                    <RemoteLink />
                </Item>
            </DialogContent>
        </Dialog>
    );
}

function RemoteAction() {
    const isActive = useRemoteStore((s) => isValidUrl(s.url));
    const [loading, setLoading] = useState(false);

    const changeCurrent = useCallback(() => {
        const isOn = isValidUrl(useRemoteStore.getState().url);

        const emit = useSocketStore.getState().emit;
        emit("client:tunnel:toggle", !isOn);
    }, []);

    useEffect(() => {
        const socket = useSocketStore.getState().socket;
        if (!socket) return;

        const tunnelStatus = (status: TunnelStatus) => {
            setLoading(status.active === undefined);
            const resolved = (status.active && status.url) || undefined;

            useRemoteStore.getState().setUrl(resolved);
        };

        socket.on("server:tunnel:status", tunnelStatus);
        socket.emit("client:tunnel:status");

        return () => {
            socket.off("server:tunnel:status", tunnelStatus);
        };
    }, []);

    return (
        <ItemActions>
            {loading && <Spinner className="text-muted-foreground" />}
            <span className="text-muted-foreground">
                {loading ? "Loading..." : isActive ? "Enabled" : "Disabled"}
            </span>
            <Switch checked={isActive} onCheckedChange={changeCurrent} disabled={loading} />
        </ItemActions>
    );
}

function RemoteLink() {
    const url = useRemoteStore((s) => s.url);
    const isActive = isValidUrl(url);

    if (!isActive) return <NoLink />;

    return <RemoteLinkCard url={url ?? ""} />;
}

function NoLink() {
    return (
        <Empty>
            <EmptyHeader className="max-w-3xl">
                <EmptyMedia variant={"icon"}>
                    <HugeiconsIcon icon={HotspotOfflineIcon} />
                </EmptyMedia>
                <EmptyTitle>No Remote Control Link Available</EmptyTitle>
                <EmptyDescription>
                    Enable the remote control on this page to generate the link.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    );
}

function RemoteLinkCard({ url }: { url: string }) {
    return (
        <div className="flex w-full flex-col items-center justify-center gap-2 p-8 pb-5.5">
            <QRCode
                value={url ?? ""}
                className="text-brand h-auto max-h-[calc(100dvh-11rem)] w-full max-w-32 @xs/qr:max-w-40 @md/qr:max-w-48"
                size={256}
                viewBox={`0 0 256 256`}
                level="L"
                fgColor="currentColor"
                bgColor="transparent"
            />
            <Button variant="link" asChild>
                <a
                    href={url}
                    className="h-auto! w-full truncate! p-0!"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    {url}
                </a>
            </Button>
        </div>
    );
}
