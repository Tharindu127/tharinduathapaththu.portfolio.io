import React from 'react';
import { Phone, MapPin, Mail, Github } from 'lucide-react';
import ContactForm from '../ui/ContactForm';

const ContactSection: React.FC = () => {
    return (
        <section id="contact" className="min-h-screen flex items-center justify-center py-20 snap-start">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold mb-2 text-center animate-fadeIn">Get In Touch</h2>
                <div className="w-24 h-1 bg-blue-500 mx-auto mb-8 animate-expand"></div>
                <p className="text-center text-gray-300 mb-16 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                    Have a project in mind? Looking to collaborate or hire me? Feel free to reach out using the form below and I&apos;ll get back to you as soon as possible.
                </p>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-8 animate-slideUp" style={{ animationDelay: '0.3s' }}>
                        <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
                        <ContactForm />
                    </div>

                    <div className="animate-slideUp" style={{ animationDelay: '0.5s' }}>
                        <div className="relative">
                            <div className="absolute -top-12 -left-12 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                            <div className="relative bg-gray-800/30 backdrop-blur-md rounded-xl p-8 border border-white/5">
                                <h3 className="text-2xl font-bold mb-6">Let&apos;s Connect</h3>
                                <p className="text-gray-300 mb-8">
                                    Whether you have a specific project in mind or just want to say hello, I&apos;m always open to discussing new opportunities and ideas.
                                </p>

                                <div className="space-y-6">
                                    <ContactInfoItem
                                        icon={<Phone size={24} className="text-blue-400" />}
                                        label="Phone"
                                        value="+94 71 22 81 572"
                                    />
                                    <ContactInfoItem
                                        icon={<MapPin size={24} className="text-blue-400" />}
                                        label="Location"
                                        value="Piliyandala, Sri Lanka"
                                    />
                                    <ContactInfoItem
                                        icon={<Mail size={24} className="text-blue-400" />}
                                        label="Email"
                                        value="tharinduathapaththuhewage@gmail.com"
                                        truncate
                                    />
                                    <ContactInfoItem
                                        icon={<Mail size={24} className="text-blue-400" />}
                                        label="Work Email"
                                        value="tharindu.athapaththu@arimaclanka.com"
                                        truncate
                                        bgColor="bg-purple-500/20"
                                    />
                                    <ContactInfoItem
                                        icon={<Github size={24} className="text-blue-400" />}
                                        label="GitHub"
                                        value="github.com/Tharindu127"
                                        bgColor="bg-purple-500/20"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
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
            <div className={truncate ? "overflow-hidden max-w-[180px] sm:max-w-[220px] md:max-w-[300px]" : ""}>
                <p className="text-gray-400 text-sm">{label}</p>
                <p className={`text-white ${truncate ? "truncate" : ""}`}>{value}</p>
            </div>
        </div>
    );
};

export default ContactSection;