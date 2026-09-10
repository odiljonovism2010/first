"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FiMessageSquare, 
  FiGlobe, 
  FiPlus, 
  FiArrowRight, 
  FiCpu, 
  FiEdit3, 
  FiGitBranch, 
  FiGitPullRequest, 
  FiChevronDown,
  FiSearch,
  FiFolder,
  FiMoreHorizontal,
  FiExternalLink
} from "react-icons/fi";
import { FiBookmark } from "react-icons/fi";
interface GitHubProfile {
  avatar_url: string;
  name: string | null;
  login: string;
  bio: string | null;
  public_repos: number;
  followers: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  updated_at: string;
}

interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    action?: string;
    description?: string | null;
    ref_type?: string;
    commits?: Array<{
      sha: string;
      message: string;
    }>;
  };
}

export default function DashboardPage() {
  const [username, setUsername] = useState("");

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [activeScope] = useState("All repositories");
  const [data, setData] = useState<{ 
    profile: GitHubProfile; 
    repos: GitHubRepo[]; 
    events: GitHubEvent[] 
  } | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("github_user");

    if (!username) {
      router.replace("/");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    };

    Promise.all([
      axios.get<GitHubProfile>(
        `https://api.github.com/users/${encodeURIComponent(username)}`,
        config
      ),
      axios.get<GitHubRepo[]>(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos`,
        config
      ),
      axios.get<GitHubEvent[]>(
        `https://api.github.com/users/${encodeURIComponent(username)}/events`,
        config
      ),
    ])
      .then(([profileRes, reposRes, eventsRes]) => {
        setData({
          profile: profileRes.data,
          repos: reposRes.data,
          events: eventsRes.data,
        });
      })
      .catch((err) => {
        const status = err.response?.status;          
         if (status) {
  }
        if (err.response?.status === 401) {
          setError("401 Unauthorized. Проверь GitHub Token.");
        } else if (err.response?.status === 403) {
          setError("403 Forbidden. Возможно превышен rate limit.");
        } else {
          setError(err.response?.data?.message || err.message);
        }
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("github_user");
    router.replace("/git-registration");
  };

  const formatEventAction = (type: string, payload: any) => {
    switch (type) {
      case "PushEvent":
        return `pushed to repository`;
      case "CreateEvent":
        return `created a ${payload.ref_type || "repository"}`;
      case "WatchEvent":
        return `starred a repository`;
      case "IssuesEvent":
        return `${payload.action || "opened"} an issue in`;
      case "PullRequestEvent":
        return `${payload.action || "opened"} a pull request in`;
      default:
        return `performed an action in`;
    }
  };

useEffect(() => {
  const savedUser = localStorage.getItem("github_user");
  if (savedUser) {
    setUsername(savedUser);
  }
}, []);
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
    } catch {
      return "recently";
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <p className="text-red-500 font-bold text-lg mb-4 text-center max-w-md">{error}</p>
        <button onClick={handleLogout} className="px-5 py-2.5 bg-gray-950 text-white rounded-lg transition hover:bg-gray-800 text-sm font-medium shadow-sm">
          Назад
        </button>
      </div>
    );
  }

 
  if (!data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-500 font-medium text-lg">
        Загрузка данных...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased flex flex-col">
      <div className="flex-1 w-full justify-between max-w-full flex flex-col xl:flex-row p-6 sm:p-8 gap-8">
        
        <aside className="w-full xl:w-[320px] flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-gray-900">Top repositories</h2>
            <Link href={'/newrepo'} className="bg-[#1f883d] hover:bg-[#1a7732] text-white text-sm font-semibold px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer">
              <FiBookmark className="w-3.5 h-3.5" /> New
            </Link>
          </div>
          
          <div className="relative mb-5">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              value={search}  
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find a repository..." 
              className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
            />
          </div>

          <ul className="space-y-3">
            {data.repos
              .filter((repo) => repo.name.toLowerCase().includes(search.toLowerCase()))
              .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
              .slice(0, 8)
              .map((repo) => (
                <li key={repo.id} className="flex items-center gap-3 text-sm text-gray-800 truncate py-0.5">
                  <img 
                    src={data.profile.avatar_url} 
                    alt="" 
                    className="w-5 h-5 rounded-full flex-shrink-0 border border-gray-200 object-cover"
                  />
                  <Link 
href={`/${encodeURIComponent(username)}/repository/${encodeURIComponent(repo.name)}`}
                    className="hover:underline font-medium truncate text-gray-900"
                    onClick={() => {
                      localStorage.setItem("last_repo", repo.name);
                    }}
                  >
                    {repo.name}
                  </Link>
                </li>
              ))}
          </ul>
          <Link href={'/repositories'} className="text-xs font-semibold text-gray-500 hover:text-blue-600 inline-block cursor-pointer mt-5 transition-colors">
            Show more →
          </Link>
        </aside>

        <main className="flex-1 max-w-full xl:max-w-[850px]">
          <div className="w-full flex flex-col gap-4 font-sans">
            <h1 className="text-2xl font-semibold text-[#24292f]">Home</h1>

            <div className="w-full bg-white border border-[#d0d7de] rounded-xl p-4 shadow-sm hover:border-[#8c959f] transition-all duration-200">
              
              <div className="relative mb-4">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask anything or type @ to add context"
                  rows={4}
                  className="w-full bg-transparent text-[#24292f] placeholder-[#8c959f] text-sm focus:outline-none resize-none px-1 py-1"
                />
              </div>

     
              <div className="w-full h-[1px] bg-[#d0d7de]/60 mb-3" />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] rounded-full text-xs font-medium text-[#24292f] transition-colors shadow-xs">
                    <FiMessageSquare className="w-3.5 h-3.5 text-[#57606a]" />
                    <span>Ask</span>
                    <FiChevronDown className="w-3 h-3 text-[#57606a]" />
                  </button>

                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] rounded-full text-xs font-medium text-[#24292f] transition-colors shadow-xs">
                    <FiGlobe className="w-3.5 h-3.5 text-[#0969da]" />
                    <span>{activeScope}</span>
                    <FiChevronDown className="w-3 h-3 text-[#57606a]" />
                  </button>

                  <button 
                    title="Add context"
                    className="w-7 h-7 flex items-center justify-center bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] rounded-full text-[#57606a] hover:text-[#24292f] transition-colors shadow-xs cursor-pointer"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center">
                  <button 
                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                      query.trim() 
                        ? "bg-[#2da44e] text-white hover:bg-[#2c974b] shadow-xs cursor-pointer" 
                        : "bg-[#f6f8fa] text-[#8c959f] border border-[#d0d7de] cursor-not-allowed"
                    }`}
                  >
                    <FiArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-[#d0d7de]/40">
                <button className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-[#f6f8fa] border border-[#d0d7de] rounded-full text-xs font-medium text-[#24292f] transition-colors shadow-xs">
                  <FiCpu className="w-3.5 h-3.5 text-[#8250df]" />
                  <span>Agent</span>
                </button>

                <button className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-[#f6f8fa] border border-[#d0d7de] rounded-full text-xs font-medium text-[#24292f] transition-colors shadow-xs">
                  <span className="text-[#bf8700]">✨</span>
                  <span>Create issue</span>
                </button>

                <button className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-[#f6f8fa] border border-[#d0d7de] rounded-full text-xs font-medium text-[#24292f] transition-colors shadow-xs">
                  <FiEdit3 className="w-3.5 h-3.5 text-[#0969da]" />
                  <span>Write code</span>
                </button>

                <button className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-[#f6f8fa] border border-[#d0d7de] rounded-full text-xs font-medium text-[#24292f] transition-colors shadow-xs">
                  <FiGitBranch className="w-3.5 h-3.5 text-[#218bff]" />
                  <span>Git</span>
                </button>

                <button className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-[#f6f8fa] border border-[#d0d7de] rounded-full text-xs font-medium text-[#24292f] transition-colors shadow-xs">
                  <FiGitPullRequest className="w-3.5 h-3.5 text-[#1f883d]" />
                  <span>Pull requests</span>
                </button>
              </div>

            </div>
          </div>

          <div className="flex justify-between items-center mb-4 mt-6">
            <h3 className="text-base font-semibold text-gray-900">Feed</h3>
           
          </div>

          <div className="space-y-5">
            {data.events.length === 0 ? (
              <div className="text-center py-10 border border-gray-200 rounded-xl text-gray-400 text-sm">
                No recent activity found in this account.
              </div>
            ) : (
              data.events.slice(0, 8).map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5 text-sm text-gray-500">
                      <img src={data.profile.avatar_url} alt="" className="w-6 h-6 rounded-full border border-gray-100 object-cover" />
                      <span className="font-semibold text-gray-900 text-base">{data.profile.name || data.profile.login}</span> 
                      <span>{formatEventAction(event.type, event.payload)}</span>
                      <span className="text-xs text-gray-400">• {formatDate(event.created_at)}</span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 p-1 rounded-md transition-colors">
                      <FiMoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="border border-gray-200 bg-gray-50/50 rounded-xl p-5 flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2.5">
                        <FiFolder className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <a 
                          href={`https://github.com/${event.repo.name}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-base font-bold text-gray-900 hover:underline truncate"
                        >
                          {event.repo.name}
                        </a>
                      </div>

                      {event.type === "PushEvent" && event.payload.commits && (
                        <div className="mt-2 space-y-1 bg-white p-2.5 rounded-lg border border-gray-100">
                          {event.payload.commits.slice(0, 2).map((commit, cIdx) => (
                            <p key={cIdx} className="text-xs text-gray-600 font-mono truncate">
                              <span className="text-blue-500 font-semibold mr-1">{commit.sha.substring(0, 7)}</span> 
                              {commit.message}
                            </p>
                          ))}
                        </div>
                      )}

                      {event.payload.description && (
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{event.payload.description}</p>
                      )}
                    </div>
                    
                    <a 
                      href={`https://github.com/${event.repo.name}`}
                      target="_blank"
                      rel="noreferrer"
                      className="border border-gray-200 rounded-lg px-3.5 py-1.5 text-sm font-semibold bg-white hover:bg-gray-50 flex items-center gap-1.5 shadow-sm flex-shrink-0 w-full sm:w-auto justify-center transition-colors"
                    >
                      View <FiExternalLink className="w-3.5 h-3.5 text-gray-500" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>

        <aside className="w-full xl:w-[340px] flex-shrink-0">
          <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4 tracking-wide">Latest from our changelog</h3>
            <ul className="relative border-l border-gray-200 pl-5 space-y-5 text-sm text-gray-700">
              <li className="relative">
                <span className="absolute -left-[25.5px] top-1.5 w-3 h-3 rounded-full bg-gray-300 border-2 border-white" />
                <span className="text-xs text-gray-400 block mb-1">2 days ago</span>
                <a href="#" className="hover:text-blue-600 font-medium leading-normal line-clamp-3 transition-colors">
                  Improved accuracy and coverage in Copilot usage metrics reports
                </a>
              </li>
              <li className="relative">
                <span className="absolute -left-[25.5px] top-1.5 w-3 h-3 rounded-full bg-gray-300 border-2 border-white" />
                <span className="text-xs text-gray-400 block mb-1">4 days ago</span>
                <a href="#" className="hover:text-blue-600 font-medium leading-normal line-clamp-3 transition-colors">
                  Upcoming deprecation of Gemini 2.5 Pro and Gemini 3 Flash
                </a>
              </li>
            </ul>
            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 font-semibold mt-5 block pt-3 border-t border-gray-100 transition-colors">
              View changelog →
            </a>
          </div>
        </aside>

      </div>
    </div>
  );
}