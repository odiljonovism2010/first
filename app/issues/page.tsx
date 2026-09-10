"use client";

import { useEffect, useState } from "react";
import { GoIssueOpened, GoSearch } from "react-icons/go";
import { FiCheckCircle, FiArchive, FiUser, FiArrowDown } from "react-icons/fi";
import NewIssue from "../components/NewIssue";
interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  html_url: string;
  state: string;
  created_at: string;
  updated_at: string;
  repository_url: string;
  user: {
    login: string;
  };
}

function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const elapsed = now.getTime() - past.getTime();

  if (elapsed < msPerMinute) return "just now";
  if (elapsed < msPerHour) return `${Math.round(elapsed / msPerMinute)}m ago`;
  if (elapsed < msPerDay) return `${Math.round(elapsed / msPerHour)}h ago`;
  return `${Math.round(elapsed / msPerDay)}d ago`;
}

export default function Issues() {
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchIssues = async () => {
      const username = localStorage.getItem("github_user") || "";

      try {
        const response = await fetch(
          `https://api.github.com/search/issues?q=author:${username}+is:issue`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
              Accept: "application/vnd.github+json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch issues");
        }

        const data = await response.json();
        setIssues(data.items || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="w-full sm:w-[92%] lg:w-[85%] h-full sm:h-[85%] mx-auto p-3 sm:p-6 font-sans antialiased text-[#1f2328] flex flex-col justify-start">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5 flex-shrink-0">
        <h1 className="text-xl sm:text-3xl font-semibold text-[#1f2328] tracking-tight">
          All Issues created by me
        </h1>
        <button
           type="button" onClick={() => setIsModalOpen(true)}  
          className="bg-[#1a7f37] hover:bg-[#1a7f37]/90 text-white text-[14px] font-semibold px-4 py-2 rounded-md shadow-sm transition-colors text-center"
        >
          New issue
        </button>
      </div>

      <div className="flex items-center w-full border border-[#d0d7de] rounded-md bg-white overflow-hidden mb-4 sm:mb-6 text-[13px] sm:text-[15px] flex-shrink-0">
        <div className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 flex flex-wrap gap-1.5 sm:gap-2 items-center bg-[#ffffff]">
          
          <span className="flex items-center gap-1 text-[#57606a]">
            <span className="hidden sm:inline">is:</span>
            <span className="text-[#0969da] bg-[#ddf4ff] px-1.5 py-0.5 rounded-sm font-medium flex items-center gap-1">
              <GoIssueOpened size={13} className="sm:hidden" />
              issue
            </span>
          </span>

          <span className="flex items-center gap-1 text-[#57606a]">
            <span className="hidden sm:inline">state:</span>
            <span className="text-[#0969da] bg-[#ddf4ff] px-1.5 py-0.5 rounded-sm font-medium flex items-center gap-1">
              <FiCheckCircle size={13} className="sm:hidden" />
              open
            </span>
          </span>

          <span className="flex items-center gap-1 text-[#57606a]">
            <span className="hidden sm:inline">archived:</span>
            <span className="text-[#0969da] bg-[#ddf4ff] px-1.5 py-0.5 rounded-sm font-medium flex items-center gap-1">
              <FiArchive size={13} className="sm:hidden" />
              false
            </span>
          </span>

          <span className="flex items-center gap-1 text-[#57606a]">
            <span className="hidden sm:inline">author:</span>
            <span className="text-[#8250df] bg-[#f5e8ff] px-1.5 py-0.5 rounded-sm font-medium flex items-center gap-1">
              <FiUser size={13} className="sm:hidden" />
              @me
            </span>
          </span>

          <span className="hidden md:flex items-center gap-1 text-[#57606a]">
            <span>sort:</span>
            <span className="text-[#0969da] bg-[#ddf4ff] px-1.5 py-0.5 rounded-sm font-medium">
              updated-desc
            </span>
          </span>

        </div>
        <div className="border-l border-[#d0d7de] px-3 sm:px-4 py-3 bg-[#f6f8fa] flex items-center justify-center cursor-pointer text-[#57606a] hover:text-[#1f2328] transition-colors">
          <GoSearch size={18} />
        </div>
      </div>

      <div className="w-full border border-[#d0d7de] rounded-md bg-white shadow-sm flex flex-col overflow-hidden flex-1">
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-[#d8dee4] bg-[#f6f8fa] flex-shrink-0">
          <span className="text-[14px] sm:text-[15px] font-semibold text-[#1f2328]">
            {issues.length} results
          </span>

          <button className="flex items-center gap-1.5 text-[13px] sm:text-[14px] font-medium text-[#57606a] hover:text-[#1f2328] transition-colors">
            <FiArrowDown size={14} className="text-[#57606a]" />
            <span>Updated</span>
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {issues.map((issue) => {
            const repoName = issue.repository_url.split("/repos/")[1] || "";

            return (
              <div
                key={issue.id}
                className="flex gap-3 px-4 sm:px-5 py-3.5 sm:py-[18px] border-b border-[#d8dee4] last:border-b-0 hover:bg-[#f6f8fa] transition-colors"
              >
                <div className="mt-0.5 text-[#1a7f37] flex-shrink-0">
                  <GoIssueOpened size={18} />
                </div>

                <div className="flex-1 min-w-0">
                  <a 
                    href={issue.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[15px] sm:text-[16px] font-semibold text-[#1f2328] hover:text-[#0969da] cursor-pointer block leading-snug truncate"
                  >
                    {issue.title}
                  </a>

                  <div className="text-[12px] sm:text-[13px] text-[#57606a] mt-1 font-normal tracking-wide flex flex-wrap items-center gap-1">
                    <span className="hover:text-[#0969da] cursor-pointer font-medium text-[#24292f] truncate max-w-[150px] sm:max-w-none">
                      {repoName}#{issue.number}
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="truncate">{issue.user.login} opened {formatRelativeTime(issue.created_at)}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden md:inline">Updated {formatRelativeTime(issue.updated_at)}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {issues.length === 0 && (
            <div className="p-8 sm:p-12 text-center text-[14px] sm:text-[15px] text-[#57606a]">
              No issues found matching the criteria.
            </div>
          )}
        </div>
      </div>
        <NewIssue
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
    </div>
  );
}