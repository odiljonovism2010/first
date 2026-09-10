"use client";

import  { useState } from 'react';
import { FiSearch, FiChevronDown, FiStar } from "react-icons/fi";
import { HiBookOpen } from "react-icons/hi2";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  visibility: string;
  language: string | null;
  updated_at?: string;
  fork?: boolean;
  parent?: {
    full_name: string;
    html_url: string;
  };
}

interface RepoTabProps {
  repos: Repository[];
}

export default function RepoTab({ repos }: RepoTabProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col min-w-0">
      <div className="flex flex-row justify-between items-center gap-3 pb-4 border-b border-[#d0d7de] mb-4 w-full">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#57606a]" />
          <input
            type="text"
            placeholder="Find a repository..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md text-sm text-[#24292f] placeholder-[#57606a] focus:outline-none focus:bg-white focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="text-xs font-medium text-[#24292f] bg-[#f6f8fa] border border-[#d0d7de] px-3 py-1.5 rounded-md hover:bg-[#f3f4f6] flex items-center gap-1 shadow-sm">
            Type <FiChevronDown className="w-3.5 h-3.5 text-[#57606a]" />
          </button>
          <button className="text-xs font-medium text-[#24292f] bg-[#f6f8fa] border border-[#d0d7de] px-3 py-1.5 rounded-md hover:bg-[#f3f4f6] flex items-center gap-1 shadow-sm">
            Language <FiChevronDown className="w-3.5 h-3.5 text-[#57606a]" />
          </button>
          <button className="text-xs font-medium text-[#24292f] bg-[#f6f8fa] border border-[#d0d7de] px-3 py-1.5 rounded-md hover:bg-[#f3f4f6] flex items-center gap-1 shadow-sm">
            Sort <FiChevronDown className="w-3.5 h-3.5 text-[#57606a]" />
          </button>
          <button className="text-xs font-semibold text-white bg-[#2da44e] hover:bg-[#2c974b] px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm">
            <HiBookOpen className="w-4 h-4" /> New
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
                    {repo.name}
                  </a>
                  <span className="text-[11px] px-2 py-0.5 rounded-full border border-[#d0d7de] text-[#57606a] font-medium bg-[#f6f8fa] capitalize">
                    {repo.visibility || "public"}
                  </span>
                </div>

                {repo.description && (
                  <p className="text-xs text-[#57606a] mb-2 line-clamp-2">
                    {repo.description}
                  </p>
                )}

                {repo.fork && repo.parent && (
                  <div className="text-xs text-[#57606a] mb-2">
                    Forked from <a href={repo.parent.html_url} target="_blank" rel="noreferrer" className="hover:text-[#0969da] hover:underline">{repo.parent.full_name}</a>
                  </div>
                )}

                <div className="flex items-center gap-4 text-xs text-[#57606a] mt-2">
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-3 h-3 rounded-full inline-block ${
                          repo.language === "JavaScript"
                            ? "bg-[#f1e05a]"
                            : repo.language === "HTML"
                            ? "bg-[#e34c26]"
                            : repo.language === "TypeScript"
                            ? "bg-[#3178c6]"
                            : repo.language === "Python"
                            ? "bg-[#3572A5]"
                            : "bg-[#8a8a8a]"
                        }`}
                      />
                      <span>{repo.language}</span>
                    </div>
                  )}
                  <span>Updated {repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : "recently"}</span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <div className="flex items-center shadow-sm">
                  <button className="text-xs font-medium text-[#24292f] bg-[#f6f8fa] border border-[#d0d7de] hover:bg-[#f3f4f6] px-2.5 py-1 rounded-l-md flex items-center gap-1">
                    <FiStar className="w-3.5 h-3.5 text-[#57606a]" /> Star
                  </button>
                  <button className="text-xs font-medium text-[#24292f] bg-[#f6f8fa] border-y border-r border-[#d0d7de] hover:bg-[#f3f4f6] px-1.5 py-1 rounded-r-md flex items-center">
                    <FiChevronDown className="w-3 h-3 text-[#57606a]" />
                  </button>
                </div>
                <div className="w-24 h-2 flex items-end">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 10">
                    <path
                      d="M 0 8 Q 25 2, 50 6 T 100 2"
                      fill="none"
                      stroke="#4ac26b"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      opacity="0.75"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-sm text-[#57606a]">
            No repositories found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}