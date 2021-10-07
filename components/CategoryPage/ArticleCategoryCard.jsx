// Components
import Image from "next/image";
import PropTypes from "prop-types";
// Functions
import { getFormattedDate } from "@lib/utils";

/**
 * This component is used for defines a post card
 * on CategoryPage. This component receives some
 * properties from his parent 'CategoryPage'.
 */

export default function ArticleCategoryCard({
    title,
    category,
    coverImage,
    coverImageAlt,
    content,
    dateCreated,
}) {
    return (
        <article>
            <div>
                <Image
                    src={coverImage}
                    alt={coverImageAlt}
                    objectFit="cover"
                    layout="fill"
                />
                <span>{category}</span>
            </div>
            <div>
                <h2>{title}</h2>
                <p>{content.substring(0, 100)}...</p>
                <p>{getFormattedDate(dateCreated)}</p>
            </div>
        </article>
    );
}

// PropTypes
ArticleCategoryCard.propTypes = {
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    coverImage: PropTypes.string.isRequired,
    coverImageAlt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    dateCreated: PropTypes.string.isRequired,
};
