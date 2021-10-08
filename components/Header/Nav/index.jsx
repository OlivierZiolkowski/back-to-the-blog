import { useState, useEffect } from "react";
import { getCategories } from "@lib/firebase";
import styles from "./nav.module.scss";
import Link from "next/link";

export default function Nav({ visible }) {
    const [categories, setCategories] = useState([]);
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
