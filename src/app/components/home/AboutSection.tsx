import React from 'react';
import { Download, MailPlus } from 'lucide-react';
import Button from '../ui/Button';
import TechBadge from '../ui/TechBadge';
import ImageCarousel from '../ui/ImageCarousel'; // Import our new ImageCarousel component

const AboutSection: React.FC = () => {
    // Sample profile images for the carousel
    const profileImages = [
        "https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/FullSizeRender.jpg",
        "https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/pro2.JPG"
    ];

    const technologies = [
        'Swift', 'Flutter', 'Firebase', 'Dart', 'Java', 'Python',
        'HTML', 'CSS', 'PHP', 'Native Android', 'Android Studio',
        'Xcode', 'Visual Studio Code', 'PyCharm', 'IntelliJ',
        'MS Office', 'JIRA', 'GitLab', 'Postman', 'Figma',
        'Adobe XD', 'CleverTap', 'Windows', 'macOS', 'iOS',
        'Android', 'Web', 'HarmonyOS', 'Google Play Console',
        'MS App Center', 'Apple Connect', 'Huawei AGC',
        'Google Cloud', 'Huawei Cloud', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS',
        'Lucide', 'React Hooks'
    ];

    return (
        <section id="about" className="min-h-screen flex items-center justify-center py-20 snap-start relative overflow-hidden">
            {/* Additional floating bubbles in the section background */}
            <div className="absolute left-1/4 top-1/4 w-36 h-36 bg-green-500/10 rounded-full blur-xl animate-pulse"
                style={{ animationDelay: '2.2s', animationDuration: '6s' }}></div>
            <div className="absolute right-1/3 top-3/4 w-28 h-28 bg-yellow-500/10 rounded-full blur-xl animate-pulse"
                style={{ animationDelay: '1.7s', animationDuration: '7s' }}></div>
            <div className="absolute left-2/3 top-1/3 w-24 h-24 bg-pink-500/10 rounded-full blur-xl animate-pulse"
                style={{ animationDelay: '0.8s', animationDuration: '8s' }}></div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="animate-fadeIn">
                        <div className="relative">
                            {/* Replace static image with carousel */}
                            <ImageCarousel images={profileImages} autoplaySpeed={6000} />

                            {/* Blurred light animations */}
                            <div className="absolute -top-12 -left-12 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"
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
                        {/* Existing blurred light animations */}
                        <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/15 rounded-full blur-xl animate-pulse"
                            style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute bottom-12 left-12 w-20 h-20 bg-purple-500/15 rounded-full blur-xl animate-pulse"
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

                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">Core Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {technologies.map((tech) => (
                                        <TechBadge key={tech} tech={tech} size="md" />
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-6">
                                <Button
                                    onClick={() => window.open('https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/files/cv_tharindu_athapaththu.pdf', '_blank')} //public/files/cv_tharindu_athapaththu.pdf
                                    className="px-6 py-3"
                                    variant="primary"
                                >
                                    Download CV
                                    <Download size={18} />
                                </Button>

                                <Button
                                    onClick={() => window.open('https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/files/resume_tharindu_athapaththu.pdf', '_blank')} //resume_tharindu_athapaththu.pdf
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
            </div>
        </section>
    );
};

export default AboutSection;