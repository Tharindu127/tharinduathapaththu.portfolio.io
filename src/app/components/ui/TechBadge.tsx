import React, { useState, useRef, useEffect, JSX } from 'react';
import {
    Code, Database, Server, Brush, Monitor, Link, Layout,
    Globe, Github, FileCode, Figma, Cloud, Box, Aperture, PenTool,
    ChevronUp, Smartphone, MessageSquare, LucideProps
} from 'lucide-react';

interface TechBadgeProps {
    tech: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    skillLevel?: number; // Skill level as percentage (0-100)
}

// Define interface for our tech icons
interface TechIconInfo {
    icon: JSX.Element;
    defaultSkill: number;
    gradientColors: string; // Combined gradient classes
}

// Custom icon components
const CustomIcons = {
    Coffee: (props: LucideProps) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.size || 24}
            height={props.size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={props.className}
        >
            <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
            <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
            <line x1="6" x2="6" y1="2" y2="4"></line>
            <line x1="10" x2="10" y1="2" y2="4"></line>
            <line x1="14" x2="14" y1="2" y2="4"></line>
        </svg>
    ),

    FileText: (props: LucideProps) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.size || 24}
            height={props.size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={props.className}
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" x2="8" y1="13" y2="13"></line>
            <line x1="16" x2="8" y1="17" y2="17"></line>
            <line x1="10" x2="8" y1="9" y2="9"></line>
        </svg>
    ),

    Activity: (props: LucideProps) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.size || 24}
            height={props.size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={props.className}
        >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
    )
};

const TechBadge: React.FC<TechBadgeProps> = ({
    tech,
    className = '',
    size = 'md',
    skillLevel
}) => {
    // State for interactions
    const [isHovering, setIsHovering] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const [fillWidth, setFillWidth] = useState(0);
    const [showPercentage, setShowPercentage] = useState(false);

    // Refs
    const badgeRef = useRef<HTMLDivElement>(null);
    const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Size mapping
    const sizes = {
        sm: { classes: 'px-3 py-1 text-xs gap-1', iconSize: 12 },
        md: { classes: 'px-4 py-1.5 text-sm gap-1.5', iconSize: 16 },
        lg: { classes: 'px-5 py-2 gap-2', iconSize: 20 }
    };

    // Function to create icon component with correct size
    const createIcon = (IconComponent: React.ComponentType<LucideProps> | ((props: LucideProps) => JSX.Element)) => {
        return <IconComponent size={sizes[size].iconSize} />;
    };

    // Tech icon mapping - centralized to avoid duplication
    const techData: Record<string, TechIconInfo> = {
        // Programming Languages
        'Swift': {
            icon: createIcon(Code),
            defaultSkill: 30,
            gradientColors: 'from-orange-400 to-orange-600'
        },
        'Dart': {
            icon: createIcon(ChevronUp),
            defaultSkill: 80,
            gradientColors: 'from-blue-400 to-blue-600'
        },
        'Java': {
            icon: createIcon(CustomIcons.Coffee),
            defaultSkill: 75,
            gradientColors: 'from-red-500 to-red-700'
        },
        'Python': {
            icon: createIcon(FileCode),
            defaultSkill: 70,
            gradientColors: 'from-blue-500 to-blue-700'
        },
        'TypeScript': {
            icon: createIcon(FileCode),
            defaultSkill: 80,
            gradientColors: 'from-blue-500 to-blue-700'
        },

        // Frontend
        'HTML': {
            icon: createIcon(Code),
            defaultSkill: 95,
            gradientColors: 'from-orange-500 to-orange-700'
        },
        'CSS': {
            icon: createIcon(Brush),
            defaultSkill: 90,
            gradientColors: 'from-blue-400 to-blue-600'
        },
        'React': {
            icon: createIcon(Globe),
            defaultSkill: 85,
            gradientColors: 'from-blue-400 to-blue-600'
        },
        'React Hooks': {
            icon: createIcon(Link),
            defaultSkill: 85,
            gradientColors: 'from-blue-400 to-blue-600'
        },
        'Tailwind CSS': {
            icon: createIcon(Brush),
            defaultSkill: 90,
            gradientColors: 'from-blue-300 to-blue-500'
        },
        'Next.js': {
            icon: createIcon(Layout),
            defaultSkill: 80,
            gradientColors: 'from-gray-800 to-black'
        },

        // Backend
        'PHP': {
            icon: createIcon(Server),
            defaultSkill: 65,
            gradientColors: 'from-purple-500 to-purple-700'
        },
        'Firebase': {
            icon: createIcon(Database),
            defaultSkill: 90,
            gradientColors: 'from-yellow-400 to-yellow-600'
        },

        // Mobile
        'Flutter': {
            icon: createIcon(Box),
            defaultSkill: 80,
            gradientColors: 'from-blue-300 to-blue-500'
        },
        'iOS': {
            icon: createIcon(Smartphone),
            defaultSkill: 85,
            gradientColors: 'from-gray-400 to-gray-600'
        },
        'Android': {
            icon: createIcon(Smartphone),
            defaultSkill: 90,
            gradientColors: 'from-green-400 to-green-600'
        },
        'Native Android': {
            icon: createIcon(Smartphone),
            defaultSkill: 85,
            gradientColors: 'from-green-400 to-green-600'
        },
        'HarmonyOS': {
            icon: createIcon(Smartphone),
            defaultSkill: 65,
            gradientColors: 'from-orange-400 to-orange-600'
        },

        // Tools & IDEs
        'Android Studio': {
            icon: createIcon(Smartphone),
            defaultSkill: 90,
            gradientColors: 'from-green-500 to-green-700'
        },
        'Xcode': {
            icon: createIcon(Aperture),
            defaultSkill: 85,
            gradientColors: 'from-blue-400 to-blue-600'
        },
        'Visual Studio Code': {
            icon: createIcon(Code),
            defaultSkill: 95,
            gradientColors: 'from-blue-500 to-blue-700'
        },
        'PyCharm': {
            icon: createIcon(FileCode),
            defaultSkill: 75,
            gradientColors: 'from-yellow-500 to-yellow-700'
        },
        'IntelliJ': {
            icon: createIcon(FileCode),
            defaultSkill: 80,
            gradientColors: 'from-purple-400 to-purple-600'
        },
        'JIRA': {
            icon: createIcon(Layout),
            defaultSkill: 80,
            gradientColors: 'from-blue-400 to-blue-600'
        },
        'GitLab': {
            icon: createIcon(Github),
            defaultSkill: 85,
            gradientColors: 'from-orange-500 to-orange-700'
        },
        'Postman': {
            icon: createIcon(MessageSquare),
            defaultSkill: 80,
            gradientColors: 'from-orange-400 to-orange-600'
        },
        'Figma': {
            icon: createIcon(Figma),
            defaultSkill: 75,
            gradientColors: 'from-purple-400 to-purple-600'
        },
        'Adobe XD': {
            icon: createIcon(PenTool),
            defaultSkill: 70,
            gradientColors: 'from-pink-500 to-pink-700'
        },
        'CleverTap': {
            icon: createIcon(CustomIcons.Activity),
            defaultSkill: 75,
            gradientColors: 'from-blue-400 to-blue-600'
        },

        // Platforms & Services
        'Windows': {
            icon: createIcon(Monitor),
            defaultSkill: 90,
            gradientColors: 'from-blue-400 to-blue-600'
        },
        'macOS': {
            icon: createIcon(Monitor),
            defaultSkill: 85,
            gradientColors: 'from-gray-400 to-gray-600'
        },
        'Web': {
            icon: createIcon(Globe),
            defaultSkill: 80,
            gradientColors: 'from-blue-400 to-blue-600'
        },
        'Google Play Console': {
            icon: createIcon(Smartphone),
            defaultSkill: 85,
            gradientColors: 'from-green-400 to-green-600'
        },
        'MS App Center': {
            icon: createIcon(Monitor),
            defaultSkill: 70,
            gradientColors: 'from-blue-400 to-blue-600'
        },
        'Apple Connect': {
            icon: createIcon(Smartphone),
            defaultSkill: 80,
            gradientColors: 'from-gray-400 to-gray-600'
        },
        'Huawei AGC': {
            icon: createIcon(Cloud),
            defaultSkill: 65,
            gradientColors: 'from-red-400 to-red-600'
        },
        'Google Cloud': {
            icon: createIcon(Cloud),
            defaultSkill: 75,
            gradientColors: 'from-blue-300 to-blue-500'
        },
        'Huawei Cloud': {
            icon: createIcon(Cloud),
            defaultSkill: 65,
            gradientColors: 'from-red-300 to-red-500'
        },

        // Office
        'MS Office': {
            icon: createIcon(CustomIcons.FileText),
            defaultSkill: 85,
            gradientColors: 'from-red-400 to-red-600'
        },
        'Lucide': {
            icon: createIcon(PenTool),
            defaultSkill: 75,
            gradientColors: 'from-blue-400 to-blue-600'
        }
    };

    // Get the tech info or use default
    const techInfo = techData[tech] || {
        icon: createIcon(Code),
        defaultSkill: 70,
        gradientColors: 'from-gray-400 to-gray-600'
    };

    const finalSkillLevel = skillLevel !== undefined ? skillLevel : techInfo.defaultSkill;
    const isActive = isHovering || isTouched;

    // State to track active state with delay
    const [isActiveWithDelay, setIsActiveWithDelay] = useState(false);

    // Handle natural active state changes (hover/touch)
    useEffect(() => {
        // Clear any existing timeouts
        if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
            animationTimeoutRef.current = null;
        }

        if (isActive) {
            // Immediately set active with delay state
            setIsActiveWithDelay(true);
        } else {
            // When hover/touch ends, delay the state change
            animationTimeoutRef.current = setTimeout(() => {
                setIsActiveWithDelay(false);
            }, 3000); // Keep active state for 3 seconds after hover/touch ends
        }

        return () => {
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
        };
    }, [isActive]);

    // Handle animation when active state changes
    useEffect(() => {
        // Clear any existing animation timeouts
        const animationTimeout = setTimeout(() => {
            if (isActiveWithDelay) {
                // When activating, show the percentage first
                setShowPercentage(true);

                // Then animate the fill after a brief delay
                setTimeout(() => {
                    setFillWidth(finalSkillLevel);
                }, 50);
            } else {
                // When deactivating, hide the fill first
                setFillWidth(0);

                // Then hide the percentage after the animation completes
                setTimeout(() => {
                    setShowPercentage(false);
                }, 300);
            }
        }, 0);

        return () => {
            clearTimeout(animationTimeout);
        };
    }, [isActiveWithDelay, finalSkillLevel]);

    // Handle touch events for mobile
    const handleTouchStart = () => {
        setIsTouched(true);
        if (touchTimeoutRef.current) {
            clearTimeout(touchTimeoutRef.current);
            touchTimeoutRef.current = null;
        }
    };

    const handleTouchEnd = () => {
        // We don't need a timeout here as the 3-second delay is managed in the isActiveWithDelay effect
        setIsTouched(false);
    };

    // Clean up all timeouts on unmount
    useEffect(() => {
        return () => {
            if (touchTimeoutRef.current) {
                clearTimeout(touchTimeoutRef.current);
                touchTimeoutRef.current = null;
            }
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
                animationTimeoutRef.current = null;
            }
        };
    }, []);

    return (
        <div
            ref={badgeRef}
            className={`${sizes[size].classes} rounded-full relative inline-flex items-center justify-center 
                 overflow-hidden ${className} transition-colors duration-300 cursor-pointer
                 bg-white/10 hover:bg-transparent`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
                transform: isActiveWithDelay ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.3s ease-out, background-color 0.3s ease'
            }}
        >
            {/* Fill background based on skill percentage - only visible when hovered/touched */}
            <div
                className={`absolute inset-0 bg-gradient-to-r ${techInfo.gradientColors} 
                           rounded-full`}
                style={{
                    clipPath: `inset(0 ${100 - fillWidth}% 0 0)`,
                    transition: 'clip-path 0.3s ease-out',
                    opacity: isActiveWithDelay ? 0.8 : 0
                }}
            />

            {/* Default background (faded white) */}
            <div
                className="absolute inset-0 bg-white/10 transition-opacity duration-300"
                style={{ opacity: isActiveWithDelay ? 0 : 1 }}
            />

            {/* Icon */}
            <div className="relative z-10 flex-shrink-0">
                {React.cloneElement(techInfo.icon, {
                    className: `transition-all duration-300 ${isActiveWithDelay ? 'text-white' : 'text-gray-300'}`
                })}
            </div>

            {/* Tech name */}
            <span className={`relative z-10 font-medium transition-colors duration-300 ${isActiveWithDelay ? 'text-white' : 'text-gray-300'}`}>
                {tech}
            </span>

            {/* Skill percentage that appears on hover */}
            {showPercentage && (
                <div
                    className="absolute top-0 right-0 text-xs font-bold px-1.5 py-0.5 rounded-bl-md bg-black/30 text-white"
                    style={{
                        opacity: isActiveWithDelay ? 1 : 0,
                        transform: isActiveWithDelay ? 'translateY(0)' : 'translateY(-100%)',
                        transition: 'opacity 0.2s ease, transform 0.3s ease',
                    }}
                >
                    {finalSkillLevel}%
                </div>
            )}
        </div>
    );
};

export default TechBadge;