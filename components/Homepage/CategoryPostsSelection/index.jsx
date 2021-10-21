/**
 * CategoryPostsSection component is used for
 * generate a new section by category inside Homepage.
 * Each section have 4 - 6 posts of the selected category.
 */

// Components / Hooks / Functions
import Link from "next/link";
import CategoryArticleCard from "./CategoryArticleCard";
import PropTypes from "prop-types";
// Assets & styles
import styles from "./CategoryPostsSection.module.scss";

//* CategoryPostsSection component
export default function CategoryPostsSection({ posts, category, limitPosts }) {
    return (
        <section className={styles.section}>
            {/**
             * Defines the name of the category & a link for the category posts page
             */}
            <div className={styles.header}>
                <h2>{category}</h2>
                <Link href={`/categorie/${category}`}>
                    <a>Voir tous les articles</a>
                </Link>
            </div>

            {/**
             * Retrieves last posts from the category selected
             */}
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

// Proptypes
CategoryPostsSection.propTypes = {
    posts: PropTypes.array,
    category: PropTypes.string.isRequired,
    limitPosts: PropTypes.number,
};
