"use client";

import { useState } from "react";
import {
  CircleDot,
  UserRoundCheck,
  Smile,
  AtSign,
  Clock3,
  Menu,
  X,
} from "lucide-react";

interface IssueSideBarProps {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
}

const IssueSideBar = ({ activeTab, setActiveTab }: IssueSideBarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const topItems = [
    { name: "Issues", icon: CircleDot },
    { name: "Assigned to me", icon: UserRoundCheck },
    { name: "Created by me", icon: Smile },
    { name: "Mentioned", icon: AtSign },
    { name: "Recent activity", icon: Clock3 },
  ];

  const handleSelectTab = (name: string) => {
    setActiveTab(name);
    setIsOpen(false);
  };

  const activeItem = topItems.find((i) => i.name === activeTab);
  const ActiveIcon = activeItem ? activeItem.icon : CircleDot;

  return (
    <>
      <div className="lg:hidden flex items-center justify-between px-4 py-2.5 bg-white border-b border-[#d0d7de] w-full shrink-0">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#24292f]">
          <ActiveIcon size={17} className="text-[#0969da]" />
          <span>{activeTab}</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#f6f8fa] hover:bg-[#eaeef2] border border-[#d0d7de] text-gray-700 text-xs font-semibold transition"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={16} /> : <Menu size={16} />}
          <span>Menu</span>
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-[97px] left-0 w-full bg-white border-b border-[#d0d7de] shadow-lg z-50 px-3 py-2 space-y-1 animate-fadeIn">
          {topItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            return (
              <button
                key={item.name}
                onClick={() => handleSelectTab(item.name)}
                className={`w-full h-10 flex items-center gap-3 rounded-md px-3 text-sm transition-colors ${
                  isActive
                    ? "bg-[#eaeef2] text-[#24292f] font-semibold"
                    : "text-[#24292f] hover:bg-[#f6f8fa]"
                }`}
              >
                <Icon size={17} className={isActive ? "text-[#0969da]" : "text-gray-500"} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      )}

      <aside className="hidden lg:flex w-[296px] h-full bg-white border-r border-[#d0d7de] flex-col justify-between flex-shrink-0">
        <div className="px-3 py-4">
          {topItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`relative w-full h-9 flex items-center gap-3 rounded-md px-3 text-sm transition-colors mb-1 ${
                  isActive
                    ? "bg-[#eaeef2] text-[#24292f] font-semibold"
                    : "text-[#24292f] hover:bg-[#f6f8fa]"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-[#0969da]" />
                )}

                <Icon size={17} strokeWidth={1.8} className={isActive ? "text-[#0969da]" : "text-gray-500"} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default IssueSideBar;