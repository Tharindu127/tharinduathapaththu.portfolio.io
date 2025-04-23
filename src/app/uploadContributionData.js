// uploadContributionData.js
// Run this script to upload contribution data to Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";

// Your Firebase configuration
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Contribution data from your original component
const contributionData = {
    monday: [
        0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 1, 3, 1, 2, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0
    ],
    tuesday: [
        0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 2, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 2,
        0, 1, 1, 2, 0, 0, 0, 2, 1, 0, 0, 1, 2, 0, 0, 2, 1, 1, 1, 1, 0
    ],
    wednesday: [
        0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0
    ],
    thursday: [
        0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0
    ],
    friday: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 2, 2,
        0, 1, 2, 2, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    lastUpdated: new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD format
};

async function uploadContributionData() {
    try {
        // Upload to Firestore
        await setDoc(doc(db, "contributions", "gitlab"), contributionData);
        console.log("GitLab contribution data uploaded successfully!");
    } catch (error) {
        console.error("Error uploading contribution data:", error);
    }
}

// Execute the upload
uploadContributionData();