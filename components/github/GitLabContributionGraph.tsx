'use client';

import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

interface ContributionData {
  monday: number[];
  tuesday: number[];
  wednesday: number[];
  thursday: number[];
  friday: number[];
  lastUpdated?: string;
}

const GitLabContributionGraph: React.FC = () => {
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const [loading, setLoading] = useState<boolean>(true);
  const [contributionData, setContributionData] = useState<ContributionData>({
    monday: Array(52).fill(0),
    tuesday: Array(52).fill(0),
    wednesday: Array(52).fill(0),
    thursday: Array(52).fill(0),
    friday: Array(52).fill(0)
  });

  useEffect(() => {
    const fetchContributionData = async () => {
      try {
        const db = getFirestore();
        const contributionsRef = doc(db, "contributions", "gitlab");
        const contributionsSnapshot = await getDoc(contributionsRef);

        if (contributionsSnapshot.exists()) {
          const data = contributionsSnapshot.data() as ContributionData;
          setContributionData(data);
        } else {
          console.log("No contribution data found, using defaults");
        }
      } catch (error) {
        console.error("Error fetching contribution data:", error);
      } finally {
        // Keep a minimum loading time for user experience
        setTimeout(() => setLoading(false), 400);
      }
    };

    fetchContributionData();
  }, []);

  // Get color based on contribution level
  const getColor = (level: number): string => {
    // Using GitHub's color scheme
    const colors = [
      'bg-gray-300',
      'bg-green-500',
      'bg-green-600/90',
      'bg-green-700/80',
      'bg-green-900/70'
    ];
    return colors[level] || 'bg-gray-800';
  };

  if (loading) {
    return <div className="h-24 w-full flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="w-full bg-gray-900 p-4 rounded-lg overflow-x-auto">
      <div className="min-w-max">
        <h3 className="text-white text-sm mb-2">GitLab Contributions</h3>

        {/* GitHub-style contribution graph container */}
        <div className="bg-gray-950 p-2 rounded border border-gray-800">
          {/* Month labels */}
          <div className="flex justify-between mb-2 px-8">
            {months.map((month, index) => (
              <div key={index} className="text-gray-400 text-[10px]">{month}</div>
            ))}
          </div>

          {/* Day labels and grid combined */}
          <div className="flex flex-col gap-0">
            {/* Monday row */}
            <div className="flex items-center">
              <span className="text-gray-400 text-[10px] w-4 mr-2">{dayLabels[0]}</span>
              <div className="grid grid-cols-52 gap-0.5 flex-1">
                {contributionData.monday.map((level, i) => (
                  <div key={`m-${i}`} className={`w-2.5 h-2.5 ${getColor(level)}`}></div>
                ))}
              </div>
            </div>

            {/* Tuesday row */}
            <div className="flex items-center">
              <span className="text-gray-400 text-[10px] w-4 mr-2">{dayLabels[1]}</span>
              <div className="grid grid-cols-52 gap-0.5 flex-1">
                {contributionData.tuesday.map((level, i) => (
                  <div key={`t-${i}`} className={`w-2.5 h-2.5 ${getColor(level)}`}></div>
                ))}
              </div>
            </div>

            {/* Wednesday row */}
            <div className="flex items-center">
              <span className="text-gray-400 text-[10px] w-4 mr-2">{dayLabels[2]}</span>
              <div className="grid grid-cols-52 gap-0.5 flex-1">
                {contributionData.wednesday.map((level, i) => (
                  <div key={`w-${i}`} className={`w-2.5 h-2.5 ${getColor(level)}`}></div>
                ))}
              </div>
            </div>

            {/* Thursday row */}
            <div className="flex items-center">
              <span className="text-gray-400 text-[10px] w-4 mr-2">{dayLabels[3]}</span>
              <div className="grid grid-cols-52 gap-0.5 flex-1">
                {contributionData.thursday.map((level, i) => (
                  <div key={`th-${i}`} className={`w-2.5 h-2.5 ${getColor(level)}`}></div>
                ))}
              </div>
            </div>

            {/* Friday row */}
            <div className="flex items-center">
              <span className="text-gray-400 text-[10px] w-4 mr-2">{dayLabels[4]}</span>
              <div className="grid grid-cols-52 gap-0.5 flex-1">
                {contributionData.friday.map((level, i) => (
                  <div key={`f-${i}`} className={`w-2.5 h-2.5 ${getColor(level)}`}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end mt-2 text-xs">
            <span className="text-gray-400 mr-2">Less</span>
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div key={level} className={`w-3 h-3 ${getColor(level)}`}></div>
              ))}
            </div>
            <span className="text-gray-400 ml-2">More</span>
          </div>
        </div>

        {/* Description */}
        <div className="flex items-center justify-between mt-2 text-xs">
          <span className="text-gray-400">Issues, merge requests, pushes, and comments.</span>
          {contributionData.lastUpdated && (
            <span className="text-gray-500">Updated: {contributionData.lastUpdated}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitLabContributionGraph;