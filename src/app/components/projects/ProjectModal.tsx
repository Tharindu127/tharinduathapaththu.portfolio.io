import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, ExternalLink, Github } from 'lucide-react';
import { Project } from '../../types';

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
    onImageClick: (image: string) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onImageClick }) => {
    const DEFAULT_HEIGHT = 240; // Default image height (h-60)
    const COLLAPSED_HEIGHT = 120; // Collapsed height when scrolled (h-30)
    const [imageHeight, setImageHeight] = useState(DEFAULT_HEIGHT);
    const contentRef = useRef<HTMLDivElement>(null);
    const isScrolling = useRef(false);

    // Reset scroll position to top and reset image height
    const resetScroll = () => {
        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
            setImageHeight(DEFAULT_HEIGHT);
            isScrolling.current = false;
        }
    };

    // Handle scroll events to adjust image height
    useEffect(() => {
        const handleScroll = () => {
            if (!contentRef.current) return;

            const scrollPosition = contentRef.current.scrollTop;

            // If we're at the top, reset the image height
            if (scrollPosition === 0) {
                setImageHeight(DEFAULT_HEIGHT);
                isScrolling.current = false;
            }
            // If we start scrolling, immediately collapse the image to the smaller height
            else if (!isScrolling.current) {
                setImageHeight(COLLAPSED_HEIGHT);
                isScrolling.current = true;
            }
        };

        const contentElement = contentRef.current;
        if (contentElement) {
            contentElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (contentElement) {
                contentElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn" onClick={onClose}>
            <div
                className="bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="relative cursor-pointer"
                    style={{ height: `${imageHeight}px`, transition: 'height 0.3s ease' }}
                    onClick={resetScroll}
                >
                    <div className={`w-full h-full ${project?.color || ''} flex items-center justify-center relative`}>
                        <Image
                            src={project?.imageUrl}
                            alt={project?.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                            quality={90}
                            style={{ objectFit: 'cover' }}
                        />

                        {/* Gradient overlay for image */}
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-800 to-transparent" />
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-all"
                        aria-label="Close modal"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div
                    ref={contentRef}
                    className="p-8 overflow-y-auto flex-grow"
                    style={{ maxHeight: 'calc(90vh - 80px)' }}
                >
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold mb-1 transition-colors">{project?.title}</h3>
                        <p className="text-xl text-gray-300 mb-2">{project?.subtitle}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project?.technologies?.map((tech: string) => (
                                <span key={tech} className="px-3 py-1 rounded-full bg-gray-700 text-sm">{tech}</span>
                            ))}
                        </div>
                        <p className="whitespace-pre-line">{project?.fullDescription}</p>
                    </div>

                    <h3 className="text-xl font-bold mb-4">Project Gallery</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {project?.images?.map((image: string, index: number) => (
                            <div
                                key={index}
                                className="rounded-lg overflow-hidden relative aspect-video cursor-pointer hover:opacity-90 transition-opacity"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onImageClick(image);
                                }}
                            >
                                <Image
                                    src={image}
                                    alt={`${project?.title} screenshot ${index + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-3 justify-end">
                        {project?.urls?.map((url, index) => (
                            <a
                                key={index}
                                href={url.isWorking ? url.link : "#"}
                                target={url.isWorking ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all font-semibold ${url.isWorking
                                    ? 'bg-white/10 hover:bg-white/50 text-white cursor-pointer'
                                    : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-60'
                                    }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (!url.isWorking) {
                                        e.preventDefault();
                                    }
                                }}
                            >
                                {renderUrlIcon(url.type)}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const renderUrlIcon = (type: string) => {
    switch (type) {
        case 'website':
            return (
                <>
                    Visit Website
                    <ExternalLink size={18} />
                </>
            );
        case 'repository':
            return (
                <>
                    View Code
                    <Github size={18} />
                </>
            );
        case 'appstore':
            return (
                <>
                    App Store
                    <svg width="22" height="22" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                        <path fill="white" d="M396.6,183.8l16.2-28c10-17.5,32.3-23.4,49.8-13.4s23.4,32.3,13.4,49.8L319.9,462.4h112.9c36.6,0,57.1,43,41.2,72.8H143c-20.2,0-36.4-16.2-36.4-36.4c0-20.2,16.2-36.4,36.4-36.4h92.8l118.8-205.9l-37.1-64.4c-10-17.5-4.1-39.6,13.4-49.8c17.5-10,39.6-4.1,49.8,13.4L396.6,183.8L396.6,183.8z M256.2,572.7l-35,60.7c-10,17.5-32.3,23.4-49.8,13.4S148,614.5,158,597l26-45C213.4,542.9,237.3,549.9,256.2,572.7L256.2,572.7z M557.6,462.6h94.7c20.2,0,36.4,16.2,36.4,36.4c0,20.2-16.2,36.4-36.4,36.4h-52.6l35.5,61.6c10,17.5,4.1,39.6-13.4,49.8c-17.5,10-39.6,4.1-49.8-13.4c-59.8-103.7-104.7-181.3-134.5-233c-30.5-52.6-8.7-105.4,12.8-123.3C474.2,318.1,509.9,380,557.6,462.6L557.6,462.6z" />
                    </svg>
                </>
            );
        case 'playstore':
            return (
                <>
                    Play Store
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 20.5V3.5C3 2.89 3.24 2.49 3.74 2.15L12.36 11.86L3.73 20.85C3.24 20.5 3 20.1 3 20.5Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3.73 2.15L12.36 11.86L15.45 8.57L6.5 3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3.73 20.85L12.36 11.86L15.5 15.5L6.5 20.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15.5 15.5L19.5 13.03C20.17 12.67 20.17 11.33 19.5 10.97L15.45 8.57" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </>
            );
        case 'appgallery':
            return (
                <>
                    App Gallery
                    <svg width="18" height="18" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <mask id="cutoutMask">
                                <rect x="0" y="0" width="36" height="36" fill="white" />
                                <path d="m 15.703052,20.879251 h 1.445267 l -0.725093,-1.68629 z m -0.355892,0.8498 -0.428806,0.981162 h -0.976243 l 2.076035,-4.709924 h 0.843724 l 2.067644,4.709924 H 17.92723 l -0.423308,-0.981162 z m 15.709293,0.97769 H 32 V 18 h -0.943547 z m -3.755381,-2.021928 h 1.73924 v -0.858191 h -1.73924 v -0.96467 h 2.524806 v -0.85848 h -3.468064 v 4.706451 h 3.558917 v -0.85848 H 27.301072 Z M 23.552056,21.24093 22.482355,18 h -0.780647 l -1.069701,3.24093 -1.041055,-3.238326 h -1.017908 l 1.642888,4.710213 h 0.791353 l 1.071437,-3.093944 1.071437,3.093944 h 0.798297 l 1.638548,-4.710213 H 24.595426 Z M 12.501762,20.697833 c 0,0.76618 -0.380486,1.1756 -1.071437,1.1756 -0.694712,0 -1.077223,-0.421283 -1.077223,-1.208296 V 18.003183 H 9.3968234 v 2.69465 c 0,1.32548 0.7366666,2.085584 2.0204816,2.085584 1.296545,0 2.039867,-0.774571 2.039867,-2.124935 v -2.658193 h -0.95541 z M 7.1153548,18.000289 h 0.9556995 v 4.712817 H 7.1153548 V 20.799103 H 4.9562782 v 1.914003 H 4 v -4.712817 h 0.9562782 v 1.900983 h 2.1590766 z" fill="black" />
                                <path d="M 18,12 C 14.691262,12 12,9.3084491 12,6 h 0.847512 c 0,2.8408565 2.311632,5.152199 5.152488,5.152199 2.840856,0 5.152488,-2.3113425 5.152488,-5.152199 H 24 c 0,3.3084491 -2.691551,6 -6,6" fill="black" />
                            </mask>
                        </defs>
                        <path d="M 10.101,0 C 2.7051128,0 0,2.704641 0,10.099029 V 25.900971 C 0,33.295359 2.7051128,36 10.101,36 H 25.894186 C 33.289863,36 36,33.295359 36,25.900971 V 10.099029 C 36,2.704641 33.294887,0 25.899,0 Z" fill="white" mask="url(#cutoutMask)" />
                    </svg>
                </>
            );
        case 'figma':
            return (
                <>
                    View Design
                    <svg width="18" height="18" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="980" height="480" rx="240" ry="240" fill="white" />
                        <rect x="10" y="510" width="480" height="480" rx="240" ry="240" fill="white" />
                        <circle cx="730" cy="750" r="240" fill="white" />
                        <rect x="10" y="1010" width="480" height="480" rx="240" ry="240" fill="white" />
                    </svg>
                </>
            );
        case 'research':
            return (
                <>
                    Read Article
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7 7H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7 11H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7 15H13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </>
            );
        default:
            return null;
    }
};

export default ProjectModal;