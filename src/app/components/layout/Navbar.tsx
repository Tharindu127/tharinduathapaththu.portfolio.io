import React from 'react';
import Image from 'next/image';
import { NavItem } from '../../types';

interface NavbarProps {
    navItems: NavItem[];
    activeSection: string;
    setActiveSection: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ navItems, activeSection, setActiveSection }) => {
    return (
        <div className="fixed top-8 right-8 z-30 hidden md:block">
            <nav className="backdrop-blur-lg bg-white/10 rounded-full p-1">
                <ul className="flex items-center space-x-1">
                    {navItems.map(item => (
                        <li key={item.id}>
                            <button
                                onClick={() => setActiveSection(item.id)}
                                className={`px-4 py-2 rounded-full transition-all duration-300 ${activeSection === item.id
                                    ? 'bg-white text-black shadow-lg'
                                    : 'text-white hover:bg-white/20'
                                    }`}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                    <li className="ml-1">
                        <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/20 transition-all duration-300"
                        >
                            <Image
                                src="/favicon.ico"
                                alt="Logo"
                                width={24}
                                height={24}
                                className="rounded-full"
                            />
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;