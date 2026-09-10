"use client";

import React, { useState } from 'react';

const CARDS_DATA = [
  {
    id: 1,
    logo: "Figma",
    isTextLogo: true, 
    category: "Technology",
    title: "Figma streamlines development and strengthens security"
  },
  {
    id: 2,
    logo: (
      <div className="flex items-center gap-2">
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v20M12 12l-8.66-5M12 12l8.66-5" />
        </svg>
        <span className="text-sm font-semibold tracking-tight">Mercedes-Benz</span>
      </div>
    ),
    isTextLogo: false,
    category: "Automotive",
    title: "Mercedes-Benz standardizes source code and automates onboarding"
  },
  {
    id: 3,
    logo: (
      <div className="flex items-center gap-2">
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 8a4 4 0 90-8 0c0 4 4 8 4 8s4-4 4-8z" />
          <path d="M12 10a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
        <div className="flex flex-col items-start leading-none">
          <span className="text-xs font-bold lowercase tracking-tighter">mercado</span>
          <span className="text-xs font-light lowercase tracking-tighter text-gray-400">libre</span>
        </div>
      </div>
    ),
    isTextLogo: false,
    category: "Financial services",
    title: "Mercado Libre cuts coding time by 50%"
  }
];

const FILTERS = ["By industry", "By size", "By use case"];

export default function GitHubScalesSection() {
  const [activeFilter, setActiveFilter] = useState("By industry");

  return (
    <section className="w-full bg-[#05081a] text-white font-sans py-24 flex flex-col items-center overflow-hidden antialiased">
      
      <div className="flex flex-col items-center text-center px-4 max-w-3xl mb-10">
        <div className="text-4xl mb-6 select-none animate-bounce duration-1000">
          🐣
        </div>
        
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight max-w-2xl">
          From startups to enterprises,{" "}
          <span className="block bg-gradient-to-r from-[#8b949e] via-[#c9d1d9] to-[#8b949e] bg-clip-text text-transparent opacity-80">
            GitHub scales with teams of any size in any industry.
          </span>
        </h2>
      </div>

      <div className="mb-16 p-1 rounded-full bg-[#161b22]/30 border border-[#30363d]/60 backdrop-blur-sm flex items-center gap-1">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              activeFilter === filter
                ? 'bg-[#161b22] text-white border border-[#484f58] shadow-sm'
                : 'text-[#8b949e] hover:text-white border border-transparent'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="w-full border-t border-[#30363d]/40 grid grid-cols-1 md:grid-cols-5 bg-black">
        
        <div className="hidden md:block border-r border-[#30363d]/40 bg-transparent" />

        {CARDS_DATA.map((card) => (
          <div 
            key={card.id}
            className="group relative border-b md:border-b-0 border-r border-[#30363d]/40 p-8 md:p-12 min-h-[420px] flex flex-col justify-between transition-colors duration-300 hover:bg-[#0d1117]/30 cursor-pointer"
          >
            <div className="flex justify-center items-center h-20 text-center">
              {card.isTextLogo ? (
                <span className="text-3xl font-medium tracking-tight text-white">{card.logo}</span>
              ) : (
                <div className="text-white">{card.logo}</div>
              )}
            </div>

            <div className="flex flex-col items-center text-center mt-auto">
              <span className="text-[11px] font-medium uppercase tracking-wider text-[#8b949e] mb-3">
                {card.category}
              </span>
              <p className="text-base md:text-lg font-medium text-[#c9d1d9] leading-snug group-hover:text-white transition-colors">
                {card.title}
              </p>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500/0 to-transparent group-hover:via-purple-500/40 transition-all duration-500" />
          </div>
        ))}

        <div className="hidden md:block bg-transparent" />

      </div>

    </section>
  );
}