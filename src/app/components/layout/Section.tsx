import React, { ReactNode } from 'react';

interface SectionProps {
    id: string;
    children: ReactNode;
    className?: string;
    fullHeight?: boolean;
}

const Section: React.FC<SectionProps> = ({
    id,
    children,
    className = '',
    fullHeight = true,
}) => {
    return (
        <section
            id={id}
            className={`${fullHeight ? 'min-h-screen' : ''} flex items-center justify-center py-20 ${className}`}
        >
            {children}
        </section>
    );
};

export default Section;