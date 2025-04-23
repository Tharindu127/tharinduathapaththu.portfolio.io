import React, { useState, useRef, useEffect } from 'react';
import { Download, MailPlus } from 'lucide-react';
import Button from '../ui/Button';
import TechBadge from '../ui/TechBadge'; // Using our enhanced TechBadge component
import ImageCarousel from '../ui/ImageCarousel';

const AboutSection: React.FC = () => {
    // Sample profile images for the carousel
    const profileImages = [
        "https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/FullSizeRender.jpg",
        "https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/pro2.JPG"
    ];

    // Technologies with skill levels
    const technologies = [
        { name: 'Swift', level: 30 },
        { name: 'Flutter', level: 90 },
        { name: 'Firebase', level: 70 },
        { name: 'Dart', level: 95 },
        { name: 'Java', level: 80 },
        { name: 'Python', level: 50 },
        { name: 'HTML', level: 70 },
        { name: 'CSS', level: 70 },
        { name: 'PHP', level: 65 },
        { name: 'Native Android', level: 85 },
        { name: 'Android Studio', level: 95 },
        { name: 'Xcode', level: 60 },
        { name: 'Visual Studio Code', level: 75 },
        { name: 'PyCharm', level: 30 },
        { name: 'IntelliJ', level: 95 },
        { name: 'MS Office', level: 95 },
        { name: 'JIRA', level: 90 },
        { name: 'GitLab', level: 90 },
        { name: 'Postman', level: 80 },
        { name: 'Figma', level: 95 },
        { name: 'Adobe XD', level: 95 },
        { name: 'CleverTap', level: 65 },
        { name: 'Windows', level: 95 },
        { name: 'macOS', level: 95 },
        { name: 'iOS', level: 95 },
        { name: 'Android', level: 95 },
        { name: 'Web', level: 80 },
        { name: 'HarmonyOS', level: 75 },
        { name: 'Google Play Console', level: 85 },
        { name: 'MS App Center', level: 90 },
        { name: 'Apple Connect', level: 80 },
        { name: 'Huawei AGC', level: 75 },
        { name: 'Google Cloud', level: 50 },
        { name: 'Huawei Cloud', level: 65 },
        { name: 'Next.js', level: 70 },
        { name: 'React', level: 70 },
        { name: 'TypeScript', level: 70 },
        { name: 'Tailwind CSS', level: 60 },
        { name: 'Lucide', level: 60 },
        { name: 'React Hooks', level: 60 }
    ];

    // State for category filtering
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Mapping technologies to categories
    const categoryMap: Record<string, string[]> = {
        'Languages': ['Swift', 'Dart', 'Java', 'Python', 'HTML', 'CSS', 'PHP', 'TypeScript'],
        'Frameworks': ['Flutter', 'React', 'Next.js', 'Tailwind CSS', 'React Hooks'],
        'Design': ['Figma', 'Adobe XD'],
        'Tools': ['Android Studio', 'Xcode', 'Visual Studio Code', 'PyCharm', 'IntelliJ', 'MS Office', 'JIRA', 'GitLab', 'Postman', 'CleverTap', 'Google Play Console', 'MS App Center', 'Apple Connect', 'Huawei AGC'],
        'Platforms': ['Firebase', 'Native Android', 'Windows', 'macOS', 'iOS', 'Android', 'Web', 'HarmonyOS', 'Google Cloud', 'Huawei Cloud', 'Lucide']
    };

    // Technology categories
    const categories = [
        'All',
        'Languages',
        'Frameworks',
        'Design',
        'Tools',
        'Platforms'
    ];

    // Filter technologies based on active category
    const filteredTechnologies = activeCategory === 'All'
        ? technologies
        : technologies.filter(tech => categoryMap[activeCategory]?.includes(tech.name));

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
                            <ImageCarousel images={profileImages} autoplaySpeed={6000} />

                            {/* Blurred light animations - adjusted positioning to avoid overflow */}
                            <div className="absolute top-0 left-0 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"
                                style={{ animationDelay: '1s' }}></div>

                            <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                                <div className="flex gap-4">
                                    <a
                                        href="/FullSizeRender.jpg"
                                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all"
                                        download
                                        aria-label="Download profile picture"
                                    >
                                        <Download size={24} />
                                    </a>
                                    <a
                                        href="mailto:tharinduathapaththuhewage@gmail.com"
                                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all"
                                        aria-label="Send email"
                                    >
                                        <MailPlus size={24} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="animate-slideUp relative" style={{ animationDelay: '0.2s' }}>
                        {/* Blurred light animations - adjusted positioning */}
                        <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/15 rounded-full blur-xl animate-pulse"
                            style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-purple-500/15 rounded-full blur-xl animate-pulse"
                            style={{ animationDelay: '1.5s' }}></div>

                        <div className="relative">
                            <h2 className="text-3xl font-bold mb-2">About Me</h2>
                            <div className="w-16 h-1 bg-blue-500 mb-6"></div>
                            <p className="text-gray-300 mb-6">
                                I&apos;m a mobile software engineer crafting innovative apps for iOS and Android. With skills in multiple languages and frameworks, I deliver efficient, engaging mobile experiences.
                            </p>
                            <p className="text-gray-300 mb-6">
                                I combine technical skill with creative problem-solving to transform challenges into elegant solutions, focusing on AR/VR, AI integration, and intuitive interfaces.
                            </p>

                            <div className="flex flex-wrap gap-4 mt-6">
                                <Button
                                    onClick={() => window.open('https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/files/cv_tharindu_athapaththu.pdf', '_blank')}
                                    className="px-6 py-3"
                                    variant="primary"
                                >
                                    Download CV
                                    <Download size={18} />
                                </Button>

                                <Button
                                    onClick={() => window.open('https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/files/resume_tharindu_athapaththu.pdf', '_blank')}
                                    className="px-6 py-3"
                                    variant="primary"
                                >
                                    Download Resume
                                    <Download size={18} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technology section with smooth height animation */}
                <div className="animate-fadeIn relative" style={{ animationDelay: '0.3s' }}>
                    {/* Decorative elements - adjusted positioning */}
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
                                <div className="flex flex-wrap gap-3">
                                    {filteredTechnologies.map((tech) => (
                                        <TechBadge
                                            key={tech.name}
                                            tech={tech.name}
                                            skillLevel={tech.level}
                                            size="md"
                                        />
                                    ))}
                                </div>

                                {/* Brief description */}
                                <p className="text-gray-400 text-sm mt-6 max-w-4xl">
                                    My technical journey spans mobile app development, web technologies, cloud platforms, and design tools.
                                    I&apos;m passionate about building with cutting-edge technologies and continuously expanding my expertise.
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