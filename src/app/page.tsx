'use client';

import React, { useState, useEffect, useRef } from 'react';
import { NavItem, Project, Stats } from './types';
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
import { fetchProjects, fetchStats } from './firebase';

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
    const [error, setError] = useState<string | null>(null);

    // Content container ref for scrolling
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Fetch data from Firebase
        const loadData = async () => {
            try {
                // Fetch projects and stats in parallel
                const [rawProjectsData, statsData] = await Promise.all([
                    fetchProjects(),
                    fetchStats()
                ]);

                // Type assertion with a more specific type
                const projectsData = (rawProjectsData || []) as RawProjectData[];

                if (Array.isArray(projectsData) && projectsData.length > 0) {
                    // Process and validate project data with safer checks
                    const processedProjects = projectsData
                        .filter(project => project && typeof project === 'object')
                        .map(project => {
                            // Create a new object with all required properties and safe defaults
                            return {
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
                            };
                        });

                    // Sort projects by ID
                    const sortedProjects = processedProjects.sort((a, b) =>
                        Number(a.id) - Number(b.id)
                    );

                    // Set projects state
                    setProjects(sortedProjects as Project[]);
                } else {
                    // Handle empty projects case
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

                // Set loading to false after a minimum time for the loading animation
                setTimeout(() => setIsLoading(false), 1500);
            } catch (err) {
                console.error('Error loading data:', err);
                setError('Failed to load portfolio data');
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    // Handle navigation click and animate section transition
    const navigateToSection = (sectionId: string) => {
        setActiveSection(sectionId);

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

    if (isLoading) {
        return <LoadingScreen />;
    }

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
                        <AboutSection />
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
                        <ContactSection />
                    </div>
                </div>
            </div>

            {/* Footer - Always visible */}
            <Footer />
        </div>
    );
}