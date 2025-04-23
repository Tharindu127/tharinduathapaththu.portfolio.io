import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const LoadingScreen: React.FC = () => {
    const [logoLoaded, setLogoLoaded] = useState(false);

    useEffect(() => {
        // Trigger animation after a slight delay
        const timer = setTimeout(() => {
            setLogoLoaded(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block relative w-20 h-20">
                    <div className="absolute inset-0 border-4 border-t-blue-500 border-r-green-500 border-b-purple-500 border-l-red-500 rounded-full animate-spin"></div>

                    {/* Centered favicon with fade-in and zoom animation */}
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        <div
                            className={`w-10 h-10 relative transition-all duration-1000 ease-out ${logoLoaded
                                ? 'opacity-100 scale-100'
                                : 'opacity-0 scale-75'
                                }`}
                        >
                            <Image
                                src="/favicon.ico"
                                alt="Logo"
                                fill
                                sizes="70px"
                                priority
                                className="object-contain"
                                onLoadingComplete={() => setLogoLoaded(true)}
                            />
                        </div>
                    </div>
                </div>
                <h2 className="mt-6 text-white text-xl font-bold animate-pulse">Loading Experience</h2>
            </div>
        </div>
    );
};

export default LoadingScreen;