import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Stats } from '../../types';
import StatCard from '../ui/StatCard';
import GitHubContributionGraph from '../github/GitHubContributionGraph';
import GitLabContributionGraph from '../github/GitLabContributionGraph';

interface GitHubSectionProps {
    stats: Stats;
}

const GitHubSection: React.FC<GitHubSectionProps> = ({ stats }) => {
    return (
        <section id="github-activity" className="min-h-screen flex items-center justify-center py-20 snap-start">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold mb-2 text-center animate-fadeIn">GitHub Activity</h2>
                <div className="w-24 h-1 bg-blue-500 mx-auto mb-16 animate-expand"></div>

                <div className="flex flex-col gap-8 max-w-4xl mx-auto">
                    {/* GitHub Stats Card */}
                    <div className="bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300 animate-fadeInUp">
                        <div className="bg-gray-800/50 p-6 rounded-xl overflow-hidden transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold">GitHub Contributions</h3>
                                <span className="px-3 py-1 rounded-full bg-white/20 text-sm backdrop-blur-md">GitHub</span>
                            </div>

                            <div className="bg-gray-700/50 rounded-lg p-4 flex items-center justify-center">
                                <div className="relative w-full" style={{ height: "210px" }}>
                                    <GitHubContributionGraph />
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-1">Contribution Graph</h3>
                            <p className="text-gray-400 mb-4">My GitHub activity over the past year</p>

                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <StatCard value={stats.totalProjects} label="Projects" />
                                <StatCard value={stats.totalContributions} label="Contributions" />
                                <StatCard value={stats.totalRepositories} label="Repositories" />
                            </div>

                            <div className="flex justify-end">
                                <a
                                    href="https://github.com/Tharindu127"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                                >
                                    View GitHub Profile
                                    <ChevronRight size={16} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* GitLab Stats Card */}
                    <div className="bg-gray-800/50 p-6 rounded-xl overflow-hidden transition-all duration-300 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold">GitLab Activity</h3>
                            <span className="px-3 py-1 rounded-full bg-white/20 text-sm backdrop-blur-md">GitLab</span>
                        </div>

                        <div className="bg-gray-700/50 rounded-lg p-4 flex items-center justify-center">
                            <div className="relative w-full" style={{ height: "260px" }}>
                                <GitLabContributionGraph />
                            </div>
                        </div>

                        <p className="text-gray-400 mt-4 mb-4">My contribution activity on GitLab</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GitHubSection;