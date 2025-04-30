import React from 'react';
import { Github, Facebook, Instagram, Twitter as TwitterIcon, Linkedin, Mail, Youtube, Dribbble } from 'lucide-react';
import { SocialLink } from '../../types';

interface SocialLinksProps {
    className?: string;
    iconSize?: number;
    linkClassName?: string;
    socialLinks?: SocialLink[];
    isLoading?: boolean;
}

const SocialLinks: React.FC<SocialLinksProps> = ({
    className = '',
    iconSize = 20,
    linkClassName = 'w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all',
    socialLinks = [],
    isLoading = false
}) => {
    // Function to render the correct icon based on icon name from the database
    const renderIcon = (iconName: string) => {
        switch (iconName.toLowerCase()) {
            case 'github':
                return <Github size={iconSize} />;
            case 'facebook':
                return <Facebook size={iconSize} />;
            case 'instagram':
                return <Instagram size={iconSize} />;
            case 'twitter':
                return <TwitterIcon size={iconSize} />;
            case 'linkedin':
                return <Linkedin size={iconSize} />;
            case 'mail':
                return <Mail size={iconSize} />;
            case 'youtube':
                return <Youtube size={iconSize} />;
            case 'dribbble':
                return <Dribbble size={iconSize} />;
            default:
                return <Github size={iconSize} />;
        }
    };

    // If no social links are provided and loading is true, show loading state
    if (isLoading) {
        return (
            <div className={`flex gap-4 ${className}`}>
                {[...Array(5)].map((_, index) => (
                    <div key={index} className={`${linkClassName} animate-pulse bg-gray-700`}></div>
                ))}
            </div>
        );
    }

    // If no social links are provided and not loading, use default links
    const displayLinks = socialLinks.length > 0 ? socialLinks : [
        {
            icon: 'Github',
            url: 'https://github.com/Tharindu127',
            ariaLabel: 'GitHub Profile'
        },
        {
            icon: 'Facebook',
            url: 'https://www.facebook.com/profile.php?id=100008335572167',
            ariaLabel: 'Facebook Profile'
        },
        {
            icon: 'Instagram',
            url: 'https://www.instagram.com/tharindu_athapaththu',
            ariaLabel: 'Instagram Profile'
        },
        {
            icon: 'Twitter',
            url: 'https://x.com/tharindu_athapa',
            ariaLabel: 'Twitter Profile'
        },
        {
            icon: 'Linkedin',
            url: 'https://linkedin.com/in/tharindu-athapaththu-148908160',
            ariaLabel: 'LinkedIn Profile'
        }
    ];

    return (
        <div className={`flex gap-4 ${className}`}>
            {displayLinks.map((link, index) => (
                <a
                    key={index || `social-${index}`}
                    href={link.url}
                    className={linkClassName}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel || `${link.icon} Profile`}
                >
                    {renderIcon(link.icon)}
                </a>
            ))}
        </div>
    );
};

export default SocialLinks;