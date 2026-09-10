"use client";

import { useState, useEffect } from "react";
import { CircleDot, ChevronDown, Search, X, ArrowUpDown } from "lucide-react";

interface Issue {
  id: number;
  number: number;
  title: string;
  state: string;
  created_at: string;
  comments: number;
  user: {
    login: string;
    avatar_url: string;
  };
}

const Issues = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(true); 

  const [openCount, setOpenCount] = useState<number>(0);
  const [closedCount, setClosedCount] = useState<number>(0);

  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("active_repo_tab") || "Issues";
    }
    return "Issues";
  });

  useEffect(() => {
    localStorage.setItem("active_repo_tab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    const fetchCreatedIssues = async () => {
      setLoading(true);
      setError("");
      try {
        const githubUser = localStorage.getItem("github_user");
        const lastRepo = localStorage.getItem("last_repo");

        if (!githubUser || !lastRepo) {
          setError("Repository not found");
          setLoading(false);
          return;
        }

        const stateParam = isOpenFilter ? "open" : "closed";
        
        const url = `https://api.github.com/search/issues?q=repo:${githubUser}/${lastRepo}+is:issue+state:${stateParam}+author:${githubUser}`;

        const response = await fetch(url, {
         headers: {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
}
        });

        if (!response.ok) {
          throw new Error("Failed to fetch issues");
        }

        const data = await response.json();
        const pureIssues = data.items || [];
        setIssues(pureIssues);

        if (isOpenFilter) {
          setOpenCount(data.total_count || 0);
        } else {
          setClosedCount(data.total_count || 0);
        }
      } catch (err) {
        setError("Something went wrong");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCreatedIssues();
  }, [isOpenFilter]);

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;

    const elapsed = now.getTime() - past.getTime();

    if (elapsed < msPerHour) {
      const mins = Math.round(elapsed / msPerMinute);
      return `${mins}m ago`;
    } else if (elapsed < msPerDay) {
      const hours = Math.round(elapsed / msPerHour);
      return `${hours}h ago`;
    } else {
      const days = Math.round(elapsed / msPerDay);
      return `${days} days ago`;
    }
  };

  return (
    <>
      <main className="flex-1 h-screen overflow-y-auto bg-white p-6 font-sans text-[#24292f]">
        {error && (
          <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <div className="w-full flex justify-between items-center my-3">
          <h1 className="text-xl font-semibold">Created by me</h1>
          <button className="text-sm bg-[#1f883d] hover:bg-[#1a7f37] text-white py-1.5 px-3 font-medium cursor-pointer rounded-md shadow-sm transition-colors">
            New issue
          </button>
        </div>

        <div className="relative w-full mb-4 flex items-center bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus-within:border-[#0969da] focus-within:ring-1 focus-within:ring-[#0969da] shadow-sm transition-all h-8">
          <div className="flex-1 flex items-center px-3 overflow-x-auto whitespace-nowrap scrollbar-none text-sm text-[#57606a]">
            <span className="text-[#0969da] bg-[#ddf4ff] px-1.5 py-0.5 rounded mr-1.5 text-[13px]">is:issue</span>
            <span className="text-[#0969da] bg-[#ddf4ff] px-1.5 py-0.5 rounded mr-1.5 text-[13px]">
              state:{isOpenFilter ? "open" : "closed"}
            </span>
            <span className="text-[#8250df] bg-[#f5e8ff] px-1.5 py-0.5 rounded text-[13px]">author:@me</span>
          </div>

          <div className="flex items-center pr-2 gap-1 text-[#57606a] bg-[#f6f8fa] h-full rounded-r-md pl-2 border-l border-[#d0d7de]/40">
            <button className="hover:text-[#24292f] p-0.5 rounded cursor-pointer">
              <X size={14} />
            </button>
            <Search size={16} className="ml-1 text-[#57606a]" />
          </div>
        </div>

        <div className="border border-[#d0d7de] rounded-lg overflow-hidden">
          <div className="flex items-center justify-between bg-[#f6f8fa] border-b border-[#d0d7de] px-4 py-3 text-sm text-[#57606a]">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 rounded border-[#d0d7de] text-[#0969da] focus:ring-[#0969da] cursor-pointer"
              />

              <button
                onClick={() => setIsOpenFilter(true)}
                className={`flex items-center gap-1.5 cursor-pointer hover:text-[#0969da] ${
                  isOpenFilter ? "text-[#24292f] font-semibold" : "text-[#57606a]"
                }`}
              >
                <span>Open</span>
                <span className="bg-[#eaeef2] text-[#24292f] text-xs px-2 py-0.5 rounded-full font-normal">
                  {openCount}
                </span>
              </button>

              <button
                onClick={() => setIsOpenFilter(false)}
                className={`flex items-center gap-1.5 cursor-pointer hover:text-[#24292f] ${
                  !isOpenFilter ? "text-[#24292f] font-semibold" : "text-[#57606a]"
                }`}
              >
                <span>Closed</span>
                <span className="bg-[#eaeef2] text-[#57606a] text-xs px-2 py-0.5 rounded-full">
                  {closedCount}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-5">
              {["Author", "Labels", "Projects", "Milestones", "Assignees"].map((filter) => (
                <button key={filter} className="flex items-center gap-1 hover:text-[#24292f] cursor-pointer">
                  {filter} <ChevronDown size={14} className="opacity-70" />
                </button>
              ))}

              <button className="flex items-center gap-1 hover:text-[#24292f] cursor-pointer">
                <ArrowUpDown size={14} className="opacity-70" />
                Sort <ChevronDown size={14} className="opacity-70" />
              </button>
            </div>
          </div>

          {loading && (
            <div className="flex justify-center items-center min-h-[200px] text-gray-500 bg-white">
              Loading...
            </div>
          )}

          {!loading && !error && (
            <div className="bg-white divide-y divide-[#d0d7de]">
              {issues.length === 0 ? (
                <div className="min-h-[200px] flex flex-col items-center justify-center p-8 text-center bg-white">
                  <h3 className="text-base font-semibold text-[#24292f] mb-1">No results</h3>
                  <p className="text-sm text-[#57606a]">Try adjusting your search filters.</p>
                </div>
              ) : (
                issues.map((issue) => (
                  <div
                    key={issue.id}
                    className="p-4 flex items-start gap-3 hover:bg-[#f6f8fa] border-b border-[#d0d7de] last:border-b-0 transition-colors bg-white"
                  >
                    <input
                      type="checkbox"
                      className="w-3.5 h-3.5 mt-1 rounded border-[#d0d7de] text-[#0969da] focus:ring-[#0969da] cursor-pointer flex-shrink-0"
                    />
                    
                    <CircleDot
                      className={`${
                        issue.state === "open" ? "text-[#1a7f37]" : "text-[#cf222e]"
                      } mt-0.5 flex-shrink-0`}
                      size={18}
                      strokeWidth={2}
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <a 
                          href="#" 
                          className="font-semibold text-[#24292f] text-[15px] hover:text-[#0969da] transition-colors leading-snug cursor-pointer"
                        >
                          {issue.title}
                        </a>
                      </div>
                      
                      <p className="text-xs text-[#57606a] mt-1 font-sans">
                        #{issue.number} · {issue.user.login} opened {formatTimeAgo(issue.created_at)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Issues;