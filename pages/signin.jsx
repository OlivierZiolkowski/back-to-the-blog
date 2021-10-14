// Components
import { Layout } from "@components";
import { useRouter } from "next/router";
import Head from "next/head";
import { signIn } from "@lib/firebase";
import { useAuth } from "@contexts/auth";
import { useFormik } from "formik";
import * as Yup from "yup";

// Styles
import styles from "@styles/signin.module.scss";

const SignInPage = () => {
    const router = useRouter();
    const [user, userLoading] = useAuth();

    /**
     * Sign in form configuration with formik & Yup
     */
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Vous devez indiquer une adresse e-mail valide")
                .required("Veuillez indiquer une adresse e-mail"),
            password: Yup.string().required("Entrez votre mot de passe"),
        }),
        onSubmit: (values) => {
            signIn(values.email, values.password)
                .then(() => {
                    alert("Connexion réussie");
                    router.push("/");
                })
                .catch((err) => {
                    alert(err);
                });
        },
    });

    if (userLoading) {
        return <h1>Loading...</h1>;
    }

    if (user && typeof window !== "undefined") {
        router.push("/");
        return null;
    }

    return (
        <>
            <Head>
                <title>Connexion à votre compte | Back to the blog !</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Layout>
                <div className={styles.SignIn}>
                    <form onSubmit={formik.handleSubmit}>
                        <h1>Connexion à votre compte</h1>
                        {/**
                        Login email field
                     */}
                        <label htmlFor="email">Adresse e-mail</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="errorMessage">
                                {formik.errors.password}
                            </div>
                        ) : null}
                        {/**
                        Login password field
                     */}
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <button type="submit">Connexion</button>
                    </form>
                </div>
            </Layout>
        </>
    );
};

export default SignInPage;
