export function getFormattedDate(milliseconds) {
    const formatOptions = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
    };
    const date = new Date(parseInt(milliseconds));
    return date.toLocaleDateString(undefined, formatOptions);
}
