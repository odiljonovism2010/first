import { GoSearch } from "react-icons/go";
import { useEffect, useState } from "react";

interface SearchResultItem {
  id: number;
  name?: string; 
  full_name?: string; 
  login?: string; 
  html_url: string;
  avatar_url?: string; 
  description?: string; 
}

const Search = () => {
  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ repositories: SearchResultItem[]; users: SearchResultItem[] }>({
    repositories: [],
    users: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ repositories: [], users: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const headers: HeadersInit = {
          Accept: "application/vnd.github.v3+json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const [repoRes, userRes] = await Promise.all([
          fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&per_page=5`, { headers }),
          fetch(`https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=5`, { headers }),
        ]);

        if (!repoRes.ok || !userRes.ok) {
          throw new Error("Ошибка при запросе к GitHub API");
        }

        const repoData = await repoRes.json();
        const userData = await userRes.json();

        setResults({
          repositories: repoData.items || [],
          users: userData.items || [],
        });
      } catch (err: any) {
        setError(err.message || "Произошла ошибка");
      } finally {
        setLoading(false);
      }
    }, 400); // Debounce

    return () => clearTimeout(timer);
  }, [query, token]);

  return (
    <>
      <div
        className="hidden md:flex items-center bg-white border border-[#d0d7de] rounded-md px-2.5 py-1 w-64 justify-between text-[#57606a] cursor-pointer hover:bg-[#f6f8fa] transition h-8"
        onClick={() => setModal(true)}
      >
        <div className="flex items-center gap-2 text-xs">
          <GoSearch size={14} />
          <span>
            Type{" "}
            <span className="border border-[#d0d7de] px-1 rounded bg-[#f6f8fa] text-[10px] font-mono">
              /
            </span>{" "}
            to search
          </span>
        </div>
      </div>

      {modal && (
        <div
          className="fixed inset-0 z-[9999] flex items-start justify-center pt-3"
          onClick={() => setModal(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-[75%] max-w-[95%] bg-white rounded-xl border border-[#d0d7de] shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-[#d8dee4]">
              <div className="relative">
                <GoSearch
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#656d76]"
                />

                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search repositories and users..."
                  className="w-full h-11 pl-10 pr-4 text-sm border border-[#d0d7de] rounded-md outline-none focus:border-[#0969da] focus:ring-2 focus:ring-[#0969da]/20"
                />
              </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto p-4">
              {loading ? (
                <div className="py-12 text-center text-sm text-[#656d76]">Поиск...</div>
              ) : error ? (
                <div className="py-12 text-center text-sm text-red-500">{error}</div>
              ) : !query.trim() ? (
                <div className="py-12 text-center text-sm text-[#656d76]">
                  Введите запрос для поиска репозиториев и пользователей...
                </div>
              ) : results.repositories.length === 0 && results.users.length === 0 ? (
                <div className="py-12 text-center text-sm text-[#656d76]">Ничего не найдено</div>
              ) : (
                <div className="space-y-6">
                  {results.repositories.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-[#57606a] uppercase tracking-wider mb-2">
                        Repositories
                      </h3>
                      <div className="space-y-1">
                        {results.repositories.map((repo) => (
                          <a
                            key={repo.id}
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-2 rounded-md hover:bg-[#f6f8fa] transition text-sm"
                          >
                            <div>
                              <span className="font-semibold text-[#0969da]">{repo.full_name}</span>
                              {repo.description && (
                                <p className="text-xs text-[#57606a] truncate max-w-lg mt-0.5">
                                  {repo.description}
                                </p>
                              )}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {results.users.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-[#57606a] uppercase tracking-wider mb-2">
                        Users
                      </h3>
                      <div className="space-y-1">
                        {results.users.map((user) => (
                          <a
                            key={user.id}
                            href={user.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-[#f6f8fa] transition text-sm"
                          >
                            {user.avatar_url && (
                              <img
                                src={user.avatar_url}
                                alt={user.login}
                                className="w-6 h-6 rounded-full"
                              />
                            )}
                            <span className="font-medium text-[#24292f]">{user.login}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;