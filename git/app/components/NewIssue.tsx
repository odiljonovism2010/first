"use client";

import React, { useState, useEffect } from "react";
import { FiX, FiCopy, FiBook, FiChevronDown, FiArrowRight, FiBold, FiItalic, FiList, FiCode, FiLink, FiEye, FiEdit3 } from "react-icons/fi";

interface CreateIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Repository {
  id: number;
  full_name: string;
  name: string;
}

export default function CreateIssueModal({ isOpen, onClose }: CreateIssueModalProps) {
  const [selectedRepo, setSelectedRepo] = useState<string>("");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isRepoDropdownOpen, setIsRepoDropdownOpen] = useState(false);
  const [step, setStep] = useState<"select" | "form">("select");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchUserRepos = async () => {
      try {
        const githubUser = localStorage.getItem("github_user");
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN || "";

        if (githubUser) {
          const res = await fetch(`https://api.github.com/users/${githubUser}/repos?per_page=100`, {
            headers: token ? { Authorization: `token ${token}` } : {},
          });
          if (res.ok) {
            const data: Repository[] = await res.json();
            setRepositories(data);
            if (data.length > 0 && !selectedRepo) {
              setSelectedRepo(data[0].full_name);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch user repositories", error);
      }
    };

    fetchUserRepos();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCreateIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN || "";
      const res = await fetch(`https://api.github.com/repos/${selectedRepo}/issues`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `token ${token}` } : {}),
        },
        body: JSON.stringify({ title, body }),
      });

      if (res.ok) {
        setTitle("");
        setBody("");
        setStep("select");
        onClose();
      } else {
        alert("Failed to create issue. Please check your token permissions.");
      }
    } catch (error) {
      console.error("Error creating issue:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-[2px] p-4">
      <div className="bg-white rounded-lg shadow-2xl border border-[#d0d7de] w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#d0d7de] bg-[#f6f8fa]">
          <h3 className="text-sm font-semibold text-[#24292f]">
            {step === "select" ? "Create new issue" : `Create new issue in ${selectedRepo}`}
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="text-[#57606a] hover:text-[#24292f] p-1 rounded transition-colors cursor-pointer"
              title="Copy link"
            >
              <FiCopy className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("select");
                onClose();
              }}
              className="text-[#57606a] hover:text-[#24292f] p-1 rounded transition-colors cursor-pointer"
              title="Close"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        </div>

        {step === "select" ? (
          <div className="p-6 space-y-6">
            <div className="space-y-1.5 relative">
              <label className="block text-xs font-semibold text-[#24292f]">
                Repository <span className="text-[#cf222e]">*</span>
              </label>
              <button
                type="button"
                onClick={() => setIsRepoDropdownOpen(!isRepoDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] rounded-md text-sm text-[#24292f] shadow-sm cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 truncate">
                  <FiBook className="w-4 h-4 text-[#57606a] shrink-0" />
                  <span className="font-semibold truncate">{selectedRepo || "Select repository..."}</span>
                </div>
                <FiChevronDown className="w-4 h-4 text-[#57606a] shrink-0" />
              </button>

              {isRepoDropdownOpen && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-[#d0d7de] rounded-md shadow-lg z-20 text-sm max-h-60 overflow-y-auto py-1">
                  {repositories.length > 0 ? (
                    repositories.map((repo) => (
                      <div
                        key={repo.id}
                        onClick={() => {
                          setSelectedRepo(repo.full_name);
                          setIsRepoDropdownOpen(false);
                        }}
                        className="px-3 py-2 hover:bg-[#f6f8fa] cursor-pointer flex items-center gap-2 font-semibold text-[#24292f]"
                      >
                        <FiBook className="w-4 h-4 text-[#57606a]" />
                        <span>{repo.full_name}</span>
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-xs text-[#57606a]">No repositories found</div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-[#57606a] uppercase tracking-wider">
                Templates and forms
              </div>

              <div
                onClick={() => {
                  if (selectedRepo) setStep("form");
                }}
                className="group border border-[#d0d7de] rounded-md p-4 hover:border-[#0969da] hover:bg-[#f6f8fa]/50 cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-[#0969da] group-hover:underline">
                    Blank issue
                  </h4>
                  <p className="text-xs text-[#57606a]">
                    Create a new issue from scratch
                  </p>
                </div>
                <FiArrowRight className="w-4 h-4 text-[#57606a] group-hover:text-[#0969da] group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCreateIssue} className="p-6 space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#24292f]">
                Add a title <span className="text-[#cf222e]">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                className="w-full px-3 py-2 bg-[#f6f8fa] focus:bg-white border border-[#d0d7de] rounded-md text-sm text-[#24292f] shadow-inner focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#24292f]">
                Add a description
              </label>
              <div className="border border-[#d0d7de] rounded-md overflow-hidden bg-white shadow-sm">
                <div className="flex items-center justify-between px-3 py-2 bg-[#f6f8fa] border-b border-[#d0d7de] text-xs text-[#57606a]">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setPreviewMode(false)}
                      className={`px-2 py-1 rounded font-medium flex items-center gap-1 cursor-pointer ${!previewMode ? "bg-white text-[#24292f] shadow-sm border border-[#d0d7de]" : "hover:text-[#24292f]"}`}
                    >
                      <FiEdit3 className="w-3.5 h-3.5" /> Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewMode(true)}
                      className={`px-2 py-1 rounded font-medium flex items-center gap-1 cursor-pointer ${previewMode ? "bg-white text-[#24292f] shadow-sm border border-[#d0d7de]" : "hover:text-[#24292f]"}`}
                    >
                      <FiEye className="w-3.5 h-3.5" /> Preview
                    </button>
                  </div>
                  {!previewMode && (
                    <div className="flex items-center gap-3 text-[#57606a]">
                      <FiBold className="w-3.5 h-3.5 cursor-pointer hover:text-[#24292f]" />
                      <FiItalic className="w-3.5 h-3.5 cursor-pointer hover:text-[#24292f]" />
                      <FiList className="w-3.5 h-3.5 cursor-pointer hover:text-[#24292f]" />
                      <FiCode className="w-3.5 h-3.5 cursor-pointer hover:text-[#24292f]" />
                      <FiLink className="w-3.5 h-3.5 cursor-pointer hover:text-[#24292f]" />
                    </div>
                  )}
                </div>

                {previewMode ? (
                  <div className="p-3 min-h-[160px] text-sm text-[#24292f] bg-white whitespace-pre-wrap">
                    {body || "Nothing to preview"}
                  </div>
                ) : (
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Type your description here..."
                    rows={6}
                    className="w-full p-3 text-sm text-[#24292f] focus:outline-none resize-y"
                  />
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#d0d7de]">
              <button
                type="button"
                onClick={() => setStep("select")}
                className="px-4 py-1.5 text-sm font-medium text-[#57606a] hover:text-[#24292f] bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] rounded-md transition-colors cursor-pointer"
              >
                Back
              </button>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep("select");
                    onClose();
                  }}
                  className="px-4 py-1.5 text-sm font-medium text-[#24292f] bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] rounded-md transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-1.5 text-sm font-semibold text-white bg-[#2da44e] hover:bg-[#2c974b] rounded-md shadow-sm transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Creating..." : "Create"}
                </button>
              </div>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}