'use client';

import  { useState } from 'react';
import { 
  FiSettings, 
  FiGitBranch, 
  FiPlay, 
  FiKey, 
  FiGlobe,
  FiMenu,
  FiX
} from 'react-icons/fi';

interface SeetingTabProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export default function SeetingTab({ currentTab, onSelectTab }: SeetingTabProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'general', label: 'General', icon: <FiSettings className="text-base" /> },
    { id: 'branches', label: 'Branches', icon: <FiGitBranch /> },
    { id: 'actions', label: 'Actions', icon: <FiPlay /> },
    { id: 'secrets', label: 'Secrets and variables', icon: <FiKey /> },
    { id: 'pages', label: 'Pages', icon: <FiGlobe /> },
  ];

  const handleSelect = (id: string) => {
    onSelectTab(id);
    setIsOpen(false);
  };

  const activeItem = menuItems.find((item) => item.id === currentTab);

  return (
    <>
      <div className="lg:hidden flex items-center justify-between px-4 py-2.5 bg-white border border-[#d0d7de] rounded-md w-full mb-4 shrink-0">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#24292f]">
          <span className="text-[#0969da]">{activeItem?.icon}</span>
          <span>{activeItem?.label}</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#f6f8fa] hover:bg-[#eaeef2] border border-[#d0d7de] text-gray-700 text-xs font-semibold transition cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FiX size={16} /> : <FiMenu size={16} />}
          <span>Menu</span>
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden w-full bg-white border border-[#d0d7de] rounded-md shadow-lg mb-4 p-2 space-y-1 z-50">
          {menuItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md font-medium text-sm transition-colors text-left cursor-pointer ${
                  isActive 
                    ? 'bg-[#eaeef2] font-semibold text-[#24292f]' 
                    : 'text-[#57606a] hover:bg-[#eaeef2] hover:text-[#24292f]'
                }`}
              >
                <span className={isActive ? 'text-[#24292f]' : 'text-[#57606a]'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      <aside className="hidden lg:block w-64 shrink-0 space-y-1">
        {menuItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-md font-medium text-sm transition-colors text-left cursor-pointer ${
                isActive 
                  ? 'bg-[#eaeef2] font-semibold text-[#24292f]' 
                  : 'text-[#57606a] hover:bg-[#eaeef2] hover:text-[#24292f]'
              }`}
            >
              <span className={isActive ? 'text-[#24292f]' : 'text-[#57606a]'}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </aside>
    </>
  );
}