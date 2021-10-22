/**
 * CreatePage component represent a page
 * where an authenticated user can create
 * a new post.
 */

// Functions & components
import { Layout } from "@components";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { CreatePostSchema } from "@lib/yup";
import { useRouter } from "next/router";
import Head from "next/head";
import { createPost } from "@lib/firebase";
import { useState } from "react";
import { useAuth } from "@contexts/auth";
import { slugifyTitle, previewFile } from "@lib/utils";

// Styles & assets
import styles from "@styles/create.module.scss";

export default function CreatePage() {
    // Create a new router from 'next-router'
    const router = useRouter();

    // Create a 'loading' state when user creates a new post
    const [isLoading, setIsLoading] = useState(false);

    // Check if user is authenticated
    const [user, userLoading] = useAuth();

    // Redirect to 404 if user is not authentified
    if (userLoading) {
        return null;
    }
    if (!user && typeof window !== "undefined") {
        router.push("./");
        return null;
    }

    return (
        <>
            <Head>
                <title>Créer un nouveau post | Back to the blog !</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Layout>
                <div className={styles.CreatePage}>
                    <h1>Écrire un nouvel article</h1>

                    <Formik
                        initialValues={{
                            title: "",
                            category: "",
                            coverImage: null,
                            coverImageAlt: "",
                            content: "",
                        }}
                        validationSchema={CreatePostSchema}
                        onSubmit={(values) => {
                            setIsLoading(true);

                            const imageFile =
                                document.getElementById("coverImage").files[0];
                            const imageName = slugifyTitle(values.title);

                            createPost(values, imageFile, imageName)
                                .then(() => {
                                    setIsLoading(false);
                                    alert("Votre article a bien été créé");
                                    router.push("/");
                                })
                                .catch((err) => {
                                    alert(err);
                                    setIsLoading(false);
                                });
                        }}
                    >
                        <Form>
                            {/* Post title field */}
                            <label htmlFor="title">
                                Titre de l&apos;article
                            </label>
                            <Field type="text" name="title" />
                            <ErrorMessage
                                name="title"
                                render={(msg) => (
                                    <div className="errorMessage">{msg}</div>
                                )}
                            />

                            {/* Post category field */}
                            <label htmlFor="category">Catégorie</label>
                            <Field as="select" name="category">
                                <option value=""></option>
                                <option value="passé">Passé</option>
                                <option value="présent">Présent</option>
                                <option value="futur">Futur</option>
                            </Field>
                            <ErrorMessage
                                name="category"
                                render={(msg) => (
                                    <div className="errorMessage">{msg}</div>
                                )}
                            />

                            {/* Post cover image field */}
                            <label htmlFor="coverImage">Illustration</label>
                            <Field
                                type="file"
                                name="coverImage"
                                accept="image/jpg"
                                onChange={(event) => {
                                    setFieldValue(
                                        "file",
                                        event.currentTarget.files[0]
                                    );
                                    previewFile();
                                }}
                            />

                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img id="previewImg" alt="preview" />
                            <ErrorMessage
                                name="coverImage"
                                render={(msg) => (
                                    <div className="errorMessage">{msg}</div>
                                )}
                            />

                            {/* Post cover image alt field */}
                            <label htmlFor="coverImageAlt">
                                Description de l&apos;illustation
                            </label>
                            <Field name="coverImageAlt" />
                            <ErrorMessage
                                name="coverImageAlt"
                                render={(msg) => (
                                    <div className="errorMessage">{msg}</div>
                                )}
                            />

                            {/* Post content field */}
                            <label htmlFor="content">Contenu</label>
                            <Field as="textarea" name="content" />
                            <ErrorMessage
                                name="content"
                                render={(msg) => (
                                    <div className="errorMessage">{msg}</div>
                                )}
                            />

                            <button type="submit">
                                Créer un nouvel article
                            </button>
                        </Form>
                    </Formik>
                </div>
            </Layout>
        </>
    );
}
