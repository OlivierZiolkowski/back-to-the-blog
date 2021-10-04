// Functions & components
import { useFormik } from "formik";
import * as Yup from "yup";

// Styles & assets
import styles from "@styles/create.module.scss";

export default function CreatePage() {
    const formik = useFormik({
        initialValues: {
            title: "",
            category: "",
            coverImage: "",
            coverImageAlt: "",
            content: "",
        },
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
            coverImage: Yup.string().required(
                "Veuillez ajouter un lien vers une illustration"
            ),
            coverImageAlt: Yup.string().required(
                "Veillez ajouter une description de l'illustration"
            ),
            content: Yup.string().required(
                "Veuillez ajouter le contenu de votre article"
            ),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className={styles.CreatePage}>
            <form onSubmit={formik.handleSubmit}>
                <h1>Écrire un nouvel article</h1>
                {/* Post title field*/}
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
                {/* Post category field*/}
                <label htmlFor="category">Catégorie</label>
                <select
                    id="category"
                    name="category"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <option value="passé">Passé</option>
                    <option value="présent">Présent</option>
                    <option value="futur">Futur</option>
                </select>
                {formik.touched.category && formik.errors.category ? (
                    <div className="errorMessage">{formik.errors.category}</div>
                ) : null}

                {/* Post cover image field*/}
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

                {/* Post cover image alt field*/}
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

                {/* Post content field*/}
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
