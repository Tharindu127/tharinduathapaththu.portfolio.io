import React, { useState, useRef, useEffect } from 'react';
import { Download, MailPlus, Loader2 } from 'lucide-react';
import Button from '../ui/Button';
import TechBadge from '../ui/TechBadge';
import ImageCarousel from '../ui/ImageCarousel';

// Define the prop types to match the parent component's state
interface AboutSectionProps {
    aboutData: {
        profileImages?: Array<{
            url: string;
            alt: string;
        }>;
        paragraphs?: string[];
        documents?: {
            cv: string;
            resume: string;
        };
        emailAddress?: string;
        description?: string;
    } | null;
    technologies: Array<{
        id?: string;
        name: string;
        level: number;
        category: string;
        icon?: string;
        color?: string;
    }>;
    categories: string[];
}

const AboutSection: React.FC<AboutSectionProps> = ({ aboutData, technologies, categories }) => {
    // Add debug logging to check the technologies
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            console.log("AboutSection technologies:", technologies.slice(0, 3));
        }
    }, [technologies]);

    // State for category filtering
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Extract data from props with default values for safety
    const profileImages = aboutData?.profileImages?.map(img => img.url) || [];
    const imageAlts = aboutData?.profileImages?.map(img => img.alt) || [];
    const paragraphs = aboutData?.paragraphs || [];
    const documents = aboutData?.documents || { cv: '', resume: '' };
    const emailAddress = aboutData?.emailAddress || '';
    const description = aboutData?.description || '';

    // Filter technologies based on active category
    const filteredTechnologies = activeCategory === 'All'
        ? technologies
        : technologies.filter(tech => tech.category === activeCategory);

    // Set initial container height on first render
    useEffect(() => {
        if (contentRef.current) {
            setContainerHeight(contentRef.current.scrollHeight);
        }
    }, []);

    // Update container height when filtered technologies change
    useEffect(() => {
        // Small delay to ensure content has rendered
        const timer = setTimeout(() => {
            if (contentRef.current) {
                setContainerHeight(contentRef.current.scrollHeight);
            }
        }, 50);

        return () => clearTimeout(timer);
    }, [filteredTechnologies]);

    // Handle category change
    const handleCategoryChange = (category: string) => {
        // Only update if different category selected
        if (category !== activeCategory) {
            setActiveCategory(category);
        }
    };

    // Show loading placeholder if data isn't available yet
    if (!aboutData) {
        return (
            <section id="about" className="min-h-screen flex flex-col justify-center items-center py-16 pt-30 snap-start">
                <Loader2 size={48} className="animate-spin text-blue-500" />
                <p className="mt-4 text-gray-300">Loading profile data...</p>
            </section>
        );
    }

    return (
        <section id="about" className="min-h-screen flex flex-col justify-center py-16 pt-30 snap-start relative overflow-hidden">
            {/* Background bubbles */}
            <div className="absolute left-1/4 top-1/4 w-36 h-36 bg-green-500/10 rounded-full blur-xl animate-pulse"
                style={{ animationDelay: '2.2s', animationDuration: '6s' }}></div>
            <div className="absolute right-1/3 top-3/4 w-28 h-28 bg-yellow-500/10 rounded-full blur-xl animate-pulse"
                style={{ animationDelay: '1.7s', animationDuration: '7s' }}></div>
            <div className="absolute left-2/3 top-1/3 w-24 h-24 bg-pink-500/10 rounded-full blur-xl animate-pulse"
                style={{ animationDelay: '0.8s', animationDuration: '8s' }}></div>

            <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
                {/* Profile and About section */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    <div className="animate-fadeIn">
                        <div className="relative">
                            {/* Carousel */}
                            {profileImages.length > 0 && (
                                <ImageCarousel
                                    images={profileImages}
                                    alts={imageAlts}
                                    autoplaySpeed={6000}
                                />
                            )}

                            {/* Blurred light animations */}
                            <div className="absolute top-0 left-0 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"
                                style={{ animationDelay: '1s' }}></div>

                            <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                                <div className="flex gap-4">
                                    {emailAddress && (
                                        <a
                                            href={`mailto:${emailAddress}`}
                                            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all"
                                            aria-label="Send email"
                                        >
                                            <MailPlus size={24} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="animate-slideUp relative" style={{ animationDelay: '0.2s' }}>
                        {/* Blurred light animations */}
                        <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/15 rounded-full blur-xl animate-pulse"
                            style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-purple-500/15 rounded-full blur-xl animate-pulse"
                            style={{ animationDelay: '1.5s' }}></div>

                        <div className="relative">
                            <h2 className="text-3xl font-bold mb-2">About Me</h2>
                            <div className="w-16 h-1 bg-blue-500 mb-6"></div>

                            {/* Paragraphs from Firebase */}
                            {paragraphs.map((paragraph, index) => (
                                <p key={index} className="text-gray-300 mb-6">
                                    {paragraph}
                                </p>
                            ))}

                            <div className="flex flex-wrap gap-4 mt-6">
                                {documents.cv && (
                                    <Button
                                        onClick={() => window.open(documents.cv, '_blank')}
                                        className="px-6 py-3"
                                        variant="primary"
                                    >
                                        Download CV
                                        <Download size={18} strokeWidth={2.5} />
                                    </Button>
                                )}

                                {documents.resume && (
                                    <Button
                                        onClick={() => window.open(documents.resume, '_blank')}
                                        className="px-6 py-3"
                                        variant="primary"
                                    >
                                        Download Resume
                                        <Download size={18} strokeWidth={2.5} />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technology section with smooth height animation */}
                <div className="animate-fadeIn relative" style={{ animationDelay: '0.3s' }}>
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-1/4 w-24 h-24 bg-indigo-500/15 rounded-full blur-xl animate-pulse"
                        style={{ animationDelay: '1.2s' }}></div>
                    <div className="absolute bottom-0 right-1/3 w-32 h-32 bg-teal-500/15 rounded-full blur-xl animate-pulse"
                        style={{ animationDelay: '0.7s' }}></div>

                    <div
                        ref={containerRef}
                        className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-500"
                    >
                        <h3 className="text-2xl font-bold mb-2">Technical Expertise</h3>
                        <div className="w-16 h-1 bg-blue-500 mb-6"></div>

                        {/* Category filter tabs */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryChange(category)}
                                    className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${activeCategory === category
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white/10 text-gray-300 hover:bg-white/15'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Container with animated height */}
                        <div
                            className="overflow-hidden transition-all duration-500 ease-in-out"
                            style={{ height: containerHeight !== undefined ? `${containerHeight}px` : 'auto' }}
                        >
                            {/* Content wrapper with ref for measuring */}
                            <div ref={contentRef}>
                                {/* Technology badges */}
                                {technologies.length > 0 ? (
                                    <div className="flex flex-wrap gap-3 p-2">
                                        {filteredTechnologies.map((tech) => (
                                            <TechBadge
                                                key={tech.id || tech.name}
                                                tech={tech.name}
                                                skillLevel={tech.level}
                                                color={tech.color}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex justify-center items-center p-8">
                                        <p className="text-gray-400">Loading technologies...</p>
                                    </div>
                                )}

                                {/* Brief description */}
                                <p className="text-gray-400 text-sm mt-6 max-w-4xl">
                                    {description || "My technical journey spans mobile app development, web technologies, cloud platforms, and design tools. I'm passionate about building with cutting-edge technologies and continuously expanding my expertise."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;