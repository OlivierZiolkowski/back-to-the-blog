// Functions
import { getPostBySlug } from "@lib/firebase";
import { getFormattedDate } from "@lib/utils";
// Components
import { useRouter } from "next/router";
import Image from "next/image";
import { Layout } from "@components";
// Styles & assets
import styles from "@styles/post.module.scss";

export default function PostPage({ post }) {
    const router = useRouter();

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
                        <span>{post.category}</span>
                        <span>{getFormattedDate(post.dateCreated)}</span>
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
