// Assets & stylesheets
import styles from "@styles/index.module.scss";
// Components
import { ArticleCard } from "@components";
import { Layout } from "@components";
import Link from "next/link";
// Functions
import { getPosts } from "@lib/firebase";

/*
    App's homepage with differents sections :
    - Last articles (from date) on top
    - By category (one section for each)
*/
export default function Homepage({ posts }) {
    return (
        <Layout>
            <section className={styles.lastArticlesSection}>
                {posts.slice(0, 3).map((post) => {
                    return (
                        <Link key={post.title} href={`/article/${post.slug}`}>
                            <a>
                                <ArticleCard
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
        </Layout>
    );
}

// Generate props at each user's request
export async function getServerSideProps() {
    const posts = await getPosts();

    return {
        props: {
            posts,
        },
    };
}
