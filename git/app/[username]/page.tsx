"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { FiUsers, FiLink, FiSmile, FiMapPin, FiMail, FiInstagram } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import ProfileNav from "../components/profile/PreTab";
import OverviewTab from "../components/profile/OverView";
import RepoTab from "../components/profile/RepoTab";
import Stars from "../components/profile/Stars";
import Edit from "../components/Edit";

interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  location: string | null;
  company: string | null;
  blog: string | null;
  created_at: string;
  twitter_username: string | null;
  email?: string | null;
}

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  visibility: string;
  language: string | null;
  stargazers_count?: number;
  updated_at?: string;
}

export default function Page() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [starredRepos, setStarredRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  const [profileData, setProfileData] = useState({
    name: "odiljonovism2010",
    bio: "Web developer & programmer",
    company: "",
    location: "Samarkand",
    website: "https://dotlabs.uz/",
    email: "odiljonovism2010@icloud.com",
    socials: ["https://www.instagram.com/odiljonov_ismoiljon/?__pwa=1#"],
  });
  
  const tabParam = searchParams.get("tab") || searchParams.get("repos") || "overview";
  const [activeTab, setActiveTab] = useState(tabParam === "repositories" ? "repositories" : tabParam);
  
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", newTab);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const currentTab = searchParams.get("tab") || searchParams.get("repos");
    if (currentTab) {
      setActiveTab(currentTab === "repositories" ? "repositories" : currentTab);
    }
  }, [searchParams]);

  useEffect(() => {
    const username = localStorage.getItem("github_user") || "";

    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        };

        const [userRes, reposRes, starsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { headers }),
          fetch(`https://api.github.com/users/${username}/repos`, { headers }),
          fetch(`https://api.github.com/users/${username}/starred`, { headers }),
        ]);

        if (!userRes.ok) throw new Error("Ошибка загрузки пользователя");

        const userData: GithubUser = await userRes.json();
        setUser(userData);
        
        // Initialize profileData with GitHub data if available
        setProfileData((prev) => ({
          ...prev,
          name: userData.name || userData.login,
          bio: userData.bio || prev.bio,
          company: userData.company || prev.company,
          location: userData.location || prev.location,
          website: userData.blog || prev.website,
          email: userData.email || prev.email,
        }));

        if (reposRes.ok) {
          const reposData: Repository[] = await reposRes.json();
          setRepos(reposData);
        }

        if (starsRes.ok) {
          const starsData: Repository[] = await starsRes.json();
          setStarredRepos(starsData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#ffffff] text-gray-800 text-xl font-medium">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#ffffff] text-gray-800 text-xl font-medium">
        Пользователь не найден
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#24292f] font-sans antialiased selection:bg-[#0969da] selection:text-white">
      
      <ProfileNav 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        publicReposCount={user.public_repos} 
      />

      <div className="w-full sm:w-[92%] lg:w-[85%] mx-auto px-3 sm:px-6 py-4 sm:py-8 flex flex-col md:flex-row gap-6 md:gap-10">
        
        <div className="w-full md:w-[296px] flex-shrink-0 flex flex-col py-2 md:py-5">
          <div className="relative -mt-4 sm:-mt-8 mb-4 max-w-[200px] md:max-w-none mx-auto w-full">
            <Image
              src={user.avatar_url}
              alt={user.login}
              width={256}
              height={256}
              className="rounded-full border border-[#d8dee4] bg-white shadow-sm w-full h-auto mx-auto aspect-square object-cover"
              priority
            />
            <button className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-white border border-[#d0d7de] hover:bg-[#f3f4f6] text-[#24292f] p-2 rounded-full shadow-sm flex items-center justify-center transition-colors">
              <FiSmile className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-xl sm:text-2xl font-semibold leading-tight text-[#24292f] truncate">
              {profileData.name}
            </h1>
            <p className="text-lg sm:text-xl font-light text-[#57606a] mb-2 truncate">
              {user.login}
            </p>
          </div>

          {profileData.bio && (
            <p className="text-sm text-[#24292f] mb-4 whitespace-pre-wrap">
              {profileData.bio}
            </p>
          )}

          <button 
            type="button"
            onClick={() => setIsEditOpen(true)} 
            className="w-full py-1.5 px-4 bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] text-[#24292f] font-medium text-sm rounded-md shadow-sm transition-colors mb-4 text-center cursor-pointer"
          >
            Edit profile
          </button>

          <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs sm:text-sm text-[#57606a] mb-4 flex-wrap">
            <FiUsers className="w-4 h-4 text-[#57606a] flex-shrink-0" />
            <div className="truncate">
              <span className="font-semibold text-[#24292f]">{user.followers}</span> followers
              <span className="mx-1">·</span>
              <span className="font-semibold text-[#24292f]">{user.following}</span> following
            </div>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-[#24292f] mb-6">
            {profileData.company && (
              <div className="flex items-center gap-2 truncate">
                <HiOutlineBuildingOffice2 className="w-4 h-4 text-[#57606a] flex-shrink-0" />
                <span className="truncate">{profileData.company}</span>
              </div>
            )}

            {profileData.location && (
              <div className="flex items-center gap-2 truncate">
                <FiMapPin className="w-4 h-4 text-[#57606a] flex-shrink-0" />
                <span className="truncate">{profileData.location}</span>
              </div>
            )}

            {profileData.email && (
              <div className="flex items-center gap-2 truncate">
                <FiMail className="w-4 h-4 text-[#57606a] flex-shrink-0" />
                <a href={`mailto:${profileData.email}`} className="hover:underline truncate">
                  {profileData.email}
                </a>
              </div>
            )}

            {profileData.website && (
              <div className="flex items-center gap-2 truncate">
                <FiLink className="w-4 h-4 text-[#57606a] flex-shrink-0" />
                <a 
                  href={profileData.website.startsWith("http") ? profileData.website : `https://${profileData.website}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:underline truncate text-[#0969da]"
                >
                  {profileData.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}

            {profileData.socials.map((social, idx) => {
              if (!social.trim()) return null;
              const cleanSocial = social.replace(/^https?:\/\//, "");
              const isInsta = social.includes("instagram.com");
              return (
                <div key={idx} className="flex items-center gap-2 truncate">
                  {isInsta ? (
                    <FiInstagram className="w-4 h-4 text-[#57606a] flex-shrink-0" />
                  ) : (
                    <FiLink className="w-4 h-4 text-[#57606a] flex-shrink-0" />
                  )}
                  <a 
                    href={social.startsWith("http") ? social : `https://${social}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:underline truncate text-[#0969da]"
                  >
                    {cleanSocial}
                  </a>
                </div>
              );
            })}
          </div>

          <div className="border-t border-[#d8dee4] pt-4 mt-2">
            <h2 className="font-semibold text-[#24292f] text-sm sm:text-base mb-3 text-center md:text-left">Achievements</h2>
            <div className="flex justify-center md:justify-start gap-2">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 flex items-center justify-center shadow-inner p-1">
                <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center text-[10px] font-bold tracking-tighter text-[#24292f]">
                  <span>YO</span>
                  <span className="text-[8px] text-pink-600">LO</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {activeTab === "overview" && (
            <OverviewTab repos={repos} publicReposCount={user.public_repos} />
          )}
          {activeTab === "repositories" && (
            <RepoTab repos={repos} />
          )}
          {activeTab === "stars" && (
            <Stars starredRepos={starredRepos} />
          )}
        </div>

      </div>

      <Edit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialName={profileData.name}
        initialBio={profileData.bio}
        initialCompany={profileData.company}
        initialLocation={profileData.location}
        initialWebsite={profileData.website}
        initialEmail={profileData.email}
        initialSocials={profileData.socials}
        onSave={(newData) => setProfileData(newData)}
      />
    </div>
  );
}