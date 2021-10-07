// Next components
import Link from "next/link";
import Image from "next/image";

// Style file
import styles from "./footer.module.scss";

// Assets
import BlogLogo from "../../assets/deLoreanLogo.svg";
import githubLogo from "../../assets/icons/githubIcon.svg";
import linkedinLogo from "../../assets/icons/linkedinIcon.svg";
import emailIcon from "../../assets/icons/emailIcon.svg";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerBackground} />
            <div className={styles.footerInformations}>
                <Image
                    src={BlogLogo}
                    width={196}
                    height={196}
                    layout="fixed"
                    alt="Back to the blog !"
                />
                <h1>Back to the blog !</h1>
                <div className={styles.socialMedias}>
                    <Link href="https://github.com/OlivierZiolkowski">
                        <a>
                            <Image
                                src={githubLogo}
                                width={32}
                                height={32}
                                layout="fixed"
                                alt="Lien vers la page GitHub de l'auteur"
                            />
                        </a>
                    </Link>
                    <Link href="https://www.linkedin.com/in/olivier-ziolkowski/">
                        <a>
                            <Image
                                src={linkedinLogo}
                                width={32}
                                height={32}
                                layout="fixed"
                                alt="Lien vers la page LinkedIn de l'auteur"
                            />
                        </a>
                    </Link>
                    <Link href="mailto:olivier.ziolkowski@gmail.com">
                        <a>
                            <Image
                                src={emailIcon}
                                width={32}
                                height={32}
                                layout="fixed"
                                alt="Envoyez un courriel à l'auteur"
                            />
                        </a>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
