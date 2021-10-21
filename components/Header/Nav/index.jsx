/**
 * Nav is a sub-component used inside Header component
 * It's handle post categories links & about section link
 */

// Hooks & components
import { useState, useEffect } from "react";
import { getCategories } from "@lib/firebase";
import Link from "next/link";
import PropTypes, { bool } from "prop-types";

// Assets & styles
import styles from "./nav.module.scss";

// Nav component
export default function Nav({ visible }) {
    // Defines useState hook to setting dynamic categories
    const [categories, setCategories] = useState([]);

    // Defines useState to fetch categories on component mounting
    useEffect(() => {
        async function fetchCategories() {
            try {
                const dbCategories = await getCategories();
                setCategories(dbCategories);
            } catch (err) {
                console.log(err);
            }
        }
        fetchCategories();
    }, []);

    return (
        <nav
            className={!visible ? styles.navbar : styles.navbarVisible}
            id="navbar"
        >
            <ul>
                {categories.map((category, index) => (
                    <Link
                        key={`${category.title}-${index}`}
                        href={`/categorie/${category.title}`}
                    >
                        <a>
                            <li>{category.title}</li>
                        </a>
                    </Link>
                ))}
                <a href="https://github.com/OlivierZiolkowski/back-to-the-blog">
                    <li>à propos</li>
                </a>
            </ul>
        </nav>
    );
}

// PropTypes
Nav.propTypes = {
    visible: PropTypes.bool.isRequired,
};
