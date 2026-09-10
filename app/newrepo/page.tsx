"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  FiChevronDown, 
  FiCheck, 
  FiAlertCircle, 
  FiLoader 
} from "react-icons/fi";

export default function CreateRepositoryPage() {
  const router = useRouter();

  const [username, setUsername] = useState<string>("odiljonovism2010");
  const [avatarUrl, setAvatarUrl] = useState<string>("https://github.com/odiljonovism2010.png");

  const [repoName, setRepoName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  
  const [addReadme, setAddReadme] = useState<boolean>(false);
  const [gitIgnore, setGitIgnore] = useState<string>("No .gitignore");
  const [license, setLicense] = useState<string>("No license");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("github_user");
    if (storedUser) {
      setUsername(storedUser);
      setAvatarUrl(`https://github.com/${storedUser}.png`);
    }
  }, []);

  const isValidName = repoName.trim().length > 0;
  const showNameError = isTouched && !isValidName;

  const handleCreateRepository = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsTouched(true);

    if (!isValidName) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const trimmedRepoName = repoName.trim();
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

    if (!token) {
      setErrorMessage("GitHub token not found in environment variables (NEXT_PUBLIC_GITHUB_TOKEN).");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("https://api.github.com/user/repos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedRepoName,
          description: description.trim() || undefined,
          private: isPrivate,
          auto_init: addReadme,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create repository on GitHub.");
      }

      localStorage.setItem("last-repo", trimmedRepoName);
      localStorage.setItem("last-repo", 'Code');

      setSuccessMessage("Repository successfully created! Redirecting...");
      setTimeout(() => {
        router.push(`/${username}/repository/${trimmedRepoName}`);
      }, 1200);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#24292f] font-sans antialiased py-8 px-4 sm:px-8">
      <div className="max-w-[1012px] mx-auto space-y-6">
        
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-normal text-[#24292f]">Create a new repository</h1>
          <p className="text-sm text-gray-600 mt-1">
            Repositories contain a project&apos;s files and version history. Have a project elsewhere?{" "}
            <a href="#" className="text-[#0969da] hover:underline">Import a repository</a>.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Required fields are marked with an asterisk (*).
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700 flex items-center gap-2">
            <FiAlertCircle className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-700 flex items-center gap-2">
            <FiCheck className="shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleCreateRepository} className="space-y-6">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-800 text-xs font-semibold">
                1
              </span>
              <h2 className="text-base font-semibold text-[#24292f]">General</h2>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#24292f] mb-1">
                  Owner *
                </label>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f6f8fa] border border-gray-300 rounded-md text-sm text-[#24292f] shadow-sm">
                  <img
                    src={avatarUrl}
                    alt={username}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="font-semibold">{username}</span>
                  <FiChevronDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>

              <span className="hidden md:inline text-xl text-gray-400 mt-6">/</span>

              <div className="flex-1 w-full">
                <label className="block text-xs font-semibold text-[#24292f] mb-1">
                  Repository name *
                </label>
                <input
                  type="text"
                  required
                  value={repoName}
                  onChange={(e) => {
                    setRepoName(e.target.value);
                    if (!isTouched) setIsTouched(true);
                  }}
                  className={`w-full px-3 py-1.5 text-sm bg-white border rounded-md shadow-sm focus:outline-none focus:ring-1 text-[#24292f] transition-colors ${
                    showNameError 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                      : "border-gray-300 focus:border-[#0969da] focus:ring-[#0969da]"
                  }`}
                />
              </div>
            </div>

            {showNameError && (
              <p className="text-xs text-red-600">Repository name cannot be empty.</p>
            )}

            <p className="text-xs text-gray-600">
              Great repository names are short and memorable. How about <span className="text-[#0969da] font-medium cursor-pointer hover:underline" onClick={() => setRepoName("fluffy-tribble")}>fluffy-tribble</span>?
            </p>

            <div>
              <label className="block text-xs font-semibold text-[#24292f] mb-1">
                Description <span className="font-normal text-gray-500">(optional)</span>
              </label>
              <textarea
                rows={1}
                maxLength={350}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f] resize-none"
              />
              <span className="block text-[11px] text-gray-500 text-right mt-1">
                {description.length} / 350 characters
              </span>
            </div>
          </div>

          <hr className="border-gray-200" />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-800 text-xs font-semibold">
                2
              </span>
              <h2 className="text-base font-semibold text-[#24292f]">Configuration</h2>
            </div>

            <div className="border border-gray-300 rounded-md bg-[#f6f8fa] divide-y divide-gray-300 w-full">
              
              <div className="p-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-[#24292f]">Choose visibility *</h4>
                  <p className="text-xs text-gray-600">Choose who can see and commit to this repository</p>
                </div>
                
                <div className="relative">
                  <select
                    value={isPrivate ? "Private" : "Public"}
                    onChange={(e) => setIsPrivate(e.target.value === "Private")}
                    className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1.5 pr-8 text-xs font-medium text-[#24292f] shadow-sm focus:outline-none focus:border-[#0969da] cursor-pointer"
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <FiChevronDown className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-[#24292f]">Add README</h4>
                  <p className="text-xs text-gray-600">
                    READMEs can be used as longer descriptions. <a href="#" className="text-[#0969da] hover:underline">About READMEs</a>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 font-medium">{addReadme ? "On" : "Off"}</span>
                  <button
                    type="button"
                    onClick={() => setAddReadme(!addReadme)}
                    className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                      addReadme ? "bg-[#2ea043]" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        addReadme ? "translate-x-5" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-[#24292f]">Add .gitignore</h4>
                  <p className="text-xs text-gray-600">.gitignore tells git which files not to track. <a href="#" className="text-[#0969da] hover:underline">About ignoring files</a></p>
                </div>
                <select
                  value={gitIgnore}
                  onChange={(e) => setGitIgnore(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-[#0969da] text-[#24292f] cursor-pointer"
                >
                  <option>No .gitignore</option>
                  <option>Node</option>
                  <option>Python</option>
                  <option>React</option>
                </select>
              </div>

              {/* License Select */}
              <div className="p-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-[#24292f]">Add license</h4>
                  <p className="text-xs text-gray-600">Licenses explain how others can use your code. <a href="#" className="text-[#0969da] hover:underline">About licenses</a></p>
                </div>
                <select
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-[#0969da] text-[#24292f] cursor-pointer"
                >
                  <option>No license</option>
                  <option>MIT License</option>
                  <option>Apache License 2.0</option>
                  <option>GNU General Public v3.0</option>
                </select>
              </div>

            </div>
          </div>

          <hr className="border-gray-200" />

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-[#2ea043] hover:bg-[#2c974b] active:bg-[#298e3d] text-white font-medium text-sm rounded-md shadow-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading && <FiLoader className="w-4 h-4 animate-spin" />}
              <span>Create repository</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}