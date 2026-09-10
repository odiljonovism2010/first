"use client"; 
import React, { useState } from 'react';

const COMPANIES = [
  'PHILIPS', 'SOCIETE GENERALE', 'Spotify', 'vodafone', 
  'American Airlines', 'duolingo', 'EY', 'Ford'
];

const TABS = ['Code', 'Plan', 'Collaborate', 'Automate', 'Secure'];

export default function GitHubWorkflowSection() {
  const [activeTab, setActiveTab] = useState('Code');

  return (
    <section className="relative w-full bg-[#05081a] text-white font-sans py-24 overflow-hidden flex flex-col items-center antialiased">
      
      <div className="z-10 p-1.5 rounded-full bg-[#161b22]/40 border border-[#30363d]/40 backdrop-blur-md flex items-center gap-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === tab
                ? 'bg-[#21262d] text-white shadow-[0_1px_0_rgba(255,255,255,0.1)] border border-[#484f58]'
                : 'text-[#8b949e] hover:text-white border border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-[#8b949e] font-normal text-center px-4 max-w-xl">
        Write, test, and fix code quickly with GitHub Copilot, from simple boilerplate to complex features.
      </p>

      <div className="w-full border-y border-[#21262d]/50 bg-[#050714] mt-20 py-8 relative before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-40 before:bg-gradient-to-r before:from-[#050714] before:to-transparent after:absolute after:right-0 after:after:top-0 after:z-10 after:h-full after:w-40 after:bg-gradient-to-l after:after:from-[#050714] after:after:to-transparent">
        <div className="flex w-max gap-16 animate-marquee">
          {[...COMPANIES, ...COMPANIES].map((company, index) => (
            <span
              key={index}
              className="text-xl md:text-2xl font-bold tracking-wider text-[#484f58] hover:text-[#8b949e] transition-colors cursor-default font-sans opacity-70 flex items-center"
            >
              {company}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mt-32 w-full max-w-4xl mx-auto flex flex-col items-center text-center px-4 z-10">
                <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-[#bc7fff] rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-b from-[#2c2657] to-[#131832] border border-[#7928ca]/50 flex items-center justify-center text-3xl shadow-inner shadow-purple-500/30">
            🤖
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
          Accelerate your entire workflow
        </h2>

        <p className="text-base md:text-lg text-[#8b949e] max-w-2xl leading-relaxed">
          From your first line of code to final deployment, GitHub provides AI and automation tools to help you build and ship better software faster.
        </p>

        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[200px] rounded-full bg-[#2c2657]/40 blur-[80px] pointer-events-none z-0" />
      </div>

    </section>
  );
}