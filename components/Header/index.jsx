/**
 * Header component is used to display main menu & commands
 * and sub components like Nav component
 */

// Components & hooks
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Nav";
import { useState } from "react";
import { useAuth } from "@contexts/auth";
import { userSignOut } from "@lib/firebase";
import { useRouter } from "next/router";

// Assets & styles
import BlogLogo from "@assets/deLoreanLogo.svg";
import MenuLogo from "@assets/icons/menuIcon.svg";
import signInIcon from "@assets/icons/userSignIn.png";
import signOutIcon from "@assets/icons/userSignOut.png";
import createPostIcon from "@assets/icons/blogIcon.png";
import styles from "./header.module.scss";

// Header component
export default function Header() {
    const [user] = useAuth();
    const router = useRouter();
    // useState to handle main menu visibility on mobile screens
    const [visible, setVisibility] = useState(false);

    function displayMenu() {
        visible ? setVisibility(false) : setVisibility(true);
    }

    return (
        <header className={styles.header}>
            {/** Logo */}
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

            {/** Navbar menu
             * includes posts categories & about secction
             */}
            <Navbar visible={visible} />

            {/** Search & Menu logos */}
            <div className={styles.commands}>
                {/** User signIn / signOut & create post buttons
                 * if an user is connected, commands buttons appears
                 */}
                {user && (
                    <>
                        {/** User SignOut button */}
                        <button
                            className={styles.command}
                            onClick={() => {
                                userSignOut();
                            }}
                        >
                            <Image
                                src={signOutIcon}
                                alt="D??connexion de votre profil"
                                width={24}
                                height={24}
                                layout="fixed"
                            />
                        </button>

                        {/** User Create Post button */}
                        <button
                            className={styles.command}
                            onClick={() => router.push("/create")}
                        >
                            <Image
                                src={createPostIcon}
                                alt="??crire un nouvel article"
                                width={24}
                                height={24}
                                layout="fixed"
                            />
                        </button>
                    </>
                )}

                {/** User SignIn button
                 * if an user is not connected
                 */}
                {!user && (
                    <button
                        className={styles.command}
                        onClick={() => router.push("/signin")}
                    >
                        <Image
                            src={signInIcon}
                            alt="Connexion ?? votre profil"
                            width={24}
                            height={24}
                            layout="fixed"
                        />
                    </button>
                )}

                {/** Menu logo (only visible on mobile screens) */}
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
