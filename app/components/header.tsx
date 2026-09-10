"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { notFound } from "next/navigation";


const Header = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("github_user");
    if (savedUser) {
      setUsername(savedUser);
      
      axios
        .get(`https://api.github.com/users/${encodeURIComponent(savedUser)}`)
        .then((res) => setAvatarUrl(res.data.avatar_url))
        .catch((err) => console.error(err))
        .finally(() => setIsLoaded(true));
    } else {
      setIsLoaded(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("github_user");
    setUsername(null);
    setAvatarUrl(null);
    window.location.href = "/";
  };

  return (
    <header className="relative z-50 w-full px-4 md:px-6 h-16 flex items-center justify-between text-[14px] bg-[#0d1117] text-white border-b border-[#30363d]">
      
      <div className="flex items-center gap-3">
       

        <Link 
          href={username ? `/dashboard/${encodeURIComponent(username)}` : "/"} 
          className="flex items-center text-[#e6edf3] hover:opacity-70 transition-opacity"
        >
          <svg 
            height="32" 
            width="32" 
            viewBox="0 0 16 16" 
            aria-hidden="true" 
            className="fill-current"
          >
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82A7.48 7.48 0 0 0 8 2.81c-.68.003-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
          </svg>
        </Link>

        <span className="text-[#e6edf3] font-semibold text-[14px] ml-1 select-none">Dashboard</span>
      </div>

      <div className="flex items-center gap-3">
        

        {isLoaded && (
          username ? (
            <Link href={`/dashboard/${encodeURIComponent(username)}`} className="transition-opacity hover:opacity-80 flex items-center">
              {avatarUrl ? (
                <img 
                  src={avatarUrl} 
                  alt={username} 
                  className="w-6 h-6 rounded-full border border-[#30363d] object-cover" 
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gray-700 animate-pulse border border-[#30363d]" />
              )}
            </Link>
          ) : (
            <Link href="/git-registration" className="hover:text-[#ffffff99] text-[#e6edf3] text-[13px] border border-[#30363d] px-3 py-1 rounded-md bg-[#21262d] transition-colors">
              Sign in
            </Link>
          )
        )}
      </div>

    </header>
  );
};

export default Header;