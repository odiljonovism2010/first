"use client";

import  { useState } from 'react';
import { FiSearch, FiChevronDown, FiStar } from "react-icons/fi";

interface StarredRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count?: number;
  updated_at?: string;
  language?: string | null;
}

interface StarsProps {
  starredRepos: StarredRepository[];
  onToggleStar?: (repoId: number) => void; 
}

export default function Stars({ starredRepos, onToggleStar }: StarsProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRepos = starredRepos.filter((repo) =>
    (repo.full_name || repo.name).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col min-w-0">
      <div className="flex flex-row justify-between items-center gap-3 pb-4 border-b border-[#d0d7de] mb-4 w-full">
        <div className="relative flex-1 flex items-center gap-2">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#57606a]" />
            <input
              type="text"
              placeholder="Search stars"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md text-sm text-[#24292f] placeholder-[#57606a] focus:outline-none focus:bg-white focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] shadow-sm"
            />
          </div>
          <button className="text-xs font-medium text-[#24292f] bg-[#f6f8fa] border border-[#d0d7de] px-3 py-1.5 rounded-md hover:bg-[#f3f4f6] flex items-center shadow-sm">
            Search
          </button>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="text-xs font-medium text-[#24292f] bg-[#f6f8fa] border border-[#d0d7de] px-3 py-1.5 rounded-md hover:bg-[#f3f4f6] flex items-center gap-1 shadow-sm">
            Type: All <FiChevronDown className="w-3.5 h-3.5 text-[#57606a]" />
          </button>
          <button className="text-xs font-medium text-[#24292f] bg-[#f6f8fa] border border-[#d0d7de] px-3 py-1.5 rounded-md hover:bg-[#f3f4f6] flex items-center gap-1 shadow-sm">
            Sort by: Recently starred <FiChevronDown className="w-3.5 h-3.5 text-[#57606a]" />
          </button>
        </div>
      </div>

      <div className="divide-y divide-[#d0d7de]">
        {filteredRepos.length > 0 ? (
          filteredRepos.map((repo) => (
            <div key={repo.id} className="py-4 flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0969da] font-semibold text-base hover:underline truncate"
                  >
                    {repo.full_name || repo.name}
                  </a>
                </div>

                {repo.description && (
                  <p className="text-xs text-[#57606a] mb-2 line-clamp-2">
                    {repo.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-xs text-[#57606a] mt-2">
                  <span className="flex items-center gap-1">
                    <FiStar className="w-3.5 h-3.5 text-[#57606a]" />
                    {repo.stargazers_count ?? 1}
                  </span>
                  <span>Updated {repo.updated_at ? "last week" : "recently"}</span>
                </div>
              </div>

              <div className="flex items-center shadow-sm flex-shrink-0">
                <button
                  onClick={() => onToggleStar?.(repo.id)}
                  className="text-xs font-medium text-[#24292f] bg-[#f6f8fa] border border-[#d0d7de] hover:bg-[#f3f4f6] px-2.5 py-1 rounded-l-md flex items-center gap-1.5 transition-colors"
                >
                  <FiStar className="w-3.5 h-3.5 text-[#eac54f] fill-[#eac54f]" /> Starred
                </button>
                <button className="text-xs font-medium text-[#24292f] bg-[#f6f8fa] border-y border-r border-[#d0d7de] hover:bg-[#f3f4f6] px-1.5 py-1 rounded-r-md flex items-center">
                  <FiChevronDown className="w-3 h-3 text-[#57606a]" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-sm text-[#57606a]">
            No matching starred repositories found.
          </div>
        )}
      </div>
    </div>
  );
}