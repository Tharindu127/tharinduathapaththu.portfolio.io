import React, { useState } from 'react';
import { Project } from '../../types';
import ProjectCard from '../projects/ProjectCard';
import ProjectModal from '../projects/ProjectModal';
import ImageModal from '../projects/ImageModal';

interface ProjectsSectionProps {
    projects: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        document.body.style.overflow = 'hidden';
    };

    const closeProjectModal = () => {
        setSelectedProject(null);
        document.body.style.overflow = 'auto';
    };

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    return (
        <section id="projects" className="min-h-screen flex items-center justify-center py-20 pt-30 snap-start">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold mb-2 text-center animate-fadeIn">My Projects</h2>
                <div className="w-24 h-1 bg-blue-500 mx-auto mb-16 animate-expand"></div>

                {projects.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400 mb-4">No projects to display</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={handleProjectClick}
                                index={index}
                            />
                        ))}
                    </div>
                )}

                {/* Project Modal */}
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={closeProjectModal}
                        onImageClick={handleImageClick}
                    />
                )}

                {/* Image Modal */}
                {selectedImage && (
                    <ImageModal
                        imageUrl={selectedImage}
                        onClose={closeImageModal}
                    />
                )}
            </div>
        </section>
    );
};

export default ProjectsSection;