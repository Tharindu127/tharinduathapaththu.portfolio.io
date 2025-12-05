'use client';

import React, { useState, useEffect, useRef } from 'react';
import { NavItem, Project, Stats, AboutData, Technology, SocialLink, ContactInfo } from './types';
import LoadingScreen from './components/ui/LoadingScreen';
import Navbar from './components/layout/Navbar';
import MobileMenu from './components/layout/MobileMenu';
import Footer from './components/layout/Footer';
import HeroSection from './components/home/HeroSection';
import AboutSection from './components/home/AboutSection';
import ProjectsSection from './components/home/ProjectsSection';
import GitHubSection from './components/home/GitHubSection';
import ContactSection from './components/home/ContactSection';

// Import Firebase functions
import {
    fetchProjects,
    fetchStats,
    fetchAboutData,
    fetchTechnologies,
    fetchTechCategories,
    fetchSocialLinks,
    fetchContactInfo
} from './firebase';

// Define a type for raw data from Firebase without using 'any'
type RawProjectData = {
    id?: string | number;
    title?: string;
    imageUrl?: string;
    subtitle?: string;
    category?: string;
    description?: string;
    fullDescription?: string;
    technologies?: string[];
    images?: string[];
    color?: string;
    urls?: Array<{
        link?: string;
        type?: string;
        isWorking?: boolean;
    }>;
} & Record<string, unknown>; // Type-safe alternative to [key: string]: any

export default function HomePage() {
    const [activeSection, setActiveSection] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [projects, setProjects] = useState<Project[]>([]);
    const [stats, setStats] = useState<Stats>({
        totalProjects: 0,
        totalContributions: 0,
        totalRepositories: 0
    });

    // About section state
    const [aboutData, setAboutData] = useState<AboutData | null>(null);
    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [techCategories, setTechCategories] = useState<string[]>(['All']);

    // Contact section state
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
    const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);

    const [error, setError] = useState<string | null>(null);

    // Content container ref for scrolling
    const contentRef = useRef<HTMLDivElement>(null);

    // Check if data is inconsistent
    useEffect(() => {
        if (aboutData && (!technologies || technologies.length === 0)) {
            console.warn("About data loaded but technologies are empty", { aboutData });
        }
    }, [aboutData, technologies]);

    useEffect(() => {
        // Fetch data from Firebase
        const loadData = async () => {
            try {
                // Start loading animation
                setIsLoading(true);

                console.log("Fetching data from Firebase...");

                // Fetch all data in parallel including social links and contact info
                const [
                    rawProjectsData,
                    statsData,
                    aboutSectionData,
                    techData,
                    categoriesData,
                    socialLinksData,
                    contactInfoData
                ] = await Promise.all([
                    fetchProjects(),
                    fetchStats(),
                    fetchAboutData(),
                    fetchTechnologies(),
                    fetchTechCategories(),
                    fetchSocialLinks(),
                    fetchContactInfo()
                ]);

                console.log("Data fetched successfully", {
                    projects: rawProjectsData?.length || 0,
                    aboutData: !!aboutSectionData,
                    techData: techData?.length || 0,
                    categories: categoriesData?.length || 0,
                    socialLinks: socialLinksData?.length || 0,
                    contactInfo: contactInfoData?.length || 0
                });

                // Set social links state
                if (Array.isArray(socialLinksData) && socialLinksData.length > 0) {
                    setSocialLinks(socialLinksData);
                } else {
                    console.warn("No social links found in Firebase, using defaults");
                }

                // Set contact info state
                if (Array.isArray(contactInfoData) && contactInfoData.length > 0) {
                    setContactInfo(contactInfoData);
                } else {
                    console.warn("No contact info found in Firebase, using defaults");
                }

                // Process project data
                if (Array.isArray(rawProjectsData) && rawProjectsData.length > 0) {
                    const projectsData = rawProjectsData as RawProjectData[];

                    // Process and validate project data with safer checks
                    const processedProjects = projectsData
                        .filter(project => project && typeof project === 'object')
                        .map(project => ({
                            id: project.id || `project-${Math.random().toString(36).substr(2, 9)}`,
                            title: project.title || 'Untitled Project',
                            imageUrl: project.imageUrl || '/placeholder.jpg',
                            subtitle: project.subtitle || '',
                            category: project.category || 'Other',
                            description: project.description || '',
                            fullDescription: project.fullDescription || '',
                            technologies: Array.isArray(project.technologies) ? project.technologies : [],
                            images: Array.isArray(project.images) ? project.images : [],
                            color: project.color || 'bg-blue-500',
                            urls: Array.isArray(project.urls) ? project.urls.map(url => ({
                                link: url.link || '#',
                                type: (url.type as string) || 'website',
                                isWorking: Boolean(url.isWorking)
                            })) : []
                        }));

                    // Sort projects by ID if possible
                    const sortedProjects = processedProjects.sort((a, b) => {
                        const idA = typeof a.id === 'number' ? a.id :
                            (typeof a.id === 'string' && !isNaN(Number(a.id))) ? Number(a.id) : 0;
                        const idB = typeof b.id === 'number' ? b.id :
                            (typeof b.id === 'string' && !isNaN(Number(b.id))) ? Number(b.id) : 0;
                        return idA - idB;
                    });

                    // Set projects state
                    setProjects(sortedProjects as Project[]);
                } else {
                    // Handle empty projects case
                    console.warn("No projects found");
                    setProjects([]);
                }

                // Handle stats data
                if (statsData && typeof statsData === 'object') {
                    const typedStatsData = statsData as Record<string, unknown>;
                    setStats({
                        totalProjects: Number(typedStatsData.totalProjects) || 0,
                        totalContributions: Number(typedStatsData.totalContributions) || 0,
                        totalRepositories: Number(typedStatsData.totalRepositories) || 0
                    });
                }

                // Handle about section data
                if (aboutSectionData && typeof aboutSectionData === 'object') {
                    console.log("About data loaded successfully");
                    setAboutData(aboutSectionData as AboutData);
                } else {
                    console.warn("No about data found");
                }

                // Handle technologies data
                if (Array.isArray(techData)) {
                    console.log(`Loaded ${techData.length} technologies`);
                    setTechnologies(techData as Technology[]);
                } else {
                    console.warn("Technologies data is not an array");
                }

                // Handle categories data
                if (Array.isArray(categoriesData) && categoriesData.length > 0) {
                    console.log(`Loaded ${categoriesData.length} tech categories`);
                    setTechCategories(categoriesData);
                }

                // Set loading to false after a minimum time for the loading animation
                // This ensures a smooth loading experience even if data loads quickly
                setTimeout(() => setIsLoading(false), 1500);
            } catch (err) {
                console.error('Error loading data:', err);
                setError('Failed to load portfolio data. Please try again later.');
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    // Handle navigation click and animate section transition
    const navigateToSection = (sectionId: string) => {
        setActiveSection(sectionId);

        // Close mobile menu if open
        if (menuOpen) {
            setMenuOpen(false);
        }

        // Scroll to top of content area
        if (contentRef.current) {
            contentRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    const navItems: NavItem[] = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'projects', label: 'Projects' },
        { id: 'contact', label: 'Contact' }
    ];

    // Render loading state
    if (isLoading) {
        return <LoadingScreen />;
    }

    // Render error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-center p-8 bg-red-900/20 rounded-lg max-w-md">
                    <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
                    <p className="mb-6">{error}</p>
                    <button
                        className="px-6 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Main render
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white overflow-hidden">
            {/* Navigation */}
            <Navbar
                navItems={navItems}
                activeSection={activeSection}
                setActiveSection={navigateToSection}
            />

            <MobileMenu
                navItems={navItems}
                activeSection={activeSection}
                setActiveSection={navigateToSection}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
            />

            {/* Main content with sections */}
            <div
                ref={contentRef}
                className="flex-grow overflow-y-auto scroll-smooth"
                style={{ scrollbarWidth: 'none' }} // Hide scrollbar for Firefox
            >
                {/* Apply CSS transitions for smooth section transitions */}
                <div className="space-y-0">
                    <div
                        id="home"
                        className={`transition-all duration-700 ease-in-out ${activeSection === 'home'
                            ? 'opacity-100 max-h-screen'
                            : 'opacity-0 max-h-0 overflow-hidden'
                            }`}
                    >
                        <HeroSection
                            onViewWorkClick={() => navigateToSection('projects')}
                            onGetInTouchClick={() => navigateToSection('contact')}
                        />
                    </div>

                    <div
                        id="about"
                        className={`transition-all duration-700 ease-in-out ${activeSection === 'about'
                            ? 'opacity-100 max-h-screen'
                            : 'opacity-0 max-h-0 overflow-hidden'
                            }`}
                    >
                        <AboutSection
                            aboutData={aboutData}
                            technologies={technologies}
                            categories={techCategories}
                        />
                    </div>

                    <div
                        id="projects"
                        className={`transition-all duration-700 ease-in-out ${activeSection === 'projects'
                            ? 'opacity-100 max-h-screen'
                            : 'opacity-0 max-h-0 overflow-hidden'
                            }`}
                    >
                        <ProjectsSection projects={projects} />
                        <GitHubSection stats={stats} />
                    </div>

                    <div
                        id="contact"
                        className={`transition-all duration-700 ease-in-out ${activeSection === 'contact'
                            ? 'opacity-100 max-h-screen'
                            : 'opacity-0 max-h-0 overflow-hidden'
                            }`}
                    >
                        <ContactSection
                            contactInfo={contactInfo}
                            socialLinks={socialLinks}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>

            {/* Footer - Always visible */}
            <Footer />
        </div>
    );
}
