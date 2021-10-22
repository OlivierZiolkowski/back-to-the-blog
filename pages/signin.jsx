/**
 * Signin page represents where an user can
 * logged with his id / password
 */

// Components
import { Layout } from "@components";
import { useRouter } from "next/router";
import Head from "next/head";
import { signIn } from "@lib/firebase";
import { useAuth } from "@contexts/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { SigninValidationSchema } from "@lib/yup";

// Styles
import styles from "@styles/signin.module.scss";

//* SignInPage component
const SignInPage = () => {
    const router = useRouter();
    const [user, userLoading] = useAuth();

    // If user is already connected, app is coming back to homepage
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
                    <h1>Connexion à votre compte</h1>
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={SigninValidationSchema}
                        onSubmit={(values) => {
                            signIn(values.email, values.password)
                                .then(() => {
                                    alert("Connexion réussie");
                                    router.push("/");
                                })
                                .catch((err) => {
                                    alert(err);
                                });
                        }}
                    >
                        <Form>
                            {/* Login email field */}
                            <label htmlFor="email">Adresse e-mail</label>
                            <Field type="email" name="email" />
                            <ErrorMessage
                                name="email"
                                render={(msg) => (
                                    <div className="errorMessage">{msg}</div>
                                )}
                            />

                            {/* Login password field */}
                            <label htmlFor="password">Mot de passe</label>
                            <Field type="password" name="password" />
                            <ErrorMessage
                                name="password"
                                render={(msg) => (
                                    <div className="errorMessage">{msg}</div>
                                )}
                            />
                            <button type="submit">Connexion</button>
                        </Form>
                    </Formik>
                </div>
            </Layout>
        </>
    );
};

export default SignInPage;
