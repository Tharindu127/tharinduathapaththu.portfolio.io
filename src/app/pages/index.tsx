'use client';

import React, { useState, useEffect } from 'react';
import { NavItem, Project, Stats } from '../types';
import LoadingScreen from '../components/ui/LoadingScreen';
import Navbar from '../components/layout/Navbar';
import MobileMenu from '../components/layout/MobileMenu';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import ProjectsSection from '../components/home/ProjectsSection';
import GitHubSection from '../components/home/GitHubSection';
import ContactSection from '../components/home/ContactSection';

// Import Firebase functions
import { fetchProjects, fetchStats } from '../firebase';

export default function Home() {
    const [activeSection, setActiveSection] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [projects, setProjects] = useState<Project[]>([]);

    // Initialize stats with default values to avoid null
    const [stats, setStats] = useState<Stats>({
        totalProjects: 0,
        totalContributions: 0,
        totalRepositories: 0
    });

    const [error, setError] = useState<string | null>(null);

    // Add this interface to your types/index.ts file
    interface RawProjectData {
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
        [key: string]: string | number | boolean | object | undefined | null | Array<unknown>;
    }

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
                                    type: url.type || 'website',
                                    isWorking: Boolean(url.isWorking)
                                })) : []
                            };
                        });

                    // Sort projects by ID
                    const sortedProjects = processedProjects.sort((a, b) =>
                        Number(a.id) - Number(b.id)
                    );

                    // Explicitly cast to Project[] after we've ensured all required properties exist
                    setProjects(sortedProjects as Project[]);
                } else {
                    // Handle empty projects case
                    setProjects([]);
                }

                // Handle stats data
                if (statsData && typeof statsData === 'object') {
                    setStats({
                        totalProjects: Number(statsData.totalProjects) || 0,
                        totalContributions: Number(statsData.totalContributions) || 0,
                        totalRepositories: Number(statsData.totalRepositories) || 0
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

    // Scroll to section when activeSection changes from navigation click
    useEffect(() => {
        if (!isLoading) {
            const element = document.getElementById(activeSection);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [activeSection, isLoading]);

    // Add a scroll listener to update activeSection based on scroll position
    useEffect(() => {
        if (isLoading) return;

        const handleScroll = () => {
            // Get all section elements
            const sections = ['home', 'about', 'projects', 'contact'];

            // Find which section is currently in view
            let currentSection = activeSection;

            // Calculate which section is most visible in the viewport
            let maxVisiblePercentage = 0;

            sections.forEach(sectionId => {
                const element = document.getElementById(sectionId);
                if (!element) return;

                const rect = element.getBoundingClientRect();
                const viewportHeight = window.innerHeight;

                // Calculate how much of the section is visible in the viewport
                const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
                const sectionHeight = rect.height;

                // Calculate percentage of section that's visible
                const visiblePercentage = sectionHeight > 0 ? (visibleHeight / sectionHeight) * 100 : 0;

                // If this section has more visible area than the current max, update current section
                if (visiblePercentage > maxVisiblePercentage && visiblePercentage > 10) {
                    maxVisiblePercentage = visiblePercentage;
                    currentSection = sectionId;
                }
            });

            // Update active section state if it's different
            if (currentSection !== activeSection) {
                setActiveSection(currentSection);
            }
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initial check on mount
        handleScroll();

        // Clean up listener on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isLoading, activeSection]);

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
        <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
            {/* Navigation */}
            <Navbar
                navItems={navItems}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />

            <MobileMenu
                navItems={navItems}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
            />

            {/* Main content - Using scroll-snap for smooth section transitions */}
            <div className="snap-y snap-mandatory h-screen overflow-y-auto overflow-x-hidden">
                <HeroSection
                    onViewWorkClick={() => setActiveSection('projects')}
                    onGetInTouchClick={() => setActiveSection('contact')}
                />

                <AboutSection />

                <ProjectsSection projects={projects} />

                <GitHubSection stats={stats} />

                <ContactSection />

                <Footer />
            </div>
        </div>
    );
}