// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { slugifyTitle } from "./utils";
import {
    getFirestore,
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    Timestamp,
    where,
} from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
let firebaseApp;
if (!getApps().length) {
    firebaseApp = initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    });
} else {
    firebaseApp = getApp();
}

const db = getFirestore();

// Gets all posts from the database in reverse chnological order
export const getPosts = async () => {
    // Initialize an empty array to retrieve results
    const result = [];
    try {
        // Query to retrieve posts where isOnline is true && order by most recent dates
        const q = query(
            collection(db, "posts"),
            where("isOnline", "==", true),
            orderBy("dateCreated", "desc")
        );

        const querySnapshots = await getDocs(q);
        querySnapshots.forEach((doc) => {
            result.push({
                title: doc.data().title,
                category: doc.data().category,
                slug: doc.data().slug,
                coverImage: doc.data().coverImage,
                coverImageAlt: doc.data().coverImageAlt,
                dateCreated: JSON.stringify(doc.data().dateCreated.toMillis()),
                content: doc.data().content,
            });
        });
    } catch (error) {
        console.log("Error getting documents: ", error);
    }

    return result;
};

/*
Creates a new post under /posts in the FireStore Database.
Automatically generates the 'dateCreated' property from the
current UTC time in milliseconds.
Defines visibility of a post with isOnline prop to true.
Automatically transform the 'title' property to slug with
slugify plugin.
*/
export async function createPost(post) {
    await addDoc(collection(db, "posts"), {
        title: post.title,
        slug: slugifyTitle(post.title),
        category: post.category,
        isOnline: true,
        dateCreated: Timestamp.now(),
        coverImage: post.coverImage,
        coverImageAlt: post.coverImageAlt,
        content: post.content,
    });
}

/*
Retrieves the data for a single post from a given slug
*/
export async function getPostBySlug(slug) {
    let post = new Object();

    try {
        // Query to retrieve post with:
        // - where "slug" property is equal to slug passed parameter
        // - where onLine property is true (avoid to see unpublished posts)
        const q = query(
            collection(db, "posts"),
            where("slug", "==", slug),
            where("isOnline", "==", true)
        );

        const querySnapshots = await getDocs(q);
        querySnapshots.forEach((doc) => {
            post = {
                title: doc.data().title,
                category: doc.data().category,
                slug: doc.data().slug,
                coverImage: doc.data().coverImage,
                coverImageAlt: doc.data().coverImageAlt,
                dateCreated: JSON.stringify(doc.data().dateCreated.toMillis()),
                content: doc.data().content,
            };
        });
    } catch (err) {
        console.log("Error occured: ", err);
    }

    return post;
}

/*
Observes changes in authentication.
Receives a callback function that is
invoked when auth state changes.
*/

export async function onAuthStateChange(callback) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
}
