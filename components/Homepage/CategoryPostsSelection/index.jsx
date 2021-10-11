import Link from "next/link";
import CategoryArticleCard from "./CategoryArticleCard";
import styles from "./CategoryPostsSection.module.scss";
import PropTypes from "prop-types";

export default function CategoryPostsSection({ posts, category, limitPosts }) {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2>{category}</h2>
                <Link href={`/categorie/${category}`}>
                    <a>Voir tous les articles</a>
                </Link>
            </div>
            <div className={styles.grid}>
                {posts.slice(0, limitPosts).map((post, index) => (
                    <Link
                        key={`${index}-${post.title}`}
                        href={`/article/${post.slug}`}
                    >
                        <a className={styles.articleContent}>
                            <CategoryArticleCard
                                title={post.title}
                                category={post.category}
                                content={post.content}
                                coverImage={post.coverImage}
                                coverImageAlt={post.coverImageAlt}
                            />
                        </a>
                    </Link>
                ))}
            </div>
        </section>
    );
}

CategoryPostsSection.propTypes = {
    posts: PropTypes.array,
    category: PropTypes.string.isRequired,
    limitPosts: PropTypes.number,
};
