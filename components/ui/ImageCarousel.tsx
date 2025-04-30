import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ImageCarouselProps {
    images: string[];
    alts?: string[];  // Added alts prop as optional
    autoplaySpeed?: number;
    onImageChange?: (index: number) => void; // Prop to expose current image index
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
    images,
    alts = [],  // Default to empty array if not provided
    autoplaySpeed = 5000,
    onImageChange
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Go to a specific slide
    const goToSlide = useCallback((index: number) => {
        setCurrentIndex(index);
        if (onImageChange) {
            onImageChange(index);
        }
    }, [onImageChange]);

    // Go to the next slide
    const goToNext = useCallback(() => {
        const newIndex = (currentIndex + 1) % images.length;
        goToSlide(newIndex);
    }, [currentIndex, images.length, goToSlide]);

    // Go to the previous slide
    const goToPrevious = useCallback(() => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        goToSlide(newIndex);
    }, [currentIndex, images.length, goToSlide]);

    // Reset the autoplay timer
    const resetAutoplayTimer = useCallback(() => {
        if (autoplayTimerRef.current) {
            clearTimeout(autoplayTimerRef.current);
        }

        if (isAutoPlaying) {
            autoplayTimerRef.current = setTimeout(() => {
                goToNext();
            }, autoplaySpeed);
        }
    }, [isAutoPlaying, autoplaySpeed, goToNext]);

    // Update autoplay timer when dependencies change
    useEffect(() => {
        resetAutoplayTimer();

        // Cleanup when component unmounts
        return () => {
            if (autoplayTimerRef.current) {
                clearTimeout(autoplayTimerRef.current);
            }
        };
    }, [resetAutoplayTimer]);

    // Pause autoplay when mouse enters
    const handleMouseEnter = useCallback(() => {
        setIsAutoPlaying(false);
        if (autoplayTimerRef.current) {
            clearTimeout(autoplayTimerRef.current);
        }
    }, []);

    // Resume autoplay when mouse leaves
    const handleMouseLeave = useCallback(() => {
        setIsAutoPlaying(true);
        resetAutoplayTimer();
    }, [resetAutoplayTimer]);

    // Get alt text for current image
    const getAltText = (index: number) => {
        // If alts array exists and has an entry for this index, use it
        if (alts && alts[index]) {
            return alts[index];
        }
        // Otherwise return a generic alt text
        return `Carousel image ${index + 1}`;
    };

    return (
        <div
            className="relative rounded-2xl overflow-hidden aspect-[3/4] sm:aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3] shadow-2xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Black gradient overlay for better visibility of controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-20"></div>

            {/* Image container */}
            <div className="relative h-full w-full bg-gray-900">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}
                    >
                        <Image
                            src={image}
                            alt={getAltText(index)}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 75vw, 50vw"
                            priority={index === 0} // Prioritize loading the first image
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Navigation arrows */}
            <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center z-30 hover:bg-black/50 transition-all"
                onClick={(e) => {
                    e.preventDefault();
                    goToPrevious();
                }}
                aria-label="Previous image"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center z-30 hover:bg-black/50 transition-all"
                onClick={(e) => {
                    e.preventDefault();
                    goToNext();
                }}
                aria-label="Next image"
            >
                <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex
                            ? 'bg-white scale-110'
                            : 'bg-white/40 hover:bg-white/60'
                            }`}
                        aria-label={`Go to image ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;