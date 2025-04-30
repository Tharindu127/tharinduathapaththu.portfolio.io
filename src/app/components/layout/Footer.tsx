import React, { useState, useEffect } from 'react';
import SocialLinks from '../ui/SocialLinks';
import { fetchSocialLinks } from '../../firebase';
import { SocialLink } from '../../types';
import Image from 'next/image';

const Footer: React.FC = () => {
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const loadSocialLinks = async () => {
            try {
                setIsLoading(true);
                const links = await fetchSocialLinks();

                if (Array.isArray(links) && links.length > 0) {
                    setSocialLinks(links);
                    console.log('Social links loaded successfully:', links);
                } else {
                    console.warn('No social links found or invalid data format');
                }
            } catch (err) {
                console.error('Error loading social links:', err);
                setError('Failed to load social media links');
            } finally {
                setIsLoading(false);
            }
        };

        loadSocialLinks();
    }, []);

    return (
        <footer className="bg-gray-800 py-6 border-t border-gray-700">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-4 md:mb-0">
                        <p className="flex items-center justify-center text-gray-400 text-sm">
                            <span>©</span>
                            <span className="mx-1">{currentYear} Tharindu Athapaththu. All rights reserved.</span>
                            <Image
                                src="https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/refs/heads/main/src/app/favicon.ico"
                                alt="Copyright icon"
                                width={16}
                                height={16}
                            />
                        </p>
                    </div>

                    {error ? (
                        <p className="text-red-400 text-sm">{error}</p>
                    ) : (
                        <SocialLinks
                            socialLinks={socialLinks}
                            isLoading={isLoading}
                            iconSize={18}
                            linkClassName="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-all"
                        />
                    )}
                </div>
            </div>
        </footer>
    );
};

export default Footer;