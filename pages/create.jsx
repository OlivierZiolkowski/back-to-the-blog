// Functions & components
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { createPost } from "@lib/firebase";
import { useState } from "react";

// Styles & assets
import styles from "@styles/create.module.scss";

export default function CreatePage() {
    // Create a new router from 'next-router'
    const router = useRouter();
    // Create a 'loading' state when user creates a new post
    const [isLoading, setIsLoading] = useState(false);

    // Formik parameters for new post creation form
    const formik = useFormik({
        initialValues: {
            title: "",
            category: "",
            coverImage: "",
            coverImageAlt: "",
            content: "",
        },
        // Validation
        validationSchema: Yup.object({
            title: Yup.string()
                .max(100, "Le titre doit faire moins de 100 caractères")
                .required("Veuillez renseigner un titre"),
            category: Yup.string()
                .oneOf(
                    ["passé", "présent", "futur"],
                    "Catégorie choisie invalide"
                )
                .required("Veuillez choisir une catégorie"),
            coverImage: Yup.string()
                .url("Le chemin doit être une URL vers une image")
                .required("Veuillez ajouter un lien vers une illustration"),
            coverImageAlt: Yup.string().required(
                "Veillez ajouter une description de l'illustration"
            ),
            content: Yup.string().required(
                "Veuillez ajouter le contenu de votre article"
            ),
        }),
        // Defines what's happened on form submission
        onSubmit: (values) => {
            setIsLoading(true);
            createPost(values)
                .then(() => {
                    setIsLoading(false);
                    alert("Votre article a bien été créé");
                    router.push("/");
                })
                .catch((err) => {
                    alert(err);
                    setIsLoading(false);
                });
        },
    });

    return (
        <div className={styles.CreatePage}>
            <form onSubmit={formik.handleSubmit}>
                <h1>Écrire un nouvel article</h1>
                {/*
                    Post title field 
                */}
                <label htmlFor="title">Titre de l&apos;article</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title ? (
                    <div className="errorMessage">{formik.errors.title}</div>
                ) : null}
                {/*
                    Post category field
                */}
                <label htmlFor="category">Catégorie</label>
                <select
                    id="category"
                    name="category"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <option value=""></option>
                    <option value="passé">Passé</option>
                    <option value="présent">Présent</option>
                    <option value="futur">Futur</option>
                </select>
                {formik.touched.category && formik.errors.category ? (
                    <div className="errorMessage">{formik.errors.category}</div>
                ) : null}

                {/*
                    Post cover image field
                */}
                <label htmlFor="coverImage">Illustration</label>
                <input
                    id="coverImage"
                    name="coverImage"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.coverImage}
                />
                {formik.touched.coverImage && formik.errors.coverImage ? (
                    <div className="errorMessage">
                        {formik.errors.coverImage}
                    </div>
                ) : null}

                {/*
                    Post cover image alt field
                */}
                <label htmlFor="coverImageAlt">
                    Description de l&apos;illustation
                </label>
                <input
                    id="coverImageAlt"
                    name="coverImageAlt"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.coverImageAlt}
                />
                {formik.touched.coverImageAlt && formik.errors.coverImageAlt ? (
                    <div className="errorMessage">
                        {formik.errors.coverImageAlt}
                    </div>
                ) : null}

                {/*
                    Post content field
                */}
                <label htmlFor="content">Contenu</label>
                <textarea
                    id="content"
                    name="content"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.content}
                />
                {formik.touched.content && formik.errors.content ? (
                    <div className="errorMessage">{formik.errors.content}</div>
                ) : null}

                <button type="submit">Créer</button>
            </form>
        </div>
    );
}
