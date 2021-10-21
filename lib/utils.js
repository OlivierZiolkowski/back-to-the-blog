// Import tools & functions
import slugify from "slugify";

/**
 * getFormattedDate transforms milliseconds date
 * on a  human readable date format
 */
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

/**
 * slugifyTitle transforms a string (like a post title)
 * in a custom slug for http request
 */
export function slugifyTitle(title) {
    const slugifiedTitle = slugify(title, {
        replacement: "-",
        lower: true,
        strict: true,
    });

    return slugifiedTitle;
}

/**
 * Function who display a thumbnail of a image file
 * purposed on creation of a post
 */
export function previewFile() {
    let preview = document.querySelector("#previewImg");
    let file = document.getElementById("coverImage").files[0];
    let reader = new FileReader();

    reader.addEventListener(
        "load",
        function () {
            preview.src = reader.result;
        },
        false
    );

    if (file) {
        reader.readAsDataURL(file);
        preview.style.display = "inline";
    }
}
