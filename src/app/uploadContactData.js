// uploadContactData.js
// This script uploads your existing contact information and social links to Firebase

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Your Firebase configuration - make sure this matches your firebase.js
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

// Define your existing social links
const socialLinksData = {
    links: [
        {
            icon: 'Github',
            url: 'https://github.com/Tharindu127',
            ariaLabel: 'GitHub Profile'
        },
        {
            icon: 'Facebook',
            url: 'https://www.facebook.com/profile.php?id=100008335572167',
            ariaLabel: 'Facebook Profile'
        },
        {
            icon: 'Instagram',
            url: 'https://www.instagram.com/tharindu_athapaththu',
            ariaLabel: 'Instagram Profile'
        },
        {
            icon: 'Twitter',
            url: 'https://x.com/tharindu_athapa',
            ariaLabel: 'Twitter Profile'
        },
        {
            icon: 'Linkedin',
            url: 'https://linkedin.com/in/tharindu-athapaththu-148908160',
            ariaLabel: 'LinkedIn Profile'
        }
    ]
};

// Define your existing contact information
const contactItemsData = {
    items: [
        {
            icon: 'Phone',
            label: 'Phone',
            value: '+94 71 22 81 572',
            truncate: false,
            bgColor: 'bg-blue-500/20'
        },
        {
            icon: 'MapPin',
            label: 'Location',
            value: 'Piliyandala, Sri Lanka',
            truncate: false,
            bgColor: 'bg-blue-500/20'
        },
        {
            icon: 'Mail',
            label: 'Email',
            value: 'tharinduathapaththuhewage@gmail.com',
            truncate: true,
            bgColor: 'bg-blue-500/20'
        },
        {
            icon: 'Mail',
            label: 'Work Email',
            value: 'tharindu.athapaththu@arimaclanka.com',
            truncate: true,
            bgColor: 'bg-purple-500/20'
        },
        {
            icon: 'Github',
            label: 'GitHub',
            value: 'github.com/Tharindu127',
            truncate: false,
            bgColor: 'bg-purple-500/20'
        }
    ]
};

// Function to upload data to Firestore
async function uploadDataToFirestore() {
    try {
        // Upload social links
        await setDoc(doc(db, "contactInfo", "socialLinks"), socialLinksData);
        console.log("Social links uploaded successfully!");

        // Upload contact info items
        await setDoc(doc(db, "contactInfo", "contactItems"), contactItemsData);
        console.log("Contact info items uploaded successfully!");

        console.log("All data uploaded to Firestore!");
    } catch (error) {
        console.error("Error uploading data to Firestore:", error);
    }
}

// Execute the upload function
uploadDataToFirestore();