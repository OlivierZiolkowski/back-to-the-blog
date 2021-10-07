import styles from "./nav.module.scss";
import Link from "next/link";

export default function Nav({ visible }) {
    return (
        <nav
            className={!visible ? styles.navbar : styles.navbarVisible}
            id="navbar"
        >
            <ul>
                <Link href="/categorie/passé">
                    <a>
                        <li>passé</li>
                    </a>
                </Link>
                <Link href="/categorie/présent">
                    <a>
                        <li>présent</li>
                    </a>
                </Link>
                <Link href="/categorie/futur">
                    <a>
                        <li>futur</li>
                    </a>
                </Link>
                <a href="https://github.com/OlivierZiolkowski/back-to-the-blog">
                    <li>à propos</li>
                </a>
            </ul>
        </nav>
    );
}
