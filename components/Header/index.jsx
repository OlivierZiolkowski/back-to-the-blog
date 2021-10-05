import Image from "next/image";
import Link from "next/link";
import BlogLogo from "../../assets/deLoreanLogo.svg";
import MenuLogo from "../../assets/icons/menuIcon.svg";
import styles from "./header.module.scss";
import Navbar from "../Nav";
import { useState } from "react";

export default function Header() {
    // useState to handle main menu visibility on mobile screens
    const [visible, setVisibility] = useState(false);

    function displayMenu() {
        visible ? setVisibility(false) : setVisibility(true);
    }

    return (
        <header className={styles.header}>
            {/* Logo */}
            <Link href="/">
                <a>
                    <Image
                        layout="fixed"
                        src={BlogLogo}
                        alt="Return to homepage"
                        width={96}
                        height={96}
                    />
                </a>
            </Link>

            {/* Navbar */}
            <Navbar visible={visible} />

            {/* Search & Menu logos */}
            <div className={styles.commands}>
                {/* Menu logo (only on mobile screens) */}
                <div className={styles.menuLogo} onClick={() => displayMenu()}>
                    <Image
                        layout="fixed"
                        src={MenuLogo}
                        alt="Afficher le menu"
                        width={24}
                        height={24}
                    />
                </div>
            </div>
        </header>
    );
}
