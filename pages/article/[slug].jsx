// Functions
import { getPostBySlug } from "@lib/firebase";
import { getFormattedDate } from "@lib/utils";
// Components
import { useRouter } from "next/router";
import Image from "next/image";
import { Layout } from "@components";
import { useAuth } from "@contexts/auth";
// Styles & assets
import styles from "@styles/post.module.scss";
import modifyIcon from "@assets/icons/modifyIcon.svg";
import deleteIcon from "@assets/icons/deleteIcon.svg";

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
        <Layout>
            <article className={styles.postPage}>
                <div className={styles.postPageHeader}>
                    <div>
                        <div>
                            <span>{post.category}</span>
                            <span>{getFormattedDate(post.dateCreated)}</span>
                        </div>
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
                                <button onClick={() => router.push("/s")}>
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
                <div className={styles.postPageCoverImage}>
                    <Image
                        src={post.coverImage}
                        alt={post.coverImageAlt}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
            </article>
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
