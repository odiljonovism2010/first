"use client";

import React, { useState } from 'react';

export default function GitHubFooterHeroLarge() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registering email:', email);
  };

  return (
    <section className="w-full bg-[#05081a] text-white font-sans py-36 flex flex-col items-center overflow-hidden antialiased">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center px-8 relative">
        
        <div className="relative w-full max-w-[700px] aspect-[2/1] mb-16 flex items-center justify-center">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-[#211646] rounded-full opacity-65 blur-[80px] md:blur-[100px] pointer-events-none z-0" />
          
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <img 
              src="mascot.png" 
              alt="GitHub Mascots" 
              className="w-full h-full object-contain select-none pointer-events-none"
            />
          </div>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-8 max-w-3xl leading-[1.1]">
          Millions of developers and businesses call GitHub home
        </h2>
        
        <p className="text-base md:text-lg text-[#8b949e] max-w-3xl leading-relaxed mb-14 px-4 font-normal">
          Whether you’re scaling your development process or just learning how to code, 
          GitHub is where you belong. Join the world’s most widely adopted developer 
          platform to build the technologies that shape what’s next.
        </p>

        <form 
          onSubmit={handleSubmit}
          className="w-full max-w-3xl flex flex-col sm:flex-row items-stretch justify-center gap-4 z-10"
        >
          <div className="flex-1 bg-white rounded-xl p-2 flex flex-col sm:flex-row items-center gap-3 shadow-2xl">
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full bg-transparent px-5 py-3.5 text-base text-black placeholder-[#57606a] font-sans font-medium focus:outline-none"
            />
            <button 
              type="submit"
       
              className="w-full sm:w-auto whitespace-nowrap bg-[#1f883d] hover:bg-[#1a7732] active:bg-[#186c2e] text-white text-base font-semibold px-8 py-3.5 rounded-lg transition-colors duration-200 shadow-md"
            >
              Sign up for GitHub
            </button>
          </div>

          <button 
            type="button"
            className="w-full sm:w-auto bg-transparent border border-[#30363d] hover:border-[#8b949e] text-white text-base font-semibold px-8 py-4 rounded-xl transition-colors duration-200 backdrop-blur-sm"
          >
            Try GitHub Copilot
          </button>
        </form>

      </div>
    </section>
  );
}