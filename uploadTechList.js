// uploadTechList.js
// Simple script to upload technologies as a list
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

// Technology list - array format just like your contribution data
const techList = [
    {
        name: 'Swift',
        level: 30,
        category: 'Languages',
        icon: 'code',
        color: '#F05138'
    },
    {
        name: 'Dart',
        level: 95,
        category: 'Languages',
        icon: 'chevronUp',
        color: '#0175C2'
    },
    {
        name: 'Java',
        level: 80,
        category: 'Languages',
        icon: 'coffee',
        color: '#EA2D2E'
    },
    {
        name: 'Python',
        level: 50,
        category: 'Languages',
        icon: 'fileCode',
        color: '#3776AB'
    },
    {
        name: 'TypeScript',
        level: 70,
        category: 'Languages',
        icon: 'fileCode',
        color: '#3178C6'
    },
    {
        name: 'HTML',
        level: 70,
        category: 'Languages',
        icon: 'code',
        color: '#E34F26'
    },
    {
        name: 'CSS',
        level: 70,
        category: 'Languages',
        icon: 'brush',
        color: '#1572B6'
    },
    {
        name: 'PHP',
        level: 65,
        category: 'Languages',
        icon: 'server',
        color: '#777BB4'
    },
    {
        name: 'Flutter',
        level: 90,
        category: 'Frameworks',
        icon: 'box',
        color: '#54C5F8'
    },
    {
        name: 'React',
        level: 70,
        category: 'Frameworks',
        icon: 'globe',
        color: '#61DAFB'
    },
    {
        name: 'React Hooks',
        level: 60,
        category: 'Frameworks',
        icon: 'link',
        color: '#61DAFB'
    },
    {
        name: 'Next.js',
        level: 70,
        category: 'Frameworks',
        icon: 'layout',
        color: '#000000'
    },
    {
        name: 'Tailwind CSS',
        level: 60,
        category: 'Frameworks',
        icon: 'brush',
        color: '#06B6D4'
    },
    {
        name: 'Lucide',
        level: 60,
        category: 'Frameworks',
        icon: 'penTool',
        color: '#7928CA'
    },
    {
        name: 'Figma',
        level: 95,
        category: 'Design',
        icon: 'figma',
        color: '#F24E1E'
    },
    {
        name: 'Adobe XD',
        level: 95,
        category: 'Design',
        icon: 'penTool',
        color: '#FF61F6'
    },
    {
        name: 'Android Studio',
        level: 95,
        category: 'Tools',
        icon: 'smartphone',
        color: '#3DDC84'
    },
    {
        name: 'Xcode',
        level: 60,
        category: 'Tools',
        icon: 'aperture',
        color: '#147EFB'
    },
    {
        name: 'Visual Studio Code',
        level: 75,
        category: 'Tools',
        icon: 'code',
        color: '#007ACC'
    },
    {
        name: 'PyCharm',
        level: 30,
        category: 'Tools',
        icon: 'fileCode',
        color: '#21D789'
    },
    {
        name: 'IntelliJ',
        level: 95,
        category: 'Tools',
        icon: 'fileCode',
        color: '#FE315D'
    },
    {
        name: 'MS Office',
        level: 95,
        category: 'Tools',
        icon: 'fileText',
        color: '#D83B01'
    },
    {
        name: 'JIRA',
        level: 90,
        category: 'Tools',
        icon: 'layout',
        color: '#0052CC'
    },
    {
        name: 'GitLab',
        level: 90,
        category: 'Tools',
        icon: 'github',
        color: '#FC6D26'
    },
    {
        name: 'Postman',
        level: 80,
        category: 'Tools',
        icon: 'messageSquare',
        color: '#FF6C37'
    },
    {
        name: 'CleverTap',
        level: 65,
        category: 'Tools',
        icon: 'activity',
        color: '#4274F4'
    },
    {
        name: 'Google Play Console',
        level: 85,
        category: 'Tools',
        icon: 'smartphone',
        color: '#3DDC84'
    },
    {
        name: 'MS App Center',
        level: 90,
        category: 'Tools',
        icon: 'monitor',
        color: '#CB2E6D'
    },
    {
        name: 'Apple Connect',
        level: 80,
        category: 'Tools',
        icon: 'smartphone',
        color: '#000000'
    },
    {
        name: 'Huawei AGC',
        level: 75,
        category: 'Tools',
        icon: 'cloud',
        color: '#C41E3A'
    },
    {
        name: 'Firebase',
        level: 70,
        category: 'Platforms',
        icon: 'database',
        color: '#FFCA28'
    },
    {
        name: 'Native Android',
        level: 85,
        category: 'Platforms',
        icon: 'smartphone',
        color: '#3DDC84'
    },
    {
        name: 'Windows',
        level: 95,
        category: 'Platforms',
        icon: 'monitor',
        color: '#0078D6'
    },
    {
        name: 'macOS',
        level: 95,
        category: 'Platforms',
        icon: 'monitor',
        color: '#000000'
    },
    {
        name: 'iOS',
        level: 95,
        category: 'Platforms',
        icon: 'smartphone',
        color: '#000000'
    },
    {
        name: 'Android',
        level: 95,
        category: 'Platforms',
        icon: 'smartphone',
        color: '#3DDC84'
    },
    {
        name: 'Web',
        level: 80,
        category: 'Platforms',
        icon: 'globe',
        color: '#4285F4'
    },
    {
        name: 'HarmonyOS',
        level: 75,
        category: 'Platforms',
        icon: 'smartphone',
        color: '#0072E4'
    },
    {
        name: 'Google Cloud',
        level: 50,
        category: 'Platforms',
        icon: 'cloud',
        color: '#4285F4'
    },
    {
        name: 'Huawei Cloud',
        level: 65,
        category: 'Platforms',
        icon: 'cloud',
        color: '#C41E3A'
    }
];

// Upload technology list
async function uploadTechList() {
    try {
        console.log("Starting to upload technology list...");

        // Upload as a single document with an array field, just like your contributions data
        await setDoc(doc(db, "technologies", "list"), { items: techList });

        console.log("Technology list uploaded successfully!");
        return true;
    } catch (error) {
        console.error("Error uploading technology list:", error);
        return false;
    }
}

// Execute the upload
uploadTechList().then(() => {
    console.log("Upload process completed.");
}).catch((error) => {
    console.error("Unhandled error in upload process:", error);
});