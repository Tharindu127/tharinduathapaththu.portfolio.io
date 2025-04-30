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

// Function to fetch about section data from Firestore
export async function fetchAboutData() {
    if (!db) {
        console.error("Firestore not initialized");
        return null;
    }

    try {
        const aboutDoc = doc(db, "about", "main");
        const aboutSnapshot = await getDoc(aboutDoc);

        if (aboutSnapshot.exists()) {
            return aboutSnapshot.data();
        }

        console.warn("About section data not found");
        return null;
    } catch (error) {
        console.error("Error fetching about data: ", error);
        return null;
    }
}

// Function to fetch technologies from Firestore - optimized for array format
export async function fetchTechnologies() {
    if (!db) {
        console.error("Firestore not initialized");
        return [];
    }

    try {
        console.log("Fetching technologies from Firestore...");

        // First try to get the list document which contains the items array
        const techListDoc = doc(db, "technologies", "list");
        const techListSnapshot = await getDoc(techListDoc);

        if (techListSnapshot.exists()) {
            const data = techListSnapshot.data();

            // Check if we have the items array structure you're already using
            if (data && Array.isArray(data.items)) {
                console.log(`Found technologies list with ${data.items.length} items`);

                // Process the items to ensure they have IDs (for component expectations)
                return data.items.map((tech, index) => ({
                    // Generate ID if not present (normalize for component)
                    id: tech.id || tech.name?.toLowerCase().replace(/\s+/g, '-') || `tech-${index}`,
                    ...tech
                }));
            } else {
                console.warn("Technologies document exists but has unexpected structure", data);
            }
        } else {
            console.warn("Technologies list document not found, trying individual documents approach");
        }

        // If we get here, either the list document doesn't exist or it doesn't have the expected structure
        // Try the individual documents approach as fallback
        const techCollection = collection(db, "technologies");
        const techSnapshot = await getDocs(techCollection);

        if (!techSnapshot.empty) {
            const techList = techSnapshot.docs
                .filter(doc => doc.id !== 'list') // Skip the 'list' document
                .map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

            console.log(`Found ${techList.length} individual technology documents`);
            return techList;
        }

        console.warn("No technologies found in Firestore");
        return [];
    } catch (error) {
        console.error("Error fetching technologies: ", error);
        return [];
    }
}

// Function to fetch technology categories with improved error handling
export async function fetchTechCategories() {
    if (!db) {
        console.error("Firestore not initialized");
        return ["All", "Languages", "Frameworks", "Design", "Tools", "Platforms"]; // Default categories
    }

    try {
        const categoriesDoc = doc(db, "categories", "list");
        const categoriesSnapshot = await getDoc(categoriesDoc);

        if (categoriesSnapshot.exists()) {
            const data = categoriesSnapshot.data();
            if (data && Array.isArray(data.categories) && data.categories.length > 0) {
                return data.categories;
            }
        }

        // Return default categories if none exist or data is malformed
        console.warn("No valid categories found, using defaults");
        return ["All", "Languages", "Frameworks", "Design", "Tools", "Platforms"];
    } catch (error) {
        console.error("Error fetching categories: ", error);
        return ["All", "Languages", "Frameworks", "Design", "Tools", "Platforms"];
    }
}

// Function to fetch social links from Firestore
export async function fetchSocialLinks() {
    if (!db) {
        console.error("Firestore not initialized");
        return [];
    }

    try {
        // First, try to get a document that might contain all social links as an array
        const socialLinksDoc = doc(db, "contactInfo", "socialLinks");
        const socialLinksSnapshot = await getDoc(socialLinksDoc);

        if (socialLinksSnapshot.exists()) {
            const data = socialLinksSnapshot.data();
            if (data && Array.isArray(data.links)) {
                console.log(`Found ${data.links.length} social links`);
                return data.links;
            }
        }

        // If the above approach doesn't work, try getting individual documents from a collection
        const socialLinksCollection = collection(db, "socialLinks");
        const socialLinksQuerySnapshot = await getDocs(socialLinksCollection);

        if (!socialLinksQuerySnapshot.empty) {
            const linksList = socialLinksQuerySnapshot.docs
                .filter(doc => doc.id !== 'list') // Skip any potential 'list' document
                .map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
            console.log(`Found ${linksList.length} individual social link documents`);
            return linksList;
        }

        console.warn("No social links found in Firestore");
        return [];
    } catch (error) {
        console.error("Error fetching social links: ", error);
        return [];
    }
}

// Function to fetch contact info items from Firestore
export async function fetchContactInfo() {
    if (!db) {
        console.error("Firestore not initialized");
        return [];
    }

    try {
        // First, try to get a document that might contain all contact info as an array
        const contactInfoDoc = doc(db, "contactInfo", "contactItems");
        const contactInfoSnapshot = await getDoc(contactInfoDoc);

        if (contactInfoSnapshot.exists()) {
            const data = contactInfoSnapshot.data();
            if (data && Array.isArray(data.items)) {
                console.log(`Found ${data.items.length} contact info items`);
                return data.items;
            }
        }

        // If the above approach doesn't work, try getting individual documents from a collection
        const contactInfoCollection = collection(db, "contactItems");
        const contactInfoQuerySnapshot = await getDocs(contactInfoCollection);

        if (!contactInfoQuerySnapshot.empty) {
            const itemsList = contactInfoQuerySnapshot.docs
                .filter(doc => doc.id !== 'list') // Skip any potential 'list' document
                .map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
            console.log(`Found ${itemsList.length} individual contact info documents`);
            return itemsList;
        }

        console.warn("No contact info items found in Firestore");
        return [];
    } catch (error) {
        console.error("Error fetching contact info items: ", error);
        return [];
    }
}

export { app, analytics, db };