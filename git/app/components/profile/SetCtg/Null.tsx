"use client";

import { FiExternalLink } from "react-icons/fi";

export default function DevSet() {
  return (
    <div className="max-w-4xl space-y-6">
      <h2 className="text-2xl font-normal pb-4 border-b border-[#d0d7de] text-[#24292f]">
        Developer settings
      </h2>

      <div className="flex flex-col items-center justify-center py-16 px-4 text-center space-y-6 bg-white border border-[#d0d7de] rounded-md shadow-sm">
        <img
          src="/SadGit.png"
          alt="Sad Git"
          className="w-36 h-36 object-contain"
        />

        <div className="space-y-2 max-w-md">
          <h3 className="text-lg font-semibold text-[#24292f]">
            Available only on original GitHub
          </h3>
          <p className="text-sm text-[#57606a]">
            This section interacts with restricted GitHub systems and is only supported directly on the official GitHub platform.
          </p>
        </div>

        <div>
          <a
            href="https://github.com/settings/developers"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#2da44e] hover:bg-[#2c974b] text-white font-medium text-sm rounded-md shadow-sm transition-colors cursor-pointer"
          >
            <span>Open on GitHub</span>
            <FiExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}