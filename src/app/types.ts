// types.ts

// Navigation Item Interface
export interface NavItem {
    id: string;
    label: string;
}

// Project Interface
export interface Project {
    id: string | number;
    title: string;
    imageUrl: string;
    subtitle: string;
    category: string;
    description: string;
    fullDescription: string;
    technologies: string[];
    images: string[];
    color: string;
    urls: ProjectUrl[];
}

export interface ProjectUrl {
    link: string;
    type: string;
    isWorking: boolean;
}

// Stats Interface
export interface Stats {
    totalProjects: number;
    totalContributions: number;
    totalRepositories: number;
}

// About Data Interface - Matching Firebase structure
export interface AboutData {
    profileImages?: Array<{
        url: string;
        alt: string;
    }>;
    paragraphs?: string[];
    documents?: {
        cv: string;
        resume: string;
    };
    emailAddress?: string;
    description?: string;
}

// Technology Interface - Matching Firebase structure
export interface Technology {
    id?: string;
    name: string;
    level: number;
    category: string;
    icon?: string;
    color?: string;
}

// GitHub Contribution Interface
export interface GitHubContribution {
    date: string;
    count: number;
}

// Contact Form Interface
export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

// Social Link Interface
export interface SocialLink {
    id?: string;
    icon: string;
    url: string;
    ariaLabel: string;
}

// Contact Info Interface
export interface ContactInfo {
    id?: string;
    icon: string;
    label: string;
    value: string;
    truncate?: boolean;
    bgColor?: string;
}

// Export other interfaces as needed