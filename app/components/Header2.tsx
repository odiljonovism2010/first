"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import Search from "./Search";
import NewIssue from "./NewIssue";
import axios from "axios";
import { usePathname } from "next/navigation";
import { GoRepo } from "react-icons/go";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  GoRows,
  GoPlus, 
  GoTriangleDown, 
  GoIssueOpened, 
  GoGitPullRequest, 
  GoBook, 
  GoInbox,
  GoHome,
} from "react-icons/go";
import { 
  IoStarOutline, 
} from 'react-icons/io5';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Button } from "@base-ui/react";

const GitHubLogo = () => (
  <svg 
    height="32" 
    width="32" 
    viewBox="0 0 16 16" 
    aria-hidden="true" 
    className="fill-current text-[#1f2328]"
  >
    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82A7.48 7.48 0 0 0 8 2.81c-.68.003-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
  </svg>
);

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const title = pathname.includes("/repository/")
    ? "Repository"
    : "Dashboard";

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

  return (
    <header className="relative z-50 w-full px-4 md:px-6 h-14 flex items-center justify-between text-[14px] bg-[#f6f8fa] text-[#1f2328] border-b border-[#d0d7de]">
      
      <div className="flex items-center gap-3">
        {isLoaded && username && (
          <Drawer open={isOpen} onOpenChange={setIsOpen} swipeDirection="left">
            <button 
              onClick={() => setIsOpen(true)}
              className="md:hidden p-1.5 text-[#57606a] hover:bg-[#eaeef2] rounded-md border border-[#d0d7de] bg-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <GoRows size={18} />
            </button>

            <DrawerContent 
              className="bg-white border-r border-[#d0d7de] border-t-0 border-b-0 text-[#1f2328] p-5 w-80 h-full fixed top-0 left-0 rounded-none flex flex-col justify-between font-sans antialiased subpixel-antialiased transform-gpu overflow-y-auto"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div>
                <DrawerHeader className="flex items-center justify-between border-b border-[#d0d7de] pb-4 px-0">
                  <div className="flex justify-between gap-5 w-full">
                    <Link 
                      href={username ? `/dashboard/${encodeURIComponent(username)}` : "/"} 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center text-[#1f2328] hover:opacity-70 transition-opacity"
                    >
                      <GitHubLogo />
                    </Link>

                    <button 
                      onClick={() => setIsOpen(false)}
                      className="p-1.5 text-[#57606a] hover:bg-[#f6f8fa] rounded-lg bg-transparent border-none cursor-pointer transition-colors flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </DrawerHeader>

                <div className="py-3 flex flex-col gap-4 text-[#1f2328] text-sm font-normal">
                  <div className="flex flex-col gap-1">
                    <Link 
                      href="/" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-2 py-2 hover:bg-[#f6f8fa] rounded-md transition-colors"
                    >
                      <GoHome size={16} className="text-[#57606a]" /> <span>Home</span>
                    </Link>
                    
                    <Link 
                      href="/issues" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-2 py-2 hover:bg-[#f6f8fa] rounded-md transition-colors"
                    >
                      <GoIssueOpened size={16} className="text-[#57606a]" /> <span>All issues</span>
                    </Link>

                    <Link 
                      href="/requests" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-2 py-2 hover:bg-[#f6f8fa] rounded-md transition-colors"
                    >
                      <GoGitPullRequest size={16} className="text-[#57606a]" /> <span>All pull requests</span>
                    </Link>

                    <Link 
                      href="/repositories" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-2 py-2 hover:bg-[#f6f8fa] rounded-md transition-colors"
                    >
                      <GoBook size={16} className="text-[#57606a]" /> <span>All repositories</span>
                    </Link>

                    <Link 
                      href={`/${encodeURIComponent(username ?? "/")}/inbox`} 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-2 py-2 hover:bg-[#f6f8fa] rounded-md transition-colors"
                    >
                      <GoInbox size={16} className="text-[#57606a]" /> <span>Inbox</span>
                    </Link>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        )}

        <Link 
          href={username ? `/dashboard/${encodeURIComponent(username)}` : "/"} 
          className="flex items-center text-[#1f2328] hover:opacity-70 transition-opacity ml-1"
        >
          <GitHubLogo />
        </Link>

        <span className="text-[#1f2328] font-semibold text-[14px] ml-1 select-none">{title}</span>
      </div>

      <div className="flex items-center gap-2">
        <Search />

        <div className="hidden md:block w-[1px] h-4 bg-[#d0d7de] mx-1" />

        <div className="flex items-center gap-1.5">
          <DropdownMenu>
            <DropdownMenuTrigger className="p-1.5 text-[#57606a] hover:bg-[#eaeef2] rounded-md border border-[#d0d7de] bg-white flex items-center gap-0.5 h-7 transition-colors cursor-pointer outline-none">
              <GoPlus size={16} />
              <GoTriangleDown size={10} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white border border-[#d0d7de] shadow-lg py-1 text-sm text-[#24292f]">
              <DropdownMenuItem className="cursor-pointer px-3 py-2 flex items-center gap-2 focus:bg-[#F6F8FA]">
                <Button type="button" onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 w-full bg-transparent border-none cursor-pointer text-left">
                  <GoIssueOpened size={16} />
                  <span>New issue</span>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer px-3 py-2 flex items-center gap-2 focus:bg-[#F6F8FA]">
                <Link href="/newrepo" className="flex items-center gap-2 w-full">
                  <GoRepo size={16} />
                  <span>New repository</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/issues" className="hidden md:block">
            <button className="p-1.5 text-[#57606a] hover:bg-[#eaeef2] rounded-md border border-[#d0d7de] bg-white flex items-center justify-center h-7 w-7 transition-colors cursor-pointer">
              <GoIssueOpened size={16} />
            </button>
          </Link>

          <Link href="/requests" className="hidden md:block">
            <button className="p-1.5 text-[#57606a] hover:bg-[#eaeef2] rounded-md border border-[#d0d7de] bg-white flex items-center justify-center h-7 w-7 transition-colors cursor-pointer">
              <GoGitPullRequest size={16} />
            </button>
          </Link>

          <Link href="/repositories" className="hidden md:block">
            <button className="p-1.5 text-[#57606a] hover:bg-[#eaeef2] rounded-md border border-[#d0d7de] bg-white flex items-center justify-center h-7 w-7 transition-colors cursor-pointer">
              <GoBook size={16} />
            </button>
          </Link>

          <Link href={`/${encodeURIComponent(username ?? "/")}/inbox`} className="hidden md:block">
            <button className="p-1.5 text-[#57606a] hover:bg-[#eaeef2] rounded-md border border-[#d0d7de] bg-white flex items-center justify-center h-7 w-7 transition-colors cursor-pointer">
              <GoInbox size={16} />
            </button>
          </Link>

          {isLoaded && (
            username ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-[#d0d7de] hover:opacity-80 transition-opacity flex items-center justify-center cursor-pointer bg-white">
                    {avatarUrl ? (
                      <img 
                        src={avatarUrl} 
                        alt={`${username}'s avatar`} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[11px] font-semibold text-[#57606a] uppercase">
                        {username ? username.charAt(0) : ""}
                      </span>
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Link href={`/${encodeURIComponent(username ?? "/")}`} className="flex items-center gap-2 w-full">
                        <CgProfile size={16} />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/${username}?repos=repositories`} className="flex items-center gap-2 w-full">
                        <GoBook size={16} />
                        <span>Repositories</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/${username}?repos=stars`} className="flex items-center gap-2 w-full">
                        <IoStarOutline size={16} />
                        <span>Stars</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link href="/Settings" className="flex items-center gap-2 w-full">
                        <IoSettingsOutline size={16} />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <Link href="/" className="flex items-center gap-2 w-full" onClick={() => {
                      localStorage.removeItem('github_user');
                    }}>
                      <TbLogout size={16} />
                      <span>Log out</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/git-registration" className="hover:bg-[#f3f4f6] text-[#1f2328] text-[13px] border border-[#d0d7de] px-3 py-1 rounded-md bg-white transition-colors h-7 flex items-center">
                Sign in
              </Link>
            )
          )}
        </div>
      </div>
      <NewIssue
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </header>
  );
};

export default Header;