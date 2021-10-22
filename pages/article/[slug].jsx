/**
 * PostPage component represents a single post page.
 */

// Functions
import { getPostBySlug, deletePost, getPosts } from "@lib/firebase";
import { getFormattedDate } from "@lib/utils";

// Components
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { Layout } from "@components";
import { useAuth } from "@contexts/auth";

// Styles & assets
import styles from "@styles/post.module.scss";
import modifyIcon from "@assets/icons/modifyIcon.svg";
import deleteIcon from "@assets/icons/deleteIcon.svg";

//* PostPage component
export default function PostPage({ post }) {
    const router = useRouter();
    const [user] = useAuth();

    // Check if post 'Object' receives one or more property
    const postLength = Object.keys(post).length;

    // If post is empty, redirect to 404
    if (postLength === 0 && typeof window !== "undefined") {
        router.push("/404");
        return;
    }
    // Handle servor error "Cannot read property of..."
    // If post has no property, return null to redirect user
    if (postLength === 0) {
        return null;
    }

    return (
        <>
            {/**
             * Head page parameters
             */}
            <Head>
                <title>{post.title} | Back to the blog !</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <meta
                    name="description"
                    content={post.content.substr(0, 100)}
                />
            </Head>

            {/**
             * Body page elements
             */}
            <Layout>
                <article className={styles.postPage}>
                    {/**
                     * Header of a post - contains informations
                     * and commands is an user is connected
                     */}
                    <div className={styles.postPageHeader}>
                        <div>
                            <div>
                                <span>{post.category}</span>
                                <span>
                                    {getFormattedDate(post.dateCreated)}
                                </span>
                            </div>

                            {/**
                             * Only if an user is connected
                             */}
                            {user && (
                                <div>
                                    <button
                                        onClick={() =>
                                            router.push(`/edit/${post.slug}`)
                                        }
                                    >
                                        <Image
                                            src={modifyIcon}
                                            alt="Modifier cet article"
                                            width={24}
                                            height={24}
                                            layout="fixed"
                                        />
                                    </button>
                                    <button
                                        onClick={() => {
                                            const shouldDeletePost = confirm(
                                                "Are you sure you want to delete this post ?"
                                            );
                                            if (shouldDeletePost) {
                                                deletePost(post.id).then(() => {
                                                    router.push("/");
                                                });
                                            }
                                        }}
                                    >
                                        <Image
                                            src={deleteIcon}
                                            alt="Supprimer cet article"
                                            width={24}
                                            height={24}
                                            layout="fixed"
                                        />
                                    </button>
                                </div>
                            )}
                        </div>
                        <h1>{post.title}</h1>
                    </div>

                    {/**
                     * Post main illustration
                     */}
                    <div className={styles.postPageCoverImage}>
                        <Image
                            src={post.coverImage}
                            alt={post.coverImageAlt}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>

                    {/**
                     * Contains the paragraphs of the post
                     */}
                    <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
                </article>
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

// Generates props for the post page
export async function getStaticProps({ params }) {
    const post = await getPostBySlug(params.slug);

    return {
        props: {
            post,
        },
    };
}
