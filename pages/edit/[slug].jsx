/**
 * EditPage represents a page where
 * an authenticated user can edit a post.
 */

// Components / hooks / functions
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAuth } from "@contexts/auth";
import { Layout } from "@components";
import { getPostBySlug, updatePost, getPosts } from "@lib/firebase";
import { previewFile, slugifyTitle } from "@lib/utils";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { EditPostValidationSchema } from "@lib/yup";

// Assets & styles
import styles from "@styles/edit.module.scss";

//* Edit page component
export default function EditPage({ post }) {
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
                <title>Éditer {`"${post.title}"`} | Back to the blog !</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Layout>
                <div className={styles.EditPage}>
                    <h1>Éditer le post : {post.title}</h1>
                    <Formik
                        initialValues={{
                            title: post.title,
                            category: post.category,
                            coverImage: null,
                            coverImageAlt: post.coverImageAlt,
                            content: post.content,
                            id: post.id,
                        }}
                        validationSchema={EditPostValidationSchema}
                        onSubmit={(values) => {
                            setIsLoading(true);

                            const imageFile = document.querySelector(
                                "input[name='coverImage']"
                            ).files[0];
                            const imageName =
                                typeof imageFile !== "undefined"
                                    ? slugifyTitle(values.title)
                                    : null;
                            updatePost(values, imageFile, imageName)
                                .then(() => {
                                    setIsLoading(false);
                                    alert(
                                        "Votre article a bien été mis à jour"
                                    );
                                    router.push("/");
                                })
                                .catch((err) => {
                                    alert(err);
                                    setIsLoading(false);
                                });
                        }}
                    >
                        {({ setFieldValue }) => (
                            <Form>
                                {/* Post title field */}
                                <label htmlFor="title">
                                    Titre de l&apos;article
                                </label>
                                <Field name="title" />
                                <ErrorMessage
                                    name="title"
                                    render={(msg) => <div>{msg}</div>}
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
                                    render={(msg) => <div>{msg}</div>}
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
                                <img
                                    id="previewImg"
                                    src={post.coverImage}
                                    alt="preview"
                                />
                                <ErrorMessage
                                    name="coverImage"
                                    render={(msg) => <div>{msg}</div>}
                                />

                                {/* Post cover image alt field */}
                                <label htmlFor="coverImageAlt">
                                    Description de l&apos;illustation
                                </label>
                                <Field name="coverImageAlt" />
                                <ErrorMessage
                                    name="coverImageAlt"
                                    render={(msg) => <div>{msg}</div>}
                                />

                                {/* Post content field */}
                                <label htmlFor="content">Contenu</label>
                                <Field as="textarea" name="content" />
                                <ErrorMessage
                                    name="content"
                                    render={(msg) => <div>{msg}</div>}
                                />

                                <button type="submit">
                                    Mettre à jour l&apos;article
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Layout>
        </>
    );
}

// Pre-render each post & indicates the path
export async function getStaticPaths() {
    const posts = await getPosts();

    const paths = posts.map((post) => ({
        params: { slug: post.slug },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const post = await getPostBySlug(params.slug);

    return {
        props: {
            post,
        },
    };
}
