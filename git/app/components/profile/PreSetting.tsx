'use client';

import { useState, useEffect } from 'react';
import { 
  FiUser, 
  FiSettings, 
  FiMail, 
  FiBook, 
  FiCode, 
} from 'react-icons/fi';

interface AccountSettingTabProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export default function AccountSettingTab({ currentTab, onSelectTab }: AccountSettingTabProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [username, setUsername] = useState<string>('odiljonovism2010');

  useEffect(() => {
    const storedUser = localStorage.getItem('github_user') || '';
    setUsername(storedUser);

    async function fetchUserAvatar() {
      try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        const headers: HeadersInit = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`https://api.github.com/users/${storedUser}`, {
          headers,
        });

        if (response.ok) {
          const data = await response.json();
          if (data.avatar_url) {
            setAvatarUrl(data.avatar_url);
          }
        }
      } catch (error) {
        console.error('Failed to fetch user avatar', error);
      }
    }

    fetchUserAvatar();
  }, []);

  const menuItems = [
    { id: 'profile', label: 'Public profile', icon: <FiUser className="text-base" /> },
    { id: 'account', label: 'Account', icon: <FiSettings className="text-base" /> },
    { id: 'emails', label: 'Emails', icon: <FiMail className="text-base" /> },
    { id: 'repositories', label: 'Repositories', icon: <FiBook className="text-base" /> },
    { id: 'developer', label: 'Developer settings', icon: <FiCode className="text-base" /> },
  ];

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-4">
      <div className="flex items-center gap-3 px-2 sm:px-3 pb-4 border-b border-[#d0d7de]">
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt={username} 
            className="w-10 h-10 rounded-full object-cover shrink-0 border border-[#d0d7de]"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#eaeef2] overflow-hidden shrink-0 flex items-center justify-center font-bold text-[#24292f]">
            {username.slice(0, 2).toUpperCase() || 'U'}
          </div>
        )}
        <div className="overflow-hidden">
          <div className="font-semibold text-sm text-[#24292f] truncate">{username}</div>
          <div className="text-xs text-[#57606a] truncate">Your personal account</div>
        </div>
      </div>

      <div className="space-y-0.5">
        {menuItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md font-medium text-xs sm:text-sm transition-colors text-left relative cursor-pointer ${
                isActive 
                  ? 'bg-[#eaeef2] font-semibold text-[#24292f]' 
                  : 'text-[#57606a] hover:bg-[#eaeef2] hover:text-[#24292f]'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1 bottom-1 w-1 bg-[#0969da] rounded-r hidden lg:block" />
              )}
              <span className={isActive ? 'text-[#24292f]' : 'text-[#57606a]'}>
                {item.icon}
              </span>
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}