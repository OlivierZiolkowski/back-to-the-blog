// Import tools & functions
import slugify from "slugify";

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

export function slugifyTitle(title) {
    const slugifiedTitle = slugify(title, {
        replacement: "-",
        lower: true,
        strict: true,
    });

    return slugifiedTitle;
}
