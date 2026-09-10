'use client';

import { FiGitPullRequest } from 'react-icons/fi';

export default function BranchesSetting() {
  return (
    <div className="w-full">
      <h2 className="text-xl sm:text-2xl font-normal pb-4 border-b border-[#d0d7de]">
        Branch protection rules
      </h2>

      <div className="mt-6 border border-[#d0d7de] rounded-md p-4 sm:p-6 bg-white flex flex-col sm:flex-row items-start gap-4">
        <div className="p-2 bg-[#ddf4ff] text-[#0969da] rounded-md shrink-0">
          <FiGitPullRequest className="text-xl" />
        </div>

        <div className="space-y-3 w-full">
          <h3 className="font-semibold text-base text-[#24292f]">
            Classic branch protections have not been configured
          </h3>
          <p className="text-xs text-[#57606a] leading-relaxed">
            Define branch rules to disable force pushing, prevent branches from being deleted, or require pull requests before merging. Learn more about{' '}
            <a href="#" className="text-[#0969da] hover:underline">repository rules</a> and{' '}
            <a href="#" className="text-[#0969da] hover:underline">protected branches</a>.
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button className="px-4 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md font-medium text-sm hover:bg-[#f3f4f6] active:bg-[#edeff2] transition-colors cursor-pointer text-[#24292f] text-center">
              Add branch ruleset
            </button>
            <button className="font-medium text-sm text-[#0969da] hover:underline cursor-pointer text-center sm:text-left">
              Add classic branch protection rule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}