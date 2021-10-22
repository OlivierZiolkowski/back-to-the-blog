/**
 * Homepage represents the homepage of the app
 * It's contains a section with the last three articles
 * and a section by posts category
 */

// Assets & stylesheets
import styles from "@styles/index.module.scss";

// Components
import { LastArticleCard, CategoryPostsSection } from "@components";
import { Layout } from "@components";
import Link from "next/link";
import Head from "next/head";

// Functions
import { getPosts } from "@lib/firebase";

//* Homepage component
export default function Homepage({ posts }) {
    return (
        <>
            <Head>
                <title>Back to the blog !</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Layout>
                <section className={styles.lastArticlesSection}>
                    {posts.slice(0, 3).map((post) => {
                        return (
                            <Link
                                key={post.title}
                                href={`/article/${post.slug}`}
                            >
                                <a>
                                    <LastArticleCard
                                        title={post.title}
                                        category={post.category}
                                        picture={post.coverImage}
                                        date={post.dateCreated}
                                    />
                                </a>
                            </Link>
                        );
                    })}
                </section>
                {/* Last 6 posts finded by date, "past" category and status */}
                <CategoryPostsSection
                    posts={posts.filter((post) => post.category === "passé")}
                    category="passé"
                    limitPosts={4}
                />
                {/* Last 4 posts finded by date, "present" category and status */}
                <CategoryPostsSection
                    posts={posts.filter((post) => post.category === "présent")}
                    category="présent"
                    limitPosts={6}
                />
                {/* Last 4 posts finded by date, "future" category and status */}
                <CategoryPostsSection
                    posts={posts.filter((post) => post.category === "futur")}
                    category="futur"
                    limitPosts={4}
                />
            </Layout>
        </>
    );
}

// Generate props at each user's request
export async function getStaticProps() {
    const posts = await getPosts();

    return {
        props: {
            posts,
        },
    };
}
