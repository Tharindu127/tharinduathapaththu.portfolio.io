export interface NavItem {
    id: string;
    label: string;
}

export interface ProjectUrl {
    link: string;
    type: 'website' | 'repository' | 'playstore' | 'appstore' | 'appgallery' | 'figma' | 'research';
    isWorking: boolean;
}

export interface Project {
    // Allow string IDs from Firestore in addition to numbers
    id: number | string;
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

export interface Stats {
    totalProjects: number;
    totalContributions: number;
    totalRepositories: number;
}

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}