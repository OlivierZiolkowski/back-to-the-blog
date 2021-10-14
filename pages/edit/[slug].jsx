import { useState } from "react";
import { useRouter } from "next/router";
import { getPostBySlug, updatePost } from "@lib/firebase";
import { useAuth } from "@contexts/auth";
import { Layout } from "@components";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "@styles/edit.module.scss";
import { previewFile, slugifyTitle } from "@lib/utils";

export default function EditPage({ post }) {
    // Create a new router from 'next-router'
    const router = useRouter();

    // Create a 'loading' state when user creates a new post
    const [isLoading, setIsLoading] = useState(false);

    // Check if user is authenticated
    const [user, userLoading] = useAuth();

    // Formik parameters for update post form
    const formik = useFormik({
        initialValues: {
            title: post.title,
            category: post.category,
            coverImage: null,
            coverImageAlt: post.coverImageAlt,
            content: post.content,
            id: post.id,
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
            coverImage: Yup.mixed(),
            coverImageAlt: Yup.string().required(
                "Veillez ajouter une description de l'illustration"
            ),
            content: Yup.string().required(
                "Veuillez ajouter le contenu de votre article"
            ),
            id: Yup.string().required(),
        }),
        // Defines what's happened on form submission
        onSubmit: (values) => {
            setIsLoading(true);

            const imageFile = document.getElementById("coverImage").files[0];
            const imageName = slugifyTitle(values.title);

            updatePost(values, imageFile, imageName)
                .then(() => {
                    setIsLoading(false);
                    alert("Votre article a bien été mis à jour");
                    router.push("/");
                })
                .catch((err) => {
                    alert(err);
                    setIsLoading(false);
                });
        },
    });

    // Redirect to 404 if user is not authentified
    if (userLoading) {
        return null;
    }
    if (!user && typeof window !== "undefined") {
        router.push("./");
        return null;
    }

    return (
        <Layout>
            <div className={styles.EditPage}>
                <form onSubmit={formik.handleSubmit}>
                    <h1>Éditer le post : {post.title}</h1>

                    {/* Post title field */}
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
                        <div className="errorMessage">
                            {formik.errors.title}
                        </div>
                    ) : null}

                    {/* Post category field */}
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
                        <div className="errorMessage">
                            {formik.errors.category}
                        </div>
                    ) : null}

                    {/* Post cover image field */}
                    <label htmlFor="coverImage">Illustration</label>
                    <input
                        id="coverImage"
                        name="coverImage"
                        type="file"
                        accept="image/jpg"
                        onChange={(event) => {
                            formik.setFieldValue(
                                "file",
                                event.currentTarget.files[0]
                            );
                            previewFile();
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.coverImage}
                    />

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img id="previewImg" src={post.coverImage} alt="preview" />

                    {formik.touched.coverImage && formik.errors.coverImage ? (
                        <div className="errorMessage">
                            {formik.errors.coverImage}
                        </div>
                    ) : null}

                    {/* Post cover image alt field */}
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
                    {formik.touched.coverImageAlt &&
                    formik.errors.coverImageAlt ? (
                        <div className="errorMessage">
                            {formik.errors.coverImageAlt}
                        </div>
                    ) : null}

                    {/* Post content field */}
                    <label htmlFor="content">Contenu</label>
                    <textarea
                        id="content"
                        name="content"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.content}
                    />
                    {formik.touched.content && formik.errors.content ? (
                        <div className="errorMessage">
                            {formik.errors.content}
                        </div>
                    ) : null}

                    <button type="submit">Mettre à jour</button>
                </form>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const post = await getPostBySlug(context.query.slug);

    return {
        props: {
            post,
        },
    };
}
