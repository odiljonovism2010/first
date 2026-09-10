'use client';

import { FiChevronDown } from 'react-icons/fi';

export default function PagesSetting() {
  return (
    <div>
      <h2 className="text-2xl font-normal pb-4 border-b border-[#d0d7de]">
        GitHub Pages
      </h2>

      <div className="mt-4 space-y-6">
        <p className="text-xs text-[#57606a] leading-relaxed">
          <a href="#" className="text-[#0969da] hover:underline">GitHub Pages</a> is designed to host your personal, organization, or project pages from a GitHub repository.
        </p>

        <div className="space-y-4 pt-2">
          <h3 className="font-semibold text-base text-[#24292f]">Build and deployment</h3>
          
          <div className="space-y-2">
            <label className="block font-semibold text-xs text-[#24292f]">Source</label>
            <button className="px-3 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md font-medium text-sm text-[#24292f] hover:bg-[#f3f4f6] active:bg-[#edeff2] transition-colors flex items-center justify-between w-48 cursor-pointer shadow-sm">
              <span>Deploy from a branch</span>
              <FiChevronDown className="text-sm text-[#57606a]" />
            </button>
          </div>

          <div className="space-y-2 pt-2">
            <label className="block font-semibold text-xs text-[#24292f]">Branch</label>
            <p className="text-xs text-[#57606a] leading-relaxed">
              GitHub Pages is currently disabled. Select a source below to enable GitHub Pages for this repository.{' '}
              <a href="#" className="text-[#0969da] hover:underline">Learn more about configuring the publishing source for your site.</a>
            </p>
            <div className="flex items-center gap-3 pt-1">
              <button className="px-3 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md font-medium text-sm text-[#24292f] hover:bg-[#f3f4f6] active:bg-[#edeff2] transition-colors flex items-center justify-between w-24 cursor-pointer shadow-sm">
                <span>None</span>
                <FiChevronDown className="text-sm text-[#57606a]" />
              </button>
              <button className="px-4 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md font-medium text-sm text-[#24292f] hover:bg-[#f3f4f6] active:bg-[#edeff2] transition-colors cursor-pointer">
                Save
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#d0d7de] space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-base text-[#24292f]">Visibility</h3>
            <span className="px-2 py-0.5 text-xs font-medium text-[#8250df] bg-[#fbefff] border border-[#d8b9ff] rounded-full">
              GitHub Enterprise
            </span>
          </div>
          <p className="text-xs text-[#57606a] leading-relaxed">
            With a GitHub Enterprise account, you can restrict access to your GitHub Pages site by publishing it privately. You can use privately published sites to share your internal documentation or knowledge base with members of your enterprise. You can try GitHub Enterprise risk-free for 30 days.{' '}
            <a href="#" className="text-[#0969da] hover:underline">Learn more about the visibility of your GitHub Pages site.</a>
          </p>
          <div>
            <button className="px-4 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md font-medium text-sm text-[#24292f] hover:bg-[#f3f4f6] active:bg-[#edeff2] transition-colors cursor-pointer shadow-sm">
              Start free for 30 days
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}