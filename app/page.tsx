"use client"; 

import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios'; // Добавлен для проверки пользователя
import GitHubLanding from "./components/home/second";
import GitHubWorkflowSection from "./components/home/third";
import GitHubScalesSection from "./components/home/fourth";
import GitHubFooterHero from "./components/home/fifth";
import Header from "./components/header";
import Footer from "./components/footer"

export default function GitHubHero() {
  const [login, setLogin] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true); 

  useEffect(() => {
    const savedUser = localStorage.getItem("github_user");
    if (savedUser) {
      window.location.href = "/dashboard/" + encodeURIComponent(savedUser);
    } else {
      setCheckingAuth(false);
    }
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedLogin = login.trim();

    if (!trimmedLogin || loading) return;

    setLoading(true);
    try {
      const response = await axios.get(`https://api.github.com/users/${encodeURIComponent(trimmedLogin)}`);
      if (response.status === 200) {
        localStorage.setItem("github_user", trimmedLogin);
        window.location.href = "/dashboard/" + encodeURIComponent(trimmedLogin);
      }
    } catch (err) {
      alert("Пользователь GitHub не найден или произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return null; 
  }

  return (
    <>
      <div className="relative min-h-screen w-screen max-w-full bg-[#05081a] text-white font-sans overflow-hidden flex flex-col">
          <Header></Header>


        <main className="relative z-10 flex-1 flex flex-col items-center justify-start pt-20 md:pt-28 text-center px-4 w-full">
          
          <h1 className="text-4xl sm:text-6xl md:text-[76px] font-medium tracking-tight text-white leading-[1.05] max-w-[1000px]">
            The future of building <br /> happens together
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-[21px] text-[#8b949e] max-w-3xl font-light leading-relaxed tracking-wide">
            Tools and trends evolve, but collaboration endures. With GitHub, developers, agents, and code come together on one platform.
          </p>

          <form 
            onSubmit={handleLoginSubmit}
            className="w-full max-w-2xl flex flex-col sm:flex-row items-stretch justify-center gap-3 z-10 py-4"
          >
            <div className="flex-1 bg-white rounded-lg p-1.5 flex flex-col sm:flex-row items-center gap-2 shadow-lg">
              <input 
                type="text" // Изменено с email на text для GitHub логина
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Enter your GitHub username"
                required
                disabled={loading}
                className="w-full bg-transparent px-4 py-3 text-sm text-black placeholder-[#57606a] font-sans font-medium focus:outline-none"
              />
              <button 
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto whitespace-nowrap bg-[#1f883d] hover:bg-[#1a7732] active:bg-[#186c2e] text-white text-sm font-semibold px-6 py-3 rounded-md transition-colors duration-200 shadow-md disabled:opacity-50"
              >
                {loading ? "Checking..." : "Sign up for GitHub"}
              </button>
            </div>

            <button 
              type="button"
              className="w-full sm:w-auto bg-transparent border border-[#30363d] hover:border-[#8b949e] text-white text-sm font-semibold px-7 py-4 rounded-lg transition-colors duration-200 backdrop-blur-sm"
            >
              Try GitHub Copilot
            </button>
          </form>

        </main>
      </div>
      
      <GitHubLanding />
      <GitHubWorkflowSection />
      <GitHubScalesSection />
      <GitHubFooterHero />
      <Footer></Footer>
    </>
  );
}