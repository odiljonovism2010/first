'use client';

import  { useState, useEffect } from 'react';
import { 
  FiGitPullRequest, 
  FiCheck, 
  FiTag, 
  FiFlag, 
  FiPlus, 
  FiSliders, 
  FiUser, 
  FiFolder, 
  FiMessageSquare, 
  FiUsers, 
  FiArrowDown
} from 'react-icons/fi';

interface PullRequest {
  id: number;
  number: number;
  title: string;
  user: {
    login: string;
  };
  created_at: string;
  state: string;
}

export default function RepoRequest() {
  const owner = 'odiljonovism2010';
  const repo = 'git-diplom';

  const [pulls, setPulls] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'open' | 'closed'>('open');
  const [searchQuery, setSearchQuery] = useState('is:pr is:open');

  useEffect(() => {
    async function fetchPullRequests() {
      setLoading(true);
      try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls?state=${tab}`);
        if (response.ok) {
          const data = await response.json();
          setPulls(data);
        }
      } catch (error) {
        console.error('Failed to fetch pull requests', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPullRequests();
  }, [tab]);

  return (
    <div className="py-5 w-[92%] sm:w-[90%] mx-auto font-sans">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 my-5">
        <div className="flex items-center gap-2 flex-1">
          <button 
            title="Filters" 
            className="p-2 sm:px-3 sm:py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md font-medium text-sm text-[#24292f] hover:bg-[#f3f4f6] flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <FiSliders className="text-sm text-[#57606a]" />
            <span className="hidden sm:inline">Filters</span>
          </button>

          <div className="relative flex-1">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md text-xs sm:text-sm text-[#24292f] focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da]"
            />
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-start gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <button 
              title="Labels" 
              className="p-2 sm:px-3 sm:py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md font-medium text-sm text-[#24292f] hover:bg-[#f3f4f6] flex items-center gap-1.5 cursor-pointer"
            >
              <FiTag className="text-sm text-[#57606a]" />
              <span className="hidden sm:inline">Labels</span> 
              <span className="px-1.5 py-0.2 bg-black/5 rounded-full text-xs">9</span>
            </button>

            <button 
              title="Milestones" 
              className="p-2 sm:px-3 sm:py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md font-medium text-sm text-[#24292f] hover:bg-[#f3f4f6] flex items-center gap-1.5 cursor-pointer"
            >
              <FiFlag className="text-sm text-[#57606a]" />
              <span className="hidden sm:inline">Milestones</span> 
              <span className="px-1.5 py-0.2 bg-black/5 rounded-full text-xs">0</span>
            </button>
          </div>

          <button className="px-3 sm:px-4 py-1.5 bg-[#2da44e] border border-[rgba(27,31,36,0.15)] rounded-md font-medium text-xs sm:text-sm text-white hover:bg-[#2c974b] transition-colors cursor-pointer shadow-sm flex items-center gap-1.5">
            <FiPlus className="text-sm" />
            <span>New <span className="hidden sm:inline">pull request</span></span>
          </button>
        </div>
      </div>

      <div className="border border-[#d0d7de] rounded-md bg-white overflow-hidden">
        <div className="bg-[#f6f8fa] px-4 py-3 border-b border-[#d0d7de] flex items-center justify-between text-sm text-[#57606a]">
          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={() => { setTab('open'); setSearchQuery(`is:pr is:open`); }}
              className={`flex items-center gap-1.5 font-semibold cursor-pointer text-xs sm:text-sm ${tab === 'open' ? 'text-[#24292f]' : 'hover:text-[#24292f]'}`}
            >
              <FiGitPullRequest className={tab === 'open' ? 'text-[#1a7f37]' : ''} /> 
              <span>{pulls.length} <span className="hidden sm:inline">Open</span></span>
            </button>
            <button 
              onClick={() => { setTab('closed'); setSearchQuery(`is:pr is:closed`); }}
              className={`flex items-center gap-1.5 font-semibold cursor-pointer text-xs sm:text-sm ${tab === 'closed' ? 'text-[#24292f]' : 'hover:text-[#24292f]'}`}
            >
              <FiCheck /> Closed
            </button>
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs">
            <span className="cursor-pointer hover:text-[#0969da] flex items-center gap-1"><FiUser size={13}/> Author</span>
            <span className="cursor-pointer hover:text-[#0969da] flex items-center gap-1"><FiTag size={13}/> Label</span>
            <span className="cursor-pointer hover:text-[#0969da] flex items-center gap-1"><FiFolder size={13}/> Projects</span>
            <span className="cursor-pointer hover:text-[#0969da] flex items-center gap-1"><FiFlag size={13}/> Milestones</span>
            <span className="cursor-pointer hover:text-[#0969da] flex items-center gap-1"><FiMessageSquare size={13}/> Reviews</span>
            <span className="cursor-pointer hover:text-[#0969da] flex items-center gap-1"><FiUsers size={13}/> Assignee</span>
            <span className="cursor-pointer hover:text-[#0969da] flex items-center gap-1"><FiArrowDown size={13}/> Sort</span>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-sm text-[#57606a]">Loading pull requests...</div>
        ) : pulls.length > 0 ? (
          <div className="divide-y divide-[#d0d7de]">
            {pulls.map((pr) => (
              <div key={pr.id} className="p-3 sm:p-4 flex items-start gap-3 hover:bg-[#f6f8fa]/60 transition-colors">
                <FiGitPullRequest className="text-[#1a7f37] mt-1 shrink-0 text-base" />
                <div className="space-y-1 min-w-0 flex-1">
                  <a href="#" className="font-semibold text-xs sm:text-sm text-[#24292f] hover:text-[#0969da] block truncate">
                    {pr.title}
                  </a>
                  <p className="text-[11px] sm:text-xs text-[#57606a] truncate">
                    #{pr.number} opened by {pr.user.login}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 sm:p-16 text-center space-y-3">
            <div className="w-10 h-10 mx-auto text-[#57606a] flex items-center justify-center">
              <FiGitPullRequest className="text-3xl" />
            </div>
            <h3 className="font-semibold text-lg sm:text-xl text-[#24292f]">There aren’t any open pull requests.</h3>
            <p className="text-xs text-[#57606a]">
              You could search <a href="#" className="text-[#0969da] hover:underline">all of GitHub</a> or try an <a href="#" className="text-[#0969da] hover:underline">advanced search</a>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}