import React, { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    className = '',
    disabled = false,
    type = 'button',
    variant = 'primary',
}) => {
    const baseClasses = 'rounded-full font-semibold flex items-center gap-2 transition-all';

    const variantClasses = {
        primary: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white',
        secondary: 'bg-white/10 backdrop-blur-md hover:bg-white/20 text-white',
        outline: 'border border-white/20 hover:bg-white/10 text-white',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${className} ${disabled ? 'opacity-70 cursor-not-allowed' : ''
                }`}
        >
            {children}
        </button>
    );
};

export default Button;