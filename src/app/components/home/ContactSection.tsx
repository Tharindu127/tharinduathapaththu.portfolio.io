import React from 'react';
import { Phone, MapPin, Mail, Github } from 'lucide-react';
import ContactForm from '../ui/ContactForm';
import { ContactInfo, SocialLink } from '../../types';

interface ContactSectionProps {
    contactInfo?: ContactInfo[];
    socialLinks?: SocialLink[];
    isLoading?: boolean;
}

// Helper function to get the icon component based on the icon name from Firebase
const getIconComponent = (iconName: string, className: string = "text-blue-400") => {
    const size = 24;

    switch (iconName) {
        case 'Phone':
            return <Phone size={size} className={className} />;
        case 'MapPin':
            return <MapPin size={size} className={className} />;
        case 'Mail':
            return <Mail size={size} className={className} />;
        case 'Github':
            return <Github size={size} className={className} />;
        default:
            return <Mail size={size} className={className} />;
    }
};

interface ContactInfoItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    truncate?: boolean;
    bgColor?: string;
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({
    icon,
    label,
    value,
    truncate = false,
    bgColor = "bg-blue-500/20"
}) => {
    return (
        <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center flex-shrink-0`}>
                {icon}
            </div>
            <div className={`${truncate ? "overflow-hidden" : ""} flex-1`}>
                <p className="text-gray-400 text-sm">{label}</p>
                <p className={`text-white ${truncate ? "truncate" : ""}`}>{value}</p>
            </div>
        </div>
    );
};

const ContactSection: React.FC<ContactSectionProps> = ({
    contactInfo = [],
    isLoading = false
}) => {
    // Default contact items to use if none provided
    const defaultContactItems = [
        {
            icon: 'Phone',
            label: 'Phone/WhatsApp',
            value: '+94 76 44 61 572',
            truncate: false,
            bgColor: 'bg-blue-500/20'
        },
        {
            icon: 'MapPin',
            label: 'Location',
            value: 'Piliyandala, Sri Lanka',
            truncate: false,
            bgColor: 'bg-blue-500/20'
        },
        {
            icon: 'Mail',
            label: 'Email',
            value: 'tharinduathapaththuhewage@gmail.com',
            truncate: true,
            bgColor: 'bg-blue-500/20'
        },
        {
            icon: 'Mail',
            label: 'Work Email',
            value: 'tharindu.athapaththu@arimaclanka.com',
            truncate: true,
            bgColor: 'bg-purple-500/20'
        },
        {
            icon: 'Github',
            label: 'GitHub',
            value: 'github.com/Tharindu127',
            truncate: false,
            bgColor: 'bg-purple-500/20'
        }
    ];

    // Use provided contact items or fallback to defaults
    const displayContactItems = contactInfo.length > 0 ? contactInfo : defaultContactItems;

    return (
        <section id="contact" className="min-h-screen flex items-center justify-center py-20 pt-30 snap-start overflow-hidden">
            <div className="container mx-auto px-4 w-full">
                <h2 className="text-4xl font-bold mb-2 text-center animate-fadeIn">Get In Touch</h2>
                <div className="w-24 h-1 bg-blue-500 mx-auto mb-8 animate-expand"></div>
                <p className="text-center text-gray-300 mb-16 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                    Have a project in mind? Looking to collaborate or hire me? Feel free to reach out using the form below and I&apos;ll get back to you as soon as possible.
                </p>
                <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start">
                    <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 md:p-8 animate-slideUp w-full" style={{ animationDelay: '0.3s' }}>
                        <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
                        <ContactForm />
                    </div>

                    <div className="animate-slideUp w-full" style={{ animationDelay: '0.5s' }}>
                        <div className="relative">
                            {/* Position these more carefully to avoid overflow */}
                            <div className="absolute top-0 left-0 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                            <div className="relative bg-gray-800/30 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/5">
                                <h3 className="text-2xl font-bold mb-6">Let&apos;s Connect</h3>
                                <p className="text-gray-300 mb-8">
                                    Whether you have a specific project in mind or just want to say hello, I&apos;m always open to discussing new opportunities and ideas.
                                </p>

                                {isLoading ? (
                                    <div className="space-y-6">
                                        <div className="animate-pulse h-12 bg-gray-700/50 rounded"></div>
                                        <div className="animate-pulse h-12 bg-gray-700/50 rounded"></div>
                                        <div className="animate-pulse h-12 bg-gray-700/50 rounded"></div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {displayContactItems.map((item, index) => (
                                            <ContactInfoItem
                                                key={index}
                                                icon={getIconComponent(item.icon, "text-blue-400")}
                                                label={item.label}
                                                value={item.value}
                                                truncate={item.truncate || false}
                                                bgColor={item.bgColor || "bg-blue-500/20"}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;