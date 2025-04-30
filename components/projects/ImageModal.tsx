import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ImageModalProps {
    imageUrl: string;
    onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
            onClick={onClose}
        >
            <div className="relative w-[80vw] h-[80vh] flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
                    <Image
                        src={imageUrl}
                        alt="Project screenshot"
                        fill
                        sizes="(max-width: 768px) 100vw, 80vw"
                        style={{ objectFit: 'contain' }}
                        onError={() => console.error("Image failed to load:", imageUrl)}
                        onLoad={() => console.log("Image loaded successfully:", imageUrl)}
                        unoptimized={true} // Important for dynamic image sources
                    />
                </div>
                <button
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                >
                    <X size={24} />
                </button>
            </div>
        </div>
    );
};

export default ImageModal;