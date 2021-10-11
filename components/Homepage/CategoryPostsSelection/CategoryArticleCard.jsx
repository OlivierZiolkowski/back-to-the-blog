import styles from "./CategoryArticleCard.module.scss";
import PropTypes from "prop-types";

export default function ArticleCard({ title, category, content, coverImage }) {
    const divBackground = {
        background: "center/cover no-repeat url(" + coverImage + ")",
    };
    return (
        <article className={styles.article}>
            <div className={styles.picture} style={divBackground}>
                <>
                    <span>{category}</span>
                    <h3>{title}</h3>
                </>
            </div>
            <div className={styles.content}>
                <h3>{title}</h3>
                <p>{`${content.substring(0, 100)}... Lire la suite`}</p>
            </div>
        </article>
    );
}

ArticleCard.propTypes = {
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    content: PropTypes.string,
    coverImage: PropTypes.string,
};

ArticleCard.defaultProps = {
    description: "aucune description",
    coverImage:
        "https://firebasestorage.googleapis.com/v0/b/fir-blog-2dd28.appspot.com/o/rick-l-7r8eYPAzONs-unsplash.jpg?alt=media&token=58f920ef-19c9-4d1c-9af4-1ef4b6b0f891",
};
