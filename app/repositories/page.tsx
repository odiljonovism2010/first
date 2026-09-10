'use client'
import Link from "next/link";
import { useState, useEffect } from "react"
import { GoSearch } from "react-icons/go";

interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  private: boolean;
  updated_at: string;
  html_url: string;
}

const Repositories = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Состояния для пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRepos, setTotalRepos] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchReposAndProfile = async () => {
      setLoading(true);
      try {
        const username = localStorage.getItem("github_user") || "odiljonovism2010";

        const userResponse = await fetch(`https://api.github.com/users/${username}`, {
          headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}` },
        });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setTotalRepos(userData.public_repos || 0);
        }

        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=${itemsPerPage}&page=${currentPage}`,
          {
            headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}` },
            cache: "no-store",
          }
        );

        if (!reposResponse.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const data: Repo[] = await reposResponse.json();
        setRepos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReposAndProfile();
  }, [currentPage]);

  const totalPages = Math.ceil(totalRepos / itemsPerPage) || 1;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getLanguageColor = (lang: string | null) => {
    if (!lang) return 'bg-gray-400';
    const colors: { [key: string]: string } = {
      JavaScript: 'bg-[#f1e05a]',
      TypeScript: 'bg-[#3178c6]',
      HTML: 'bg-[#e34c26]',
      CSS: 'bg-[#563d7c]',
      Python: 'bg-[#3572A5]',
    };
    return colors[lang] || 'bg-gray-400';
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      const isNearCurrent = Math.abs(i - currentPage) <= 1;
      const isEdge = i === 1 || i === totalPages;

      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-2.5 sm:px-3 py-1.5 mx-0.5 sm:mx-1 text-xs sm:text-sm rounded-lg transition-colors ${
            currentPage === i
              ? "bg-[#0969da] text-white font-semibold"
              : `text-[#24292f] hover:bg-gray-100 ${!isNearCurrent && !isEdge ? "hidden sm:inline-block" : "inline-block"}`
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;

  return (
    <div className="w-full sm:w-[92%] lg:w-[85%] h-full sm:h-[85%] mx-auto p-3 sm:p-6 font-sans antialiased text-[#1f2328] flex flex-col justify-start">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5 flex-shrink-0">
        <h1 className="text-xl sm:text-3xl font-semibold text-[#1f2328] tracking-tight">
          My repositories
        </h1>
        <Link href={'/newrepo'}className="bg-[#1f883d] hover:bg-[#1a7f37] text-white px-4 py-2 rounded-md text-[14px] font-semibold shadow-sm transition text-center">
          New repository
        </Link>
      </div>

      <div className="flex items-center w-full border border-[#d0d7de] rounded-md bg-white overflow-hidden mb-4 sm:mb-6 text-[13px] sm:text-[15px] flex-shrink-0">
        <div className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 flex items-center bg-white gap-2">
          <span className="text-[12px] sm:text-sm text-[#8250df] bg-[#8250df]/10 px-1.5 py-0.5 rounded font-mono flex-shrink-0">
            owner:@me
          </span>
          <input 
            type="text" 
            className="w-full text-[13px] sm:text-sm outline-none bg-transparent" 
            placeholder="Find a repository..." 
          />
        </div>
        <div className="border-l border-[#d0d7de] px-3 sm:px-4 py-3 bg-[#f6f8fa] flex items-center justify-center cursor-pointer text-[#57606a] hover:text-[#1f2328] transition-colors">
          <GoSearch size={18} />
        </div>
      </div>

      <div className="border border-[#d0d7de] rounded-md bg-white shadow-sm flex flex-col overflow-hidden flex-1">
        <div className="flex justify-between items-center px-4 sm:px-5 py-3 sm:py-4 bg-[#f6f8fa] border-b border-[#d0d7de] text-[14px] sm:text-[15px] flex-shrink-0">
          <span className="font-semibold">{totalRepos} repositories</span>
          <button className="flex items-center gap-1 border border-[#d0d7de] px-3 py-1 bg-white rounded-md font-medium text-xs hover:bg-[#f3f4f6]">
            Sort: Relevance <span className="text-[10px]">▼</span>
          </button>
        </div>

        <div className="divide-y divide-[#d0d7de] overflow-y-auto flex-1">
          {repos.map((repo) => (
            <div key={repo.id} className="p-4 sm:p-5 flex justify-between items-center hover:bg-[#f6f8fa]/30 transition-colors">
              <div className="flex flex-col gap-1.5 w-full sm:max-w-[70%]">
                <div className="flex items-center gap-2 flex-wrap">
                  <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-[16px] sm:text-[20px] font-semibold text-[#0969da] hover:underline break-all">
                    {repo.full_name}
                  </a>
                  <span className="text-[11px] sm:text-xs font-medium text-[#57606a] border border-[#d0d7de] px-2 py-0.5 rounded-full bg-white">
                    {repo.private ? 'Private' : 'Public'}
                  </span>
                </div>

                {repo.description && (
                  <p className="text-[13px] sm:text-sm text-[#57606a] mt-1 pr-2 sm:pr-4 line-clamp-2">{repo.description}</p>
                )}

                <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-[#57606a] mt-2 flex-wrap">
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${getLanguageColor(repo.language)}`}></span>
                      <span>{repo.language}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#57606a]" fill="currentColor" viewBox="0 0 16 16"><path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h1.5v2.128a2.251 2.251 0 1 0 1.5 0V8.5h1.5A2.25 2.25 0 0 0 12.5 6.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25v-.878zM12.5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z"/></svg>
                    <span>{repo.forks_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#57606a]" fill="currentColor" viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694z"/></svg>
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <span>Updated {formatDate(repo.updated_at)}</span>
                </div>
              </div>

              <div className="w-[155px] h-[30px] hidden md:block opacity-80 flex-shrink-0">
                <svg className="w-full h-full" viewBox="0 0 155 30" fill="none">
                  <path d="M0 25 C30 25, 60 22, 90 22 C120 22, 140 15, 155 15" stroke="#2da44e" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          ))}

          {repos.length === 0 && (
            <div className="p-8 text-center text-sm text-gray-500">
              No repositories found.
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center mt-4 sm:mt-6 py-2 select-none flex-shrink-0">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className={`flex items-center text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 transition-colors ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-[#0969da] hover:bg-gray-100 rounded-lg"
          }`}
        >
          <span className="mr-1">&lt;</span> Prev
        </button>

        <div className="flex items-center mx-1 sm:mx-2">
          {renderPageNumbers()}
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className={`flex items-center text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 transition-colors ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-[#0969da] hover:bg-gray-100 rounded-lg"
          }`}
        >
          Next <span className="ml-1">&gt;</span>
        </button>
      </div>
    </div>
  )
}

export default Repositories;