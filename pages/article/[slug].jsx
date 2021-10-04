import { useRouter } from "next/router";
import styles from "@styles/post.module.scss";

export default function PostPage() {
    const router = useRouter();
    const { slug } = router.query;

    return (
        <div className={styles.PostPage}>
            <h1>Test page article: {slug} !</h1>
        </div>
    );
}
