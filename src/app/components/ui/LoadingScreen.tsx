import React from 'react';

const LoadingScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block relative w-20 h-20">
                    <div className="absolute inset-0 border-4 border-t-blue-500 border-r-green-500 border-b-purple-500 border-l-red-500 rounded-full animate-spin"></div>
                </div>
                <h2 className="mt-6 text-white text-xl font-bold">Loading Experience</h2>
            </div>
        </div>
    );
};

export default LoadingScreen;