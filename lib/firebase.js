/**
 * firebase.js contains each Firebase rules needed
 * for app's functionning.
 */

// Functions
import { slugifyTitle } from "./utils";

// Firebase/app functions
import { initializeApp, getApps, getApp } from "firebase/app";

// Firestore functions
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

// Firebase/auth functions
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

// Firebase/storage functions
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";

//* firebaseApp configuration
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
export async function createPost(post, file, fileName) {
    // Create a reference to the correct distant repository
    const imagesStorageRef = ref(storage, `public/images/${fileName}.jpg`);
    //
    const uploadTask = uploadBytesResumable(imagesStorageRef, file);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
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
            switch (error.code) {
                case "storage/unknown":
                    alert(
                        "Une erreur inconnue est survenue, réessayer plus tard"
                    );
                    break;
                case "storage/unauthorized":
                    alert("Vous n'êtes pas autorisé à réaliser cette action");
                    break;
                case "storage/retry-limit-exceeded":
                    alert(
                        "Temps limite de l'opération atteint. Essayez plus tard"
                    );
                    break;
            }
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                addDoc(collection(db, "posts"), {
                    title: post.title,
                    slug: slugifyTitle(post.title),
                    category: post.category,
                    isOnline: true,
                    dateCreated: Timestamp.now(),
                    coverImage: downloadURL,
                    coverImageAlt: post.coverImageAlt,
                    content: post.content,
                });
            });
        }
    );
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
export async function updatePost(post, file, fileName) {
    // Create a reference to the correct distant repository
    const imagesStorageRef = ref(storage, `public/images/${fileName}.jpg`);
    // Reach the post will be updated
    const updatedPost = doc(db, `/posts/${post.id}`);

    const uploadTask = uploadBytesResumable(imagesStorageRef, file);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
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
            switch (error.code) {
                case "storage/unknown":
                    alert(
                        "Une erreur inconnue est survenue, réessayer plus tard"
                    );
                    break;
                case "storage/unauthorized":
                    alert("Vous n'êtes pas autorisé à réaliser cette action");
                    break;
                case "storage/retry-limit-exceeded":
                    alert(
                        "Temps limite de l'opération atteint. Essayez plus tard"
                    );
                    break;
            }
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                updateDoc(updatedPost, {
                    title: post.title,
                    category: post.category,
                    content: post.content,
                    coverImage: downloadURL,
                    coverImageAlt: post.coverImageAlt,
                    dateModified: Timestamp.now(),
                    slug: slugifyTitle(post.title),
                });
            });
        }
    );
}

/**
 * Deletes a post from database
 */
export async function deletePost(postId) {
    await deleteDoc(doc(db, `posts/${postId}`));
}
