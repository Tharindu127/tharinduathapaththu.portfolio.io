// firebase.js
'use client';

import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6l6uyG5iuTcYCYDP8cUOvhKvfaQotr58",
    authDomain: "my-portfolio-and-rest.firebaseapp.com",
    projectId: "my-portfolio-and-rest",
    storageBucket: "my-portfolio-and-rest.firebasestorage.app",
    messagingSenderId: "225744370742",
    appId: "1:225744370742:web:23847554f6a85f14f96c97",
    measurementId: "G-N11P05ZQYT"
};

// Initialize Firebase
let app;
let db;
let analytics = null;

// Only initialize Firebase on the client side
if (typeof window !== 'undefined') {
    // Initialize the app if it doesn't exist already
    const apps = getApps();

    if (apps.length === 0) {
        app = initializeApp(firebaseConfig);
    } else {
        app = apps[0];
    }

    db = getFirestore(app);

    // Only initialize analytics on the client side
    try {
        analytics = getAnalytics(app);
    } catch (error) {
        console.error("Analytics initialization error:", error);
    }
}

// Function to fetch projects from Firestore
export async function fetchProjects() {
    if (!db) {
        console.error("Firestore not initialized");
        return [];
    }

    try {
        const projectsCollection = collection(db, "projects");
        const projectSnapshot = await getDocs(projectsCollection);
        const projectsList = projectSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return projectsList;
    } catch (error) {
        console.error("Error fetching projects: ", error);
        return []; // Return empty array instead of throwing
    }
}

// Function to fetch stats from Firestore
export async function fetchStats() {
    if (!db) {
        console.error("Firestore not initialized");
        return {
            totalProjects: 0,
            totalContributions: 0,
            totalRepositories: 0
        };
    }

    try {
        const statsDoc = doc(db, "stats", "main");
        const statsSnapshot = await getDoc(statsDoc);

        if (statsSnapshot.exists()) {
            return statsSnapshot.data();
        }

        // Return default stats if none exist
        return {
            totalProjects: 0,
            totalContributions: 0,
            totalRepositories: 0
        };
    } catch (error) {
        console.error("Error fetching stats: ", error);
        // Return default stats on error
        return {
            totalProjects: 0,
            totalContributions: 0,
            totalRepositories: 0
        };
    }
}

export { app, analytics, db };