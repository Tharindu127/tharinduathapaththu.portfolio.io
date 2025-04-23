import React, { useState, useRef } from 'react';

interface TechBadgeProps {
    tech: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const TechBadge: React.FC<TechBadgeProps> = ({
    tech,
    className = '',
    size = 'md'
}) => {
    const [isHovering, setIsHovering] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const badgeRef = useRef<HTMLSpanElement>(null);

    const sizeClasses = {
        sm: 'px-3 py-1 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-2'
    };

    // Size bubble based on badge size
    const bubbleSizes = {
        sm: 40,
        md: 60,
        lg: 80
    };

    const bubbleSize = bubbleSizes[size];

    // Handle mouse movement to update bubble position
    const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
        if (!badgeRef.current) return;

        // Get badge position relative to viewport
        const rect = badgeRef.current.getBoundingClientRect();

        // Calculate mouse position relative to the badge
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    // Handle mouse enter with smooth fade in
    const handleMouseEnter = () => {
        setIsHovering(true);
        // Start with 0 opacity and gradually increase it
        setOpacity(0);
        setTimeout(() => setOpacity(0.5), 50);
    };

    // Handle mouse leave
    const handleMouseLeave = () => {
        setOpacity(0);
        // Only set hovering to false after the fade out animation
        setTimeout(() => setIsHovering(false), 300);
    };

    return (
        <span
            ref={badgeRef}
            className={`${sizeClasses[size]} rounded-full bg-white/10 relative inline-flex items-center justify-center overflow-hidden ${className} transition-all duration-300 hover:bg-white/15`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            {/* Blurred bubble that follows mouse */}
            {isHovering && (
                <div
                    className="absolute pointer-events-none blur-[25px] bg-blue-400/40 rounded-full z-0 transition-all duration-300"
                    style={{
                        width: bubbleSize,
                        height: bubbleSize,
                        transform: `translate(${mousePosition.x - bubbleSize / 4}px, ${mousePosition.y - bubbleSize / 4}px)`,
                        opacity: opacity,
                    }}
                />
            )}

            <span className="relative z-10">{tech}</span>
        </span>
    );
};

export default TechBadge;