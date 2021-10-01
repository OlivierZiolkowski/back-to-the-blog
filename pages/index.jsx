// Assets & stylesheets
import styles from "@styles/index.module.scss";
// Components
import { ArticleCard } from "@components";
// Functions
import { getPosts } from "@lib/firebase";

/*
    App's homepage with differents sections :
    - Last articles (from date) on top
    - By category (one section for each)
*/
export default function Homepage({ posts }) {
    return (
        <section className={styles.lastArticlesSection}>
            {posts.slice(0, 3).map((post) => {
                return (
                    <ArticleCard
                        key={post.title}
                        title={post.title}
                        category={post.category}
                        picture={post.coverImage}
                        date={post.dateCreated}
                    />
                );
            })}
        </section>
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
