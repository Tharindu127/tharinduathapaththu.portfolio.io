// uploadAboutToFirebase.js
// Run this script to upload About section data to Firebase
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

// About section data
const aboutData = {
    profileImages: [
        {
            url: "https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/FullSizeRender.jpg",
            alt: "Professional headshot of Tharindu Athapaththu"
        },
        {
            url: "https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/pro2.JPG",
            alt: "Tharindu Athapaththu working on mobile development"
        }
    ],
    paragraphs: [
        "I'm a mobile software engineer crafting innovative apps for iOS and Android. With skills in multiple languages and frameworks, I deliver efficient, engaging mobile experiences.",
        "I combine technical skill with creative problem-solving to transform challenges into elegant solutions, focusing on AR/VR, AI integration, and intuitive interfaces."
    ],
    documents: {
        cv: "https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/files/cv_tharindu_athapaththu.pdf",
        resume: "https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/files/resume_tharindu_athapaththu.pdf"
    },
    emailAddress: "tharinduathapaththuhewage@gmail.com",
    description: "My technical journey spans mobile app development, web technologies, cloud platforms, and design tools. I'm passionate about building with cutting-edge technologies and continuously expanding my expertise."
};

// Tech categories 
const categoriesData = {
    categories: [
        "All",
        "Languages",
        "Frameworks",
        "Design",
        "Tools",
        "Platforms"
    ]
};

// Just upload a few technologies to test
const technologiesData = {
    swift: {
        name: 'Swift',
        level: 30,
        category: 'Languages',
        icon: 'code',
        color: '#F05138'
    },
    dart: {
        name: 'Dart',
        level: 95,
        category: 'Languages',
        icon: 'chevronUp',
        color: '#0175C2'
    },
    flutter: {
        name: 'Flutter',
        level: 90,
        category: 'Frameworks',
        icon: 'box',
        color: '#54C5F8'
    }
};

// Split the uploads into separate async functions
async function uploadMainAboutData() {
    try {
        // Upload to Firestore
        await setDoc(doc(db, "about", "main"), aboutData);
        console.log("About section main data uploaded successfully!");
        return true;
    } catch (error) {
        console.error("Error uploading about main data:", error);
        return false;
    }
}

async function uploadCategories() {
    try {
        // Upload to Firestore
        await setDoc(doc(db, "categories", "list"), categoriesData);
        console.log("Categories uploaded successfully!");
        return true;
    } catch (error) {
        console.error("Error uploading categories:", error);
        return false;
    }
}

async function uploadTechnologies() {
    try {
        // Upload each technology as a separate document
        for (const [id, tech] of Object.entries(technologiesData)) {
            await setDoc(doc(db, "technologies", id), tech);
            console.log(`Technology "${tech.name}" uploaded successfully!`);
        }
        return true;
    } catch (error) {
        console.error("Error uploading technologies:", error);
        return false;
    }
}

// Execute uploads sequentially
async function uploadAllData() {
    console.log("Starting upload process...");

    const mainResult = await uploadMainAboutData();
    if (mainResult) {
        console.log("Main about data upload completed.");
    } else {
        console.log("Main about data upload failed.");
    }

    const categoriesResult = await uploadCategories();
    if (categoriesResult) {
        console.log("Categories upload completed.");
    } else {
        console.log("Categories upload failed.");
    }

    const techResult = await uploadTechnologies();
    if (techResult) {
        console.log("Technologies upload completed.");
    } else {
        console.log("Technologies upload failed.");
    }

    console.log("All uploads finished.");
}

// Start the upload process
uploadAllData();