import { useState, useEffect } from 'react';
import Image from 'next/image';

const GitHubContributionGraph: React.FC = () => {
  const username = "Tharindu127";
  const [loading, setLoading] = useState<boolean>(true);

  // The direct URL to the GitHub chart
  const chartUrl = `https://ghchart.rshah.org/${username}`;

  useEffect(() => {
    // Simulate loading to match the behavior of the GitLab component
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="h-24 w-full flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="w-full bg-gray-900 p-4 rounded-lg overflow-x-auto">
      <div className="min-w-max">
        <h3 className="text-white text-sm mb-2">GitHub Contributions for {username}</h3>

        {/* Next.js Image component for optimized loading */}
        <div className="flex justify-center w-full relative">
          <Image
            src={chartUrl}
            alt={`GitHub contributions for ${username}`}
            width={800}
            height={128}
            priority
            unoptimized={true} // Since this is an SVG from an external domain
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-end mt-4 text-xs">
          <span className="text-gray-400">
            Source: <a href={chartUrl} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">ghchart.rshah.org</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default GitHubContributionGraph;