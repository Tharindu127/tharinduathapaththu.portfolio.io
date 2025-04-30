import React from 'react';
import { Menu, X } from 'lucide-react';
import { NavItem } from '../../types';

interface MobileMenuProps {
    navItems: NavItem[];
    activeSection: string;
    setActiveSection: (id: string) => void;
    menuOpen: boolean;
    setMenuOpen: (open: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
    navItems,
    activeSection,
    setActiveSection,
    menuOpen,
    setMenuOpen,
}) => {
    return (
        <>
            {/* Mobile menu button */}
            <div className="fixed top-6 right-6 z-30 md:hidden">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-lg"
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile menu overlay */}
            {menuOpen && (
                <div className="fixed inset-0 z-20 bg-black/90 backdrop-blur-lg flex items-center justify-center md:hidden">
                    <nav>
                        <ul className="flex flex-col space-y-6 text-center">
                            {navItems.map(item => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => {
                                            setActiveSection(item.id);
                                            setMenuOpen(false);
                                        }}
                                        className={`text-2xl font-bold transition-all duration-300 ${activeSection === item.id
                                            ? 'text-blue-400'
                                            : 'text-white hover:text-blue-300'
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}
        </>
    );
};

export default MobileMenu;