import styles from "./nav.module.scss";
import Link from "next/link";

export default function Nav({ visible }) {
    return (
        <nav
            className={!visible ? styles.navbar : styles.navbarVisible}
            id="navbar"
        >
            <ul>
                <Link href="/">
                    <a>
                        <li>passé</li>
                    </a>
                </Link>
                <Link href="/">
                    <a>
                        <li>présent</li>
                    </a>
                </Link>
                <Link href="/">
                    <a>
                        <li>futur</li>
                    </a>
                </Link>
                <Link href="/">
                    <a>
                        <li>à propos</li>
                    </a>
                </Link>
            </ul>
        </nav>
    );
}
