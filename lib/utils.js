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

/**
 * Fonction qui permet d'afficher un thumbnail d'un fichier
 * image qui est proposé à la création / modification d'un article
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
