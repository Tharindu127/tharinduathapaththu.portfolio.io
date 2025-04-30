// Define at the top of your file or in a separate types.ts file
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Project {
    id: number;
    title: string;
    imageUrl: string;
    subtitle: string;
    category: string;
    description: string;
    fullDescription: string;
    technologies: string[];
    images: string[];
    color: string;
    urls: {
        link: string;
        type: string;
        isWorking: boolean;
    }[];
}