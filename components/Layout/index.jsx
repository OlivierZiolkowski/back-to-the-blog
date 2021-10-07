// Components
import Header from "../Header";
import Footer from "../Footer";
// Styles
import styles from "./layout.module.scss";

export default function Layout({ children }) {
    return (
        <div className={styles.layout}>
            <Header />
            {children}
            <Footer />
        </div>
    );
}
