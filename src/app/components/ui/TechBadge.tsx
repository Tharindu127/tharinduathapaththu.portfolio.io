import React, { useState, useRef, useEffect, JSX } from 'react';
import {
    Code, Database, Server, Brush, Monitor, Link, Layout,
    Globe, Github, FileCode, Figma, Cloud, Box, Aperture, PenTool,
    ChevronUp, Smartphone, MessageSquare, LucideProps
} from 'lucide-react';

interface TechBadgeProps {
    tech: string;                // Technology name
    className?: string;          // Optional additional classes
    size?: 'sm' | 'md' | 'lg';   // Size variant
    skillLevel?: number;         // Skill level from Firebase
    color?: string;              // Color from Firebase (hex code)
    icon?: string;               // Icon name from Firebase
    category?: string;           // Category from Firebase
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
    skillLevel,
    color,
    icon,
    category
}) => {
    // States for animation
    const [isHovering, setIsHovering] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const [isActiveWithDelay, setIsActiveWithDelay] = useState(false);
    const [fillWidth, setFillWidth] = useState(0);
    const [showPercentage, setShowPercentage] = useState(false);

    // Refs for timeouts
    const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Size variants mapping
    const sizeClasses = {
        sm: 'px-3 py-1 text-xs gap-1',
        md: 'px-4 py-1.5 text-sm gap-1.5',
        lg: 'px-5 py-2 gap-2'
    };

    const iconSizes = {
        sm: 12,
        md: 16,
        lg: 20
    };

    // Create a slightly darker version of a hex color
    const createDarkerColor = (hexColor: string): string => {
        // Remove # if present
        hexColor = hexColor.replace(/^#/, '');

        // Parse the hex components
        let r = parseInt(hexColor.substring(0, 2), 16);
        let g = parseInt(hexColor.substring(2, 4), 16);
        let b = parseInt(hexColor.substring(4, 6), 16);

        // Darken each component by 20%
        r = Math.floor(r * 0.8);
        g = Math.floor(g * 0.8);
        b = Math.floor(b * 0.8);

        // Convert back to hex
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    };

    // Function to get background gradient based on color
    const getGradientStyle = (): React.CSSProperties => {
        if (color && color.startsWith('#')) {
            const darkerColor = createDarkerColor(color);
            return {
                background: `linear-gradient(to right, ${color}, ${darkerColor})`
            };
        }

        // Default blue gradient if no color provided
        return {
            background: 'linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))'
        };
    };

    // Map of icon name to component
    const iconMap: Record<string, React.ComponentType<LucideProps> | ((props: LucideProps) => JSX.Element)> = {
        'code': Code,
        'database': Database,
        'server': Server,
        'brush': Brush,
        'monitor': Monitor,
        'link': Link,
        'layout': Layout,
        'globe': Globe,
        'github': Github,
        'fileCode': FileCode,
        'figma': Figma,
        'cloud': Cloud,
        'box': Box,
        'aperture': Aperture,
        'penTool': PenTool,
        'chevronUp': ChevronUp,
        'smartphone': Smartphone,
        'messageSquare': MessageSquare,
        'coffee': CustomIcons.Coffee,
        'fileText': CustomIcons.FileText,
        'activity': CustomIcons.Activity
    };

    // Get icon component based on icon prop
    const getIconComponent = () => {
        const iconName = icon?.toLowerCase() || '';
        const IconComponent = iconMap[iconName] || Code; // Fallback to Code icon
        return <IconComponent size={iconSizes[size]} />;
    };

    // Get Tailwind gradient classes based on category
    const getGradientClasses = (): string => {
        const categoryMap: Record<string, string> = {
            'Languages': 'from-blue-400 to-blue-600',
            'Frameworks': 'from-green-400 to-green-600',
            'Design': 'from-purple-400 to-purple-600',
            'Tools': 'from-yellow-400 to-yellow-600',
            'Platforms': 'from-red-400 to-red-600'
        };

        return categoryMap[category || ''] || 'from-gray-400 to-gray-600';
    };

    // Check if badge is active
    const isActive = isHovering || isTouched;

    // Get the final skill level
    const finalSkillLevel = skillLevel !== undefined ? skillLevel : 70;

    // Handle hover events
    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    // Handle touch events
    const handleTouchStart = () => {
        setIsTouched(true);
        if (touchTimeoutRef.current) {
            clearTimeout(touchTimeoutRef.current);
        }
    };

    const handleTouchEnd = () => {
        setIsTouched(false);
    };

    // Effect to implement delayed active state
    useEffect(() => {
        if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
        }

        if (isActive) {
            // Activate immediately
            setIsActiveWithDelay(true);
        } else {
            // Keep active for 3 seconds after hover ends
            animationTimeoutRef.current = setTimeout(() => {
                setIsActiveWithDelay(false);
            }, 3000);
        }

        return () => {
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
        };
    }, [isActive]);

    // Effect to handle fill animation
    useEffect(() => {
        if (isActiveWithDelay) {
            // Show percentage immediately
            setShowPercentage(true);

            // Animate fill width after a brief delay
            setTimeout(() => {
                setFillWidth(finalSkillLevel);
            }, 50);
        } else {
            // Hide fill first
            setFillWidth(0);

            // Hide percentage after animation
            setTimeout(() => {
                setShowPercentage(false);
            }, 300);
        }
    }, [isActiveWithDelay, finalSkillLevel]);

    // Clean up on unmount
    useEffect(() => {
        return () => {
            if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
            if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
        };
    }, []);

    // Get skill level description
    const getSkillDescription = (): string => {
        if (finalSkillLevel >= 90) return 'Expert';
        if (finalSkillLevel >= 70) return 'Advanced';
        if (finalSkillLevel >= 40) return 'Intermediate';
        return 'Beginner';
    };

    return (
        <div
            className={`${sizeClasses[size]} rounded-full relative inline-flex items-center justify-center overflow-hidden ${className} cursor-pointer bg-white/10 hover:bg-transparent`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
                transform: isActiveWithDelay ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.3s ease-out, background-color 0.3s ease'
            }}
        >
            {/* Fill background with color from Firebase */}
            <div
                className={`absolute inset-y-0 left-0 rounded-full ${color ? '' : `bg-gradient-to-r ${getGradientClasses()}`}`}
                style={{
                    ...(!color ? {} : getGradientStyle()),
                    width: `${fillWidth}%`,
                    transition: 'width 0.3s ease-out, opacity 0.3s ease',
                    opacity: isActiveWithDelay ? 0.8 : 0
                }}
            />

            {/* Default background */}
            <div
                className="absolute inset-0 bg-white/10 transition-opacity duration-300"
                style={{
                    opacity: isActiveWithDelay ? 0 : 1
                }}
            />

            {/* Icon */}
            <div className="relative z-10 flex-shrink-0">
                {React.cloneElement(getIconComponent(), {
                    className: `transition-all duration-300 ${isActiveWithDelay ? 'text-white' : 'text-gray-300'}`
                })}
            </div>

            {/* Technology name */}
            <span className={`relative z-10 font-medium transition-colors duration-300 ${isActiveWithDelay ? 'text-white' : 'text-gray-300'}`}>
                {tech}
            </span>

            {/* Skill percentage tooltip */}
            {showPercentage && (
                <div
                    className="absolute top-0 right-0 text-xs font-bold px-1.5 py-0.5 rounded-bl-md bg-black/30 text-white z-50"
                    style={{
                        opacity: isActiveWithDelay ? 1 : 0,
                        transform: isActiveWithDelay ? 'translateY(0)' : 'translateY(-100%)',
                        transition: 'opacity 0.2s ease, transform 0.3s ease'
                    }}
                >
                    {finalSkillLevel}%
                </div>
            )}

            {/* Skill level description */}
            {showPercentage && (
                <div
                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs px-2 py-1 rounded bg-black/70 text-white whitespace-nowrap z-50"
                    style={{
                        opacity: isActiveWithDelay ? 1 : 0,
                        transition: 'opacity 0.3s ease'
                    }}
                >
                    {getSkillDescription()}
                </div>
            )}
        </div>
    );
};

export default TechBadge;