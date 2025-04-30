import React from 'react';
import { ChevronRight } from 'lucide-react';
import Button from '../ui/Button';

interface HeroSectionProps {
    onViewWorkClick: () => void;
    onGetInTouchClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onViewWorkClick, onGetInTouchClick }) => {
    return (
        <section
            id="home"
            className="h-screen flex items-center justify-center relative overflow-hidden snap-start"
        >
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute w-full h-full object-cover"
                    style={{ filter: 'brightness(0.4)' }}
                >
                    <source src="https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/videos/background4.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 backdrop-blur-xs to-black/60"></div>
            </div>

            {/* Enhanced blurred and floating background elements
            <div className="absolute inset-0 overflow-hidden z-0">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-blue-500/10 backdrop-blur-xl animate-float"
                        style={{
                            width: `${Math.random() * 300 + 100}px`,
                            height: `${Math.random() * 300 + 100}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 30 + 15}s`,
                            animationDelay: `${Math.random() * 10}s`,
                            opacity: Math.random() * 0.4,
                            filter: `blur(${Math.random() * 30 + 10}px)`
                        }}
                    ></div>
                ))}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={`purple-${i}`}
                        className="absolute rounded-full bg-purple-500/10 backdrop-blur-xl animate-float"
                        style={{
                            width: `${Math.random() * 250 + 80}px`,
                            height: `${Math.random() * 250 + 80}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 25 + 20}s`,
                            animationDelay: `${Math.random() * 8}s`,
                            opacity: Math.random() * 0.3,
                            filter: `blur(${Math.random() * 25 + 15}px)`
                        }}
                    ></div>
                ))}
            </div> */}

            <div className="relative z-10 text-center max-w-4xl px-6">
                <div className="inline-block mb-6 p-2 rounded-full bg-white/10 backdrop-blur-md animate-fadeIn">
                    <span className="px-4 py-1 rounded-full text-white font-medium">Software Engineer II - Mobile</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center leading-tight">
                    <span className="block">Creating</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                        Next-Gen Mobile
                    </span>
                    <span className="block">Experiences</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-slideUp" style={{ animationDelay: '0.4s' }}>
                    I&apos;m Tharindu Athapaththu, a mobile app developer building innovative, user-friendly experiences with cutting-edge tech for iOS, Android and Huawei platforms.
                </p>
                <div className="flex flex-wrap justify-center gap-4 animate-slideUp" style={{ animationDelay: '0.6s' }}>
                    <Button
                        onClick={onViewWorkClick}
                        className="px-8 py-3 group"
                        variant="primary"
                    >
                        View My Work
                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                        onClick={onGetInTouchClick}
                        className="px-8 py-3"
                        variant="secondary"
                    >
                        Get In Touch
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;