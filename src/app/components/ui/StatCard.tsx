import React, { useState, useRef } from 'react';

interface StatCardProps {
    value: number;
    label: string;
    className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, className = '' }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);

    // Handle mouse movement to update bubble position
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        // Get card position relative to viewport
        const rect = cardRef.current.getBoundingClientRect();

        // Calculate mouse position relative to the card
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
        setTimeout(() => setOpacity(0.4), 50);
    };

    // Handle mouse leave
    const handleMouseLeave = () => {
        setOpacity(0);
        // Only set hovering to false after the fade out animation
        setTimeout(() => setIsHovering(false), 300);
    };

    return (
        <div
            ref={cardRef}
            className={`bg-gray-700/50 rounded-lg p-4 flex flex-col items-center relative overflow-hidden hover:bg-gray-700/60 transition-colors ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            {/* Blurred bubble that follows mouse */}
            {isHovering && (
                <div
                    className="absolute pointer-events-none blur-[40px] bg-blue-400/50 rounded-full z-0 transition-all duration-300"
                    style={{
                        width: 80,
                        height: 80,
                        transform: `translate(${mousePosition.x - 40}px, ${mousePosition.y - 40}px)`,
                        opacity: opacity,
                    }}
                />
            )}

            <div className="text-2xl font-bold text-white mb-1 relative z-10">{value}</div>
            <div className="text-xs text-gray-400 relative z-10">{label}</div>
        </div>
    );
};

export default StatCard;