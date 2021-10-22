/**
 * yups.js contains each validation schema for
 * formik forms.
 */

// Yup
import * as Yup from "yup";

/**
 * Create post validation form
 */

export const CreatePostSchema = Yup.object({
    title: Yup.string()
        .max(100, "Le titre doit faire moins de 100 caractères")
        .required("Veuillez renseigner un titre"),
    category: Yup.string()
        .oneOf(["passé", "présent", "futur"], "Catégorie choisie invalide")
        .required("Veuillez choisir une catégorie"),
    coverImage: Yup.mixed(),
    coverImageAlt: Yup.string().required(
        "Veillez ajouter une description de l'illustration"
    ),
    content: Yup.string().required(
        "Veuillez ajouter le contenu de votre article"
    ),
});