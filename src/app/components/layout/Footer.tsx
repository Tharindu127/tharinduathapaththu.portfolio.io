import React from 'react';
import SocialLinks from '../ui/SocialLinks';
import Image from 'next/image';

const Footer: React.FC = () => {
    return (
        <footer className="py-12 bg-gray-800/30 border-t border-gray-800">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold">Software Engineer II - Mobile</h2>
                        <p className="text-gray-400">Creating next-gen mobile experiences</p>
                    </div>
                    <SocialLinks />
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                    <p className="flex items-center justify-center">
                        <span>©</span>
                        <span className="mx-1">{new Date().getFullYear()} Tharindu Athapaththu. All rights reserved.</span>
                        <Image
                            src="/favicon.ico"
                            alt="Copyright icon"
                            width={16}
                            height={16}
                        />
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;