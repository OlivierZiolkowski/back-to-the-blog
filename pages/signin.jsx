// Components
import { useState } from "react";
import { useRouter } from "next/router";
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

    // const handleChange = (e) => {
    //     const id = e.target.id;
    //     const newValue = e.target.value;

    //     setValues({ ...values, [id]: newValue });
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     let missingValues = [];
    //     Object.entries(values).forEach(([key, value]) => {
    //         if (!value) {
    //             missingValues.push(key);
    //         }
    //     });

    //     if (missingValues.length > 1) {
    //         alert(`You're missing these fields: ${missingValues.join(", ")}`);
    //         return;
    //     }

    //     signIn(values.email, values.password).catch((err) => {
    //         alert(err);
    //     });
    // };

    return (
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
                    <div className="errorMessage">{formik.errors.password}</div>
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
    );
};

export default SignInPage;
