/**
 * Category Page component.
 * Defines a page who contains a page with posts
 * with a selected category.
 */

// Components / Hooks / functions
import { Layout, ArticleCategoryCard } from "@components";
import { getPostsByCategory, getCategories } from "@lib/firebase";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

// Assets & styles
import styles from "@styles/category.module.scss";

//* CategoryPage component
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
        <>
            {/**
             * Head page parameters
             */}
            <Head>
                <title>{slug} | Back to the blog !</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <meta
                    name="description"
                    content={`Retrouvez tous les articles de la catégorie ${slug} de Back to the blog !`}
                />
            </Head>

            {/**
             * Body page elements
             */}
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
        </>
    );
}

// Pre-render each post & indicates the path
export async function getStaticPaths() {
    const categories = await getCategories();

    const paths = categories.map((category) => ({
        params: { slug: category.title },
    }));

    return { paths, fallback: false };
}

// Generates props for the post page
export async function getStaticProps({ params }) {
    const posts = await getPostsByCategory(params.slug);

    return {
        props: {
            posts,
        },
    };
}
