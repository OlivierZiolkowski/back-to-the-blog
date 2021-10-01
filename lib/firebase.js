// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    where,
    query,
    orderBy,
} from "firebase/firestore";

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
