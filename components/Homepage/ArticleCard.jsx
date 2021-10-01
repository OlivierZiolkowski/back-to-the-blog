// Functions & methods
import { getFormattedDate } from "@lib/utils";

// Utils
import PropTypes from "prop-types";

// Assets & styles
import styles from "./ArticleCard.module.scss";

/*
    This component represent article cards on the top 
    of the homepage.
*/
export default function ArticleCard({ title, picture, category, date }) {
    return (
        <article
            className={styles.article}
            style={{
                background: "center/cover no-repeat url(" + picture + ")",
            }}
        >
            <h2>{title}</h2>

            <div className={styles.articleMeta}>
                <p className="article-meta__category">{category}</p>
                <p className="article-meta__date">{getFormattedDate(date)}</p>
            </div>
        </article>
    );
}

// Prop-types
ArticleCard.propTypes = {
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
};
