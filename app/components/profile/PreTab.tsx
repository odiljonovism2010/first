"use client";

import { 
  FiBookOpen, 
  FiBookmark, 
  FiStar 
} from "react-icons/fi";

interface ProfileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  publicReposCount: number;
}

export default function ProfileNav({ activeTab, setActiveTab, publicReposCount }: ProfileNavProps) {
  const tabs = [
    { id: "overview", label: "Overview", icon: FiBookOpen },
    { id: "repositories", label: "Repositories", icon: FiBookmark, count: publicReposCount },
    { id: "stars", label: "Stars", icon: FiStar },
  ];

  return (
    <div className="border-b border-[#d8dee4] bg-[#f6f8fa] w-full pt-4">
      <div className="w-[100%] mx-auto px-6">
        <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto scrollbar-none" aria-label="Profile">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-3 -mb-[1px] border-b-2 text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? "border-[#fd8c73] text-[#24292f]"
                    : "border-transparent text-[#57606a] hover:text-[#24292f] hover:border-[#d0d7de]"
                }`}
              >
                <Icon className="w-4 h-4 text-[#57606a]" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="ml-1.5 py-0.5 px-2 rounded-full text-xs font-semibold bg-[#afb8c2]/20 text-[#24292f]">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}