'use client';

import { FiEdit2 } from 'react-icons/fi';

interface GeneralSettingProps {
  message: string;
  newRepoName: string;
  setNewRepoName: (value: string) => void;
  handleRename: () => void;
  saving: boolean;
  isTemplate: boolean;
  setIsTemplate: (value: boolean) => void;
  defaultBranch: string;
}

export default function GeneralSetting({
  message,
  newRepoName,
  setNewRepoName,
  handleRename,
  saving,
  isTemplate,
  setIsTemplate,
  defaultBranch,
}: GeneralSettingProps) {
  return (
    <>
      <div className="w-full">
        <h2 className="text-xl sm:text-2xl font-normal pb-4 border-b border-[#d0d7de]">General</h2>

        {message && (
          <div className="p-3 my-4 bg-[#dafbe1] border border-[#2ea043] text-[#116329] rounded-md text-sm">
            {message}
          </div>
        )}

        {/* Repository name */}
        <div className="space-y-3 py-6 border-b border-[#d0d7de]">
          <label className="block font-semibold text-sm">Repository name</label>
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <input 
              type="text" 
              value={newRepoName} 
              onChange={(e) => setNewRepoName(e.target.value)}
              className="px-3 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md w-full sm:w-80 text-sm focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da]"
            />
            <button 
              onClick={handleRename}
              disabled={saving}
              className="px-4 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md font-medium text-sm hover:bg-[#f3f4f6] active:bg-[#edeff2] transition-colors cursor-pointer shrink-0"
            >
              {saving ? 'Renaming...' : 'Rename'}
            </button>
          </div>
        </div>

        <div className="flex items-start gap-3 py-6 border-b border-[#d0d7de]">
          <input 
            type="checkbox" 
            checked={isTemplate} 
            onChange={(e) => setIsTemplate(e.target.checked)}
            className="mt-1 w-4 h-4 accent-[#0969da] border-[#d0d7de] rounded cursor-pointer shrink-0"
          />
          <div>
            <label className="font-semibold text-sm cursor-pointer">Template repository</label>
            <p className="text-xs text-[#57606a] mt-0.5 leading-relaxed">
              Template repositories let users generate new repositories with the same directory structure and files.{' '}
              <a href="#" className="text-[#0969da] hover:underline">Learn more about template repositories.</a>
            </p>
          </div>
        </div>

        <div className="space-y-3 py-6 border-b border-[#d0d7de]">
          <h3 className="font-semibold text-base">Default branch</h3>
          <p className="text-xs text-[#57606a] leading-relaxed">
            The default branch is considered the “base” branch in your repository, against which all pull requests and code commits are automatically made, unless you specify a different branch.
          </p>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md text-sm font-mono text-[#24292f] flex items-center gap-2 truncate">
              {defaultBranch}
            </div>
            <button className="p-2 bg-[#f6f8fa] border border-[#d0d7de] rounded-md hover:bg-[#f3f4f6] cursor-pointer shrink-0">
              <FiEdit2 className="text-sm text-[#57606a]" />
            </button>
          </div>
        </div>

        <div className="space-y-4 py-6 border-b border-[#d0d7de]">
          <h3 className="font-semibold text-base">Releases</h3>
          <div className="flex items-start gap-3">
            <input 
              type="checkbox" 
              id="release-immutability"
              className="mt-1 w-4 h-4 accent-[#0969da] border-[#d0d7de] rounded cursor-pointer shrink-0"
            />
            <div>
              <label htmlFor="release-immutability" className="font-semibold text-sm cursor-pointer">
                Enable release immutability
              </label>
              <p className="text-xs text-[#57606a] mt-0.5 leading-relaxed">
                Disallow assets and tags from being modified once a release is published.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-6">
          <h3 className="font-semibold text-base">Social preview</h3>
          <p className="text-xs text-[#57606a] leading-relaxed">
            Upload an image to customize your repository’s social preview.
          </p>
          <p className="text-xs text-[#57606a] leading-relaxed">
            Images should be at least 640×320px (1280×640px for best display). <a href="#" className="text-[#0969da] hover:underline">Download template</a>
          </p>
          <button className="px-4 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md font-medium text-sm hover:bg-[#f3f4f6] flex items-center gap-2 cursor-pointer">
            <FiEdit2 /> Edit
          </button>
        </div>
      </div>
    </>
  );
}