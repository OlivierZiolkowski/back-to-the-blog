/**
 * Layout is a component used for calling components
 * who are calling every time like Header & Footer.
 * Layout applied these components to the children.
 */

// Components
import Header from "../Header";
import Footer from "../Footer";
// Styles
import styles from "./layout.module.scss";

//* Layout component
export default function Layout({ children }) {
    return (
        <div className={styles.layout}>
            <Header />
            {children}
            <Footer />
        </div>
    );
}
