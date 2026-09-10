"use client";

import  { useState, useEffect } from "react";
import { FiBook, FiTrash2, FiUsers } from "react-icons/fi";

interface Repository {
  id: number;
  name: string;
  full_name: string;
  size: number; 
  owner: {
    login: string;
  };
  private: boolean;
  html_url: string;
  collaborators_count?: number; 
}

export default function ReposSet() {
  const [username, setUsername] = useState("odiljonovism2010");
  const [defaultBranch, setDefaultBranch] = useState("main");
  const [commitComments, setCommitComments] = useState("Enabled by default");
  const [activeTab, setActiveTab] = useState<"repositories" | "deleted">("repositories");
  
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("github_user") || "odiljonovism2010";
    setUsername(storedUser);

    async function fetchRepos() {
      try {
        setLoading(true);
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        const headers: HeadersInit = {
          Accept: "application/vnd.github+json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch(`https://api.github.com/users/${storedUser}/repos?per_page=100&sort=updated`, {
          headers,
        });

        if (!res.ok) {
          throw new Error("Failed to fetch repositories from GitHub API");
        }

        const data: Repository[] = await res.json();
        setRepos(data);
      } catch (err: any) {
        setError(err.message || "Error loading repositories");
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  const groupedRepos = repos.reduce((acc, repo) => {
    const ownerLogin = repo.owner.login;
    if (!acc[ownerLogin]) {
      acc[ownerLogin] = [];
    }
    acc[ownerLogin].push(repo);
    return acc;
  }, {} as Record<string, Repository[]>);

  const formatSize = (sizeInKB: number) => {
    if (sizeInKB >= 1024) {
      return `${(sizeInKB / 1024).toFixed(1)} MB`;
    }
    return `${sizeInKB} KB`;
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div className="space-y-3 pb-6 border-b border-[#d0d7de]">
        <h2 className="text-2xl font-normal text-[#24292f]">Repository default branch</h2>
        <p className="text-sm text-[#57606a] max-w-3xl">
          Choose the default branch for your new personal repositories. You might want to change the default name due to different workflows, or because your integrations still require "master" as the default branch name. You can always change the default branch name on individual repositories.{" "}
          <a href="#" className="text-[#0969da] hover:underline">
            Learn more about default branches
          </a>
          .
        </p>
        <div className="flex items-center gap-2 pt-1">
          <input
            type="text"
            value={defaultBranch}
            onChange={(e) => setDefaultBranch(e.target.value)}
            className="w-48 px-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f]"
          />
          <button
            type="button"
            className="px-3 py-1.5 bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] text-[#24292f] font-medium text-sm rounded-md shadow-sm transition-colors cursor-pointer"
          >
            Update
          </button>
        </div>
      </div>

      <div className="space-y-3 pb-6 border-b border-[#d0d7de]">
        <h2 className="text-2xl font-normal text-[#24292f]">Commit comments</h2>
        <p className="text-sm text-[#57606a] max-w-3xl">
          Choose whether{" "}
          <a href="#" className="text-[#0969da] hover:underline">
            commit comments
          </a>{" "}
          are enabled or disabled by default for repositories you own. Individual repositories can override this default. Existing commit comments are not affected by this setting and will remain viewable, editable, and deletable.
        </p>
        <div>
          <select
            value={commitComments}
            onChange={(e) => setCommitComments(e.target.value)}
            className="px-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f]"
          >
            <option value="Enabled by default">Commit comments: Enabled by default</option>
            <option value="Disabled by default">Commit comments: Disabled by default</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-normal text-[#24292f]">Repositories</h2>

        <div className="border border-[#d0d7de] rounded-md bg-white">
          <div className="flex border-b border-[#d0d7de] px-4 pt-3 gap-6 text-sm">
            <button
              type="button"
              onClick={() => setActiveTab("repositories")}
              className={`pb-3 font-medium flex items-center gap-2 border-b-2 cursor-pointer transition-colors ${
                activeTab === "repositories"
                  ? "border-[#fd8c73] text-[#24292f]"
                  : "border-transparent text-[#57606a] hover:text-[#24292f]"
              }`}
            >
              <FiBook className="w-4 h-4" />
              Repositories
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("deleted")}
              className={`pb-3 font-medium flex items-center gap-2 border-b-2 cursor-pointer transition-colors ${
                activeTab === "deleted"
                  ? "border-[#fd8c73] text-[#24292f]"
                  : "border-transparent text-[#57606a] hover:text-[#24292f]"
              }`}
            >
              <FiTrash2 className="w-4 h-4" />
              Deleted repositories
            </button>
          </div>

          {activeTab === "repositories" ? (
            <div className="p-0">
              {loading ? (
                <div className="p-8 text-center text-sm text-[#57606a]">Loading repositories from GitHub API...</div>
              ) : error ? (
                <div className="p-8 text-center text-sm text-[#cf222e]">{error}</div>
              ) : Object.keys(groupedRepos).length === 0 ? (
                <div className="p-8 text-center text-sm text-[#57606a]">No repositories found.</div>
              ) : (
                Object.entries(groupedRepos).map(([owner, repoList]) => (
                  <div key={owner} className="border-b last:border-b-0 border-[#d0d7de]">
                    <div className="px-6 py-3 bg-[#f6f8fa] border-b border-[#d0d7de] font-semibold text-sm text-[#24292f]">
                      {owner}
                    </div>
                    <div className="divide-y divide-[#d0d7de]">
                      {repoList.map((repo) => {
                        const isOwner = owner.toLowerCase() === username.toLowerCase();
                        return (
                          <div key={repo.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-[#f9fafb] transition-colors">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <FiBook className="w-4 h-4 text-[#57606a] shrink-0" />
                              <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm font-semibold text-[#0969da] hover:underline truncate"
                              >
                                {repo.full_name}
                              </a>
                              <span className="text-xs text-[#57606a] shrink-0">{formatSize(repo.size)}</span>
                            </div>
                            <div className="flex items-center gap-4 shrink-0">
                              <div className="flex items-center gap-1.5 text-xs text-[#57606a]">
                                <FiUsers className="w-3.5 h-3.5" />
                                <span>{repo.collaborators_count ?? 0} collaborators</span>
                              </div>
                              {!isOwner && (
                                <button
                                  type="button"
                                  className="px-3 py-1 bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] text-[#24292f] font-medium text-xs rounded-md shadow-sm transition-colors cursor-pointer"
                                >
                                  Leave
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-[#57606a]">
              No deleted repositories found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}