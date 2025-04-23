import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
    project: Project;
    onClick: (project: Project) => void;
    index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, index }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

    return (
        <div
            ref={cardRef}
            className="group cursor-pointer bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 animate-fadeInUp relative"
            onClick={() => onClick(project)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
            style={{
                animationDelay: `${index * 200}ms`
            }}
        >
            {/* Blurred bubble that follows mouse */}
            {isHovering && (
                <div
                    className="absolute pointer-events-none blur-[60px] bg-blue-400/30 rounded-full z-0 transition-transform duration-100"
                    style={{
                        width: 150,
                        height: 150,
                        transform: `translate(${mousePosition.x - 75}px, ${mousePosition.y - 75}px)`,
                        opacity: 0.8,
                    }}
                />
            )}

            <div className="h-60 ${project.color} flex items-center justify-center overflow-hidden relative group z-10">
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                        className="transition-transform duration-500 ease-in-out group-hover:scale-110"
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center bottom'
                        }}
                    />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="px-3 py-1 rounded-full bg-white/20 text-sm backdrop-blur-md">{project.category}</span>
                </div>
            </div>

            <div className="p-6 relative z-10">
                <h3 className="text-2xl font-bold mb-1 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.subtitle}</p>
                <p className="text-gray-300 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map(tech => (
                        <span key={tech} className="px-3 py-1 rounded-full bg-gray-700/80 text-xs">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                        <span className="px-3 py-1 rounded-full bg-gray-700/80 text-xs">+{project.technologies.length - 3}</span>
                    )}
                </div>
                <div className="flex justify-end">
                    <button className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                        View Details
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;