"use client";

import  { useState } from 'react';
import { FiChevronDown } from "react-icons/fi";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  visibility: string;
  language: string | null;
}

interface OverviewTabProps {
  repos: Repository[];
  publicReposCount: number;
}

export default function OverviewTab({ repos, publicReposCount }: OverviewTabProps) {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const totalContributions = publicReposCount * 3 + 12;

  return (
    <div className="w-full flex flex-col min-w-0 mt-5">
      <div className="mb-8 w-full">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-normal text-[#24292f]">Popular repositories</h2>
          <a href="https://github.com" className="text-xs text-[#0969da] hover:underline">
            Customize your pins
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {repos.slice(0, 6).map((repo) => (
            <div
              key={repo.id}
              className="border border-[#d0d7de] rounded-md p-4 flex flex-col justify-between bg-white hover:border-[#8c959f] transition-colors w-full"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0969da] font-semibold text-sm hover:underline truncate mr-2"
                  >
                    {repo.name}
                  </a>
                  <span className="text-[11px] px-2 py-0.5 rounded-full border border-[#d0d7de] text-[#57606a] font-medium bg-[#f6f8fa] capitalize">
                    {repo.visibility || "public"}
                  </span>
                </div>
                <p className="text-xs text-[#57606a] line-clamp-2 mb-4">
                  {repo.description || "No description provided."}
                </p>
              </div>

              {repo.language && (
                <div className="flex items-center text-xs text-[#57606a]">
                  <span
                    className={`w-3 h-3 rounded-full mr-1.5 inline-block ${
                      repo.language === "JavaScript"
                        ? "bg-[#f1e05a]"
                        : repo.language === "HTML"
                        ? "bg-[#e34c26]"
                        : repo.language === "TypeScript"
                        ? "bg-[#3178c6]"
                        : repo.language === "Python"
                        ? "bg-[#3572A5]"
                        : "bg-[#8a8a8a]"
                    }`}
                  ></span>
                  <span>{repo.language}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-base font-normal text-[#24292f]">
            {totalContributions} contributions in the last year
          </h2>
          <div className="flex items-center gap-2">
            <button className="text-xs text-[#57606a] bg-[#f6f8fa] border border-[#d0d7de] px-3 py-1 rounded-md hover:bg-[#f3f4f6] flex items-center gap-1 font-medium shadow-sm">
              Contribution settings
              <FiChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start w-full">
          <div className="border border-[#d0d7de] rounded-md p-4 bg-white overflow-hidden flex-1 w-full">
            <div className="w-full">
              <div className="flex text-xs text-[#57606a] mb-2 pl-6 justify-between pr-2">
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
              </div>

              <div className="flex gap-1.5 w-full">
                <div className="flex flex-col justify-between text-[10px] text-[#57606a] pr-1 py-1">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>

                <div className="grid grid-flow-col grid-rows-7 gap-[2px] w-full overflow-x-auto">
                  {Array.from({ length: 52 * 7 }).map((_, i) => {
                    const activeLevels = [
                      "bg-[#ebedf0]",
                      "bg-[#9be9a8]",
                      "bg-[#40c463]",
                      "bg-[#30a14e]",
                      "bg-[#216e39]",
                    ];

                    let level = 0;
                    if ((i % 7 === 1 || i % 7 === 3 || i % 7 === 5) && i > 250 && i < 330) {
                      level = (i % 3) + 2;
                    } else if (i % 11 === 0 && i > 100) {
                      level = 1;
                    } else if (i === 200 || i === 240) {
                      level = 4;
                    }

                    return (
                      <div
                        key={i}
                        className={`w-[9px] h-[9px] rounded-[2px] ${activeLevels[level]} border-[0.5px] border-black/5`}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 text-xs text-[#57606a]">
                <span>Learn how we count contributions</span>
                <div className="flex items-center gap-1">
                  <span>Less</span>
                  <div className="w-[10px] h-[10px] bg-[#ebedf0] rounded-[2px] border-[0.5px] border-black/5"></div>
                  <div className="w-[10px] h-[10px] bg-[#9be9a8] rounded-[2px] border-[0.5px] border-black/5"></div>
                  <div className="w-[10px] h-[10px] bg-[#40c463] rounded-[2px] border-[0.5px] border-black/5"></div>
                  <div className="w-[10px] h-[10px] bg-[#30a14e] rounded-[2px] border-[0.5px] border-black/5"></div>
                  <div className="w-[10px] h-[10px] bg-[#216e39] rounded-[2px] border-[0.5px] border-black/5"></div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex md:flex-col gap-1 w-full md:w-auto">
            {[2026, 2025, 2024].map((year) => {
              const isSelected = selectedYear === year;
              return (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md text-center transition-colors ${
                    isSelected
                      ? "bg-[#0969da] text-white"
                      : "text-[#57606a] hover:bg-[#f3f4f6]"
                  }`}
                >
                  {year}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}