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

  useEffect(() => {
    const fetchIssues = async () => {
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
        const url = `https://api.github.com/repos/${githubUser}/${lastRepo}/issues?state=${stateParam}&assignee=${githubUser}`;

        const response = await fetch(url, {
         headers: {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
}
        });

        if (!response.ok) {
          throw new Error("Failed to fetch issues");
        }

        const data: Issue[] = await response.json();
        const pureIssues = data.filter((item: any) => !item.pull_request);
        setIssues(pureIssues);
      } catch (err) {
        setError("Something went wrong");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [isOpenFilter]); 

  const openCount = isOpenFilter ? issues.length : 0; 
  const closedCount = !isOpenFilter ? issues.length : 0;

  return (
    <main className="flex-1 h-screen overflow-y-auto bg-white p-6 font-sans text-[#24292f]">
      {error && (
        <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Assigned to me</h1>
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
          <span className="text-[#8250df] bg-[#f5e8ff] px-1.5 py-0.5 rounded text-[13px]">assignee:@me</span>
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
                {isOpenFilter ? openCount : 0}
              </span>
            </button>

            {/* Вкладка Closed */}
            <button
              onClick={() => setIsOpenFilter(false)}
              className={`flex items-center gap-1.5 cursor-pointer hover:text-[#24292f] ${
                !isOpenFilter ? "text-[#24292f] font-semibold" : "text-[#57606a]"
              }`}
            >
              <span>Closed</span>
              <span className="bg-[#eaeef2] text-[#57606a] text-xs px-2 py-0.5 rounded-full">
                {!isOpenFilter ? closedCount : 0}
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

        {!loading && (
          <div className="bg-white divide-y divide-[#d0d7de]">
            {issues.length === 0 ? (
              <div className="min-h-[200px] flex flex-col items-center justify-center p-8 text-center">
                <h3 className="text-base font-semibold text-[#24292f] mb-1">No results</h3>
                <p className="text-sm text-[#57606a]">Try adjusting your search filters.</p>
              </div>
            ) : (
              issues.map((issue) => (
                <div
                  key={issue.id}
                  className="p-4 flex items-start justify-between hover:bg-[#f6f8fa] transition-colors"
                >
                  <div className="flex gap-2">
                    <CircleDot
                      className={`${
                        issue.state === "open" ? "text-[#1a7f37]" : "text-[#cf222e]"
                      } mt-1 flex-shrink-0`}
                      size={16}
                    />
                    <div>
                      <h2 className="font-semibold text-[#24292f] text-sm md:text-base hover:text-[#0969da] cursor-pointer">
                        {issue.title} <span className="text-gray-400 font-normal">#{issue.number}</span>
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        by {issue.user.login} • Status: <span className="capitalize">{issue.state}</span> • {issue.comments} comments
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Issues;