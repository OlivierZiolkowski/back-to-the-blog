// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { slugifyTitle } from "./utils";
import {
    getFirestore,
    addDoc,
    collection,
    doc,
    deleteDoc,
    getDocs,
    orderBy,
    query,
    Timestamp,
    updateDoc,
    where,
} from "firebase/firestore";

import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";

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

//* Get firestore database reference
const db = getFirestore();
//* Get firebase app's auth reference
const auth = getAuth();
//* Get Firebase storage reference
const storage = getStorage();

/**
 * Gets all posts from the database in reverse chnological order
 */
export async function getPosts() {
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
                id: doc.id,
            });
        });
    } catch (error) {
        console.log("Error getting documents: ", error);
    }

    return result;
}

/**
 * Creates a new post under /posts in the FireStore Database.
 * Automatically generates the 'dateCreated' property from the
   current UTC time in milliseconds.
 * Defines visibility of a post with isOnline prop to true.
 * Automatically transform the 'title' property to slug with
   slugify plugin. 
 */
export async function createPost(post, imagePath) {
    await addDoc(collection(db, "posts"), {
        title: post.title,
        slug: slugifyTitle(post.title),
        category: post.category,
        isOnline: true,
        dateCreated: Timestamp.now(),
        coverImage: imagePath,
        coverImageAlt: post.coverImageAlt,
        content: post.content,
    });
}

/**
 * Retrieves the data for a single post from a given slug
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
                id: doc.id,
            };
        });
    } catch (err) {
        console.log("Error occured: ", err);
    }

    return post;
}

/**
 * Observes changes in authentication.
 * Receives a callback function that is
   invoked when auth state changes. 
 */

export async function onAuthStateChange(callback) {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
}

/**
 * Attemps to authenticate a user with a given email and password
 */
export async function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Signs out the authenticated user
 */
export async function userSignOut() {
    return signOut(auth)
        .then(() => {
            alert("Vous êtes déconnecté");
        })
        .catch((err) => {
            alert(err);
        });
}

/**
 * Gets all posts from the database in reverse chnological order
 */
export async function getPostsByCategory(category) {
    // Initialize an empty array to retrieve results
    const result = [];
    try {
        // Query to retrieve posts where isOnline is true && order by most recent dates
        const q = query(
            collection(db, "posts"),
            where("isOnline", "==", true),
            where("category", "==", category),
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
}

/**
 * Retrieves categories from the Firestore Database
 */
export async function getCategories() {
    const categories = [];

    try {
        const myQuery = query(collection(db, "categories"));
        const querySnapshot = await getDocs(myQuery);
        querySnapshot.forEach((doc) => {
            categories.push({
                title: doc.data().title,
                slug: doc.data().slug,
            });
        });
    } catch (error) {
        alert("Erreur survenue : " + error);
    }

    return categories;
}

/**
 * Updates the data for the given post in the database
 */
export async function updatePost(post) {
    const updatedPost = doc(db, `/posts/${post.id}`);

    await updateDoc(updatedPost, {
        title: post.title,
        category: post.category,
        content: post.content,
        coverImage: post.coverImage,
        coverImageAlt: post.coverImageAlt,
        dateModified: Timestamp.now(),
        slug: slugifyTitle(post.title),
    });
}

/**
 * Deletes a post from database
 */
export async function deletePost(postId) {
    await deleteDoc(doc(db, `posts/${postId}`));
}

/**
 * Upload images to Firebase storage
 */
export function uploadImage(file, filename) {
    let imageURL = "";
    // Create a reference to the correct distant repository
    const imagesStorageRef = ref(storage, `public/images/${filename}.jpg`);

    const uploadTask = uploadBytesResumable(imagesStorageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progess, including the number of bytes uploaded
            // and the total number of bytes to be uploaded
            const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is" + progress + "% done");
            switch (snapshot.state) {
                case "paused":
                    console.log("Upload is paused");
                    break;
                case "running":
                    console.log("Upload is running");
                    break;
            }
        },
        (error) => {
            // Handle unsuccessful uploads
            console.log("Error occured: ", error);
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                imageURL = downloadURL;
            });
        }
    );

    return imageURL;
}
