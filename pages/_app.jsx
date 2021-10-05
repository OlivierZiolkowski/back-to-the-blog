import { AuthProvider } from "@contexts/auth";
import "@styles/global.scss";

export default function App({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}
