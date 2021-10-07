import { Layout } from "@components";
import Link from "next/link";
import styles from "@styles/category.module.scss";
import { getPostsByCategory } from "@lib/firebase";
import { useRouter } from "next/router";
import { ArticleCategoryCard } from "@components";

export default function CategoryPage({ posts }) {
    const router = useRouter();
    const { slug } = router.query;

    // Handle undefined category slug
    if (posts.length === 0 && typeof window !== "undefined") {
        router.push("/404");
        return;
    }
    if (posts.length === 0) {
        return null;
    }

    return (
        <Layout>
            <main className={styles.categoryPage}>
                <h1>Tous les articles du {slug}</h1>
                <section>
                    {posts.map((post, index) => (
                        <Link
                            key={`${post.title}-${index}`}
                            href={`/article/${post.slug}`}
                        >
                            <a>
                                <ArticleCategoryCard
                                    title={post.title}
                                    category={post.category}
                                    coverImage={post.coverImage}
                                    coverImageAlt={post.coverImageAlt}
                                    content={post.content}
                                    dateCreated={post.dateCreated}
                                />
                            </a>
                        </Link>
                    ))}
                </section>
            </main>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const posts = await getPostsByCategory(context.query.slug);

    return {
        props: {
            posts,
        },
    };
}
