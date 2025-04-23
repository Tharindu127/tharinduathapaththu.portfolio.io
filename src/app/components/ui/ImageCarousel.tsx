import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
    images: string[];
    autoplaySpeed?: number;
    className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
    images,
    autoplaySpeed = 5000,
    className = ''
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Go to next slide with animation
    const nextSlide = useCallback(() => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));

        // Reset transition state after animation completes
        setTimeout(() => {
            setIsTransitioning(false);
        }, 500);
    }, [images.length, isTransitioning]);

    // Go to previous slide with animation
    const prevSlide = useCallback(() => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));

        // Reset transition state after animation completes
        setTimeout(() => {
            setIsTransitioning(false);
        }, 500);
    }, [images.length, isTransitioning]);

    // Handle autoplay
    useEffect(() => {
        if (isPaused || images.length <= 1) return;

        const interval = setInterval(() => {
            nextSlide();
        }, autoplaySpeed);

        return () => clearInterval(interval);
    }, [nextSlide, autoplaySpeed, isPaused, images.length]);

    // Jump to a specific slide
    const goToSlide = (index: number) => {
        if (isTransitioning || index === currentIndex) return;

        setIsTransitioning(true);
        setCurrentIndex(index);

        setTimeout(() => {
            setIsTransitioning(false);
        }, 500);
    };

    return (
        <div
            className={`relative w-full aspect-[4/5] min-h-[300px] bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl overflow-hidden ${className}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Images */}
            <div className="absolute inset-0">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                    >
                        <Image
                            src={image}
                            alt={`Carousel image ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={index === 0}
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20"></div>

            {/* Navigation arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center hover:bg-black/50 transition-all z-30"
                aria-label="Previous image"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center hover:bg-black/50 transition-all z-30"
                aria-label="Next image"
            >
                <ChevronRight size={24} />
            </button>

            {/* Indicator dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                            ? 'bg-white w-6'
                            : 'bg-white/50 hover:bg-white/80'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;