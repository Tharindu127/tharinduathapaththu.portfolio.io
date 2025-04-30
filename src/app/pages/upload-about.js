// pages/admin/upload-about.js
'use client';

import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, collection, writeBatch } from "firebase/firestore";

// Your web app's Firebase configuration - same as in your other files
const firebaseConfig = {
    apiKey: "AIzaSyB6l6uyG5iuTcYCYDP8cUOvhKvfaQotr58",
    authDomain: "my-portfolio-and-rest.firebaseapp.com",
    projectId: "my-portfolio-and-rest",
    storageBucket: "my-portfolio-and-rest.firebasestorage.app",
    messagingSenderId: "225744370742",
    appId: "1:225744370742:web:23847554f6a85f14f96c97",
    measurementId: "G-N11P05ZQYT"
};

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

// Tech categories list
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

// Technologies data with complete information for each technology
const technologies = [
    // Languages
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

    // Frameworks
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

    // Design
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

    // Tools
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

    // Platforms
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

export default function UploadAboutPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [logs, setLogs] = useState([]);

    // Function to add a log message
    const addLog = (message) => {
        setLogs(prev => [...prev, message]);
    };

    // Function to upload about data
    const uploadAboutData = async () => {
        setLoading(true);
        setSuccess(false);
        setError('');
        setLogs([]);

        try {
            addLog("Initializing Firebase...");
            // Initialize Firebase
            const app = initializeApp(firebaseConfig);
            const db = getFirestore(app);

            addLog("Firebase initialized successfully.");
            addLog("Starting to upload About section data...");

            // Upload about section main document
            await setDoc(doc(db, "about", "main"), aboutData);
            addLog("✅ Uploaded About section main data");

            // Upload categories
            await setDoc(doc(db, "categories", "list"), categoriesData);
            addLog("✅ Uploaded technology categories");

            // Upload technologies using batch write for better performance
            const batch = writeBatch(db);
            let count = 0;

            for (const tech of technologies) {
                // Use auto-generated IDs for technology documents
                const techRef = doc(collection(db, "technologies"));
                batch.set(techRef, tech);
                count++;
            }

            await batch.commit();
            addLog(`✅ Uploaded ${count} technologies`);

            addLog("🎉 All About section data uploaded successfully!");
            setSuccess(true);
        } catch (error) {
            console.error("Error uploading About section data:", error);
            setError(error.message || "An error occurred while uploading data");
            addLog(`❌ Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Upload About Section Data</h1>

                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">About Data Summary</h2>

                    <div className="space-y-4 mb-6">
                        <div>
                            <h3 className="text-lg font-medium text-blue-400">Profile Images</h3>
                            <p className="text-gray-300">{aboutData.profileImages.length} images</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-blue-400">About Paragraphs</h3>
                            <p className="text-gray-300">{aboutData.paragraphs.length} paragraphs</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-blue-400">Documents</h3>
                            <p className="text-gray-300">CV and Resume links</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-blue-400">Technologies</h3>
                            <p className="text-gray-300">{technologies.length} technologies across {categoriesData.categories.length - 1} categories</p>
                        </div>
                    </div>

                    <button
                        onClick={uploadAboutData}
                        disabled={loading}
                        className={`px-6 py-3 rounded-lg font-medium ${loading
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                            } transition duration-200`}
                    >
                        {loading ? 'Uploading...' : 'Upload Data to Firebase'}
                    </button>
                </div>

                {logs.length > 0 && (
                    <div className={`bg-gray-800 rounded-lg p-6 mb-6 ${success ? 'border-2 border-green-500' : error ? 'border-2 border-red-500' : ''
                        }`}>
                        <h2 className="text-xl font-semibold mb-4">Upload Log</h2>

                        <div className="bg-black rounded p-4 font-mono text-sm h-64 overflow-y-auto">
                            {logs.map((log, index) => (
                                <div key={index} className="mb-1">
                                    {log}
                                </div>
                            ))}
                        </div>

                        {success && (
                            <div className="mt-4 p-3 bg-green-900/50 text-green-300 rounded">
                                Upload completed successfully! Your About section data is now in Firebase.
                            </div>
                        )}

                        {error && (
                            <div className="mt-4 p-3 bg-red-900/50 text-red-300 rounded">
                                <strong>Error:</strong> {error}
                            </div>
                        )}
                    </div>
                )}

                <div className="text-sm text-gray-400">
                    <p>Note: This page will upload your About section data to Firebase, including:</p>
                    <ul className="list-disc pl-6 mt-2">
                        <li>Profile images and paragraphs</li>
                        <li>CV and resume document links</li>
                        <li>Technology categories</li>
                        <li>Technology details (name, level, category, icon, color)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}