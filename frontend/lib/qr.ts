export function isValidUrl(url?: string) {
    try {
        if (!url) return false;

        const _ = new URL(url);
        return _.protocol === "http:" || _.protocol === "https:";
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
        return false;
    }
}
