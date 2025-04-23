import React from 'react';
import { Github, Facebook, Instagram, Twitter as TwitterIcon, Linkedin } from 'lucide-react';

interface SocialLinksProps {
    className?: string;
    iconSize?: number;
    linkClassName?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({
    className = '',
    iconSize = 20,
    linkClassName = 'w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all'
}) => {
    const socialLinks = [
        {
            icon: <Github size={iconSize} />,
            url: 'https://github.com/Tharindu127',
            ariaLabel: 'GitHub Profile'
        },
        {
            icon: <Facebook size={iconSize} />,
            url: 'https://www.facebook.com/profile.php?id=100008335572167',
            ariaLabel: 'Facebook Profile'
        },
        {
            icon: <Instagram size={iconSize} />,
            url: 'https://www.instagram.com/tharindu_athapaththu',
            ariaLabel: 'Instagram Profile'
        },
        {
            icon: <TwitterIcon size={iconSize} />,
            url: 'https://x.com/tharindu_athapa',
            ariaLabel: 'Twitter Profile'
        },
        {
            icon: <Linkedin size={iconSize} />,
            url: 'https://linkedin.com/in/tharindu-athapaththu-148908160',
            ariaLabel: 'LinkedIn Profile'
        }
    ];

    return (
        <div className={`flex gap-4 ${className}`}>
            {socialLinks.map((link, index) => (
                <a
                    key={index}
                    href={link.url}
                    className={linkClassName}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                >
                    {link.icon}
                </a>
            ))}
        </div>
    );
};

export default SocialLinks;