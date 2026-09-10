"use client";

import React, { useState, useEffect } from "react";
import { FiHelpCircle } from "react-icons/fi";
import { SiPatreon } from "react-icons/si";

export default function AccSet() {
  const [username, setUsername] = useState("odiljonovism2010");
  const [isChangingName, setIsChangingName] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [patreonConnected, setPatreonConnected] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("github_user") || "";
    setUsername(storedUser);
    setNewUsername(storedUser);

    const storedPatreon = localStorage.getItem("patreon_connected");
    if (storedPatreon === "true") {
      setPatreonConnected(true);
    }
  }, []);

  const handleUsernameChange = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    const trimmed = newUsername.trim();
    if (!trimmed) {
      setStatusMessage({ type: "error", text: "Username cannot be empty." });
      return;
    }

    localStorage.setItem("github_user", trimmed);
    setUsername(trimmed);
    setIsChangingName(false);
    setStatusMessage({ type: "success", text: "Username changed successfully!" });
  };

  const handleTogglePatreon = () => {
    setStatusMessage(null);
    const nextState = !patreonConnected;
    setPatreonConnected(nextState);
    localStorage.setItem("patreon_connected", String(nextState));
    setStatusMessage({
      type: "success",
      text: nextState ? "Patreon account connected successfully!" : "Patreon account disconnected.",
    });
  };

  return (
    <div className="max-w-4xl space-y-8">
      <h2 className="text-2xl font-normal pb-4 mb-6 border-b border-[#d0d7de] text-[#24292f]">
        Account settings
      </h2>

      {statusMessage && (
        <div
          className={`mb-6 p-3 text-sm rounded-md border ${
            statusMessage.type === "success"
              ? "bg-[#dafbe1] border-[#2ea043] text-[#116329]"
              : "bg-[#ffebe9] border-[#ff8182] text-[#cf222e]"
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      <div className="pb-8 border-b border-[#d0d7de] space-y-3">
        <h3 className="text-base font-semibold text-[#24292f]">Change username</h3>
        <p className="text-sm text-[#57606a]">
          Current username: <span className="font-semibold text-[#24292f]">@{username}</span>. Changing your username can have{" "}
          <a href="#" className="text-[#0969da] hover:underline">
            unintended side effects
          </a>
          .
        </p>

        {!isChangingName ? (
          <div>
            <button
              type="button"
              onClick={() => setIsChangingName(true)}
              className="px-3 py-1.5 bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] text-[#24292f] font-medium text-xs rounded-md shadow-sm transition-colors cursor-pointer"
            >
              Change username
            </button>
          </div>
        ) : (
          <form onSubmit={handleUsernameChange} className="flex gap-2 max-w-md pt-2">
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Enter new username"
              className="flex-1 px-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f]"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-[#2da44e] hover:bg-[#2c974b] text-white font-medium text-xs rounded-md shadow-sm transition-colors cursor-pointer"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setIsChangingName(false);
                setNewUsername(username);
              }}
              className="px-3 py-1.5 bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] text-[#24292f] font-medium text-xs rounded-md shadow-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </form>
        )}

        <div className="flex items-center gap-1.5 text-xs text-[#57606a] pt-1">
          <FiHelpCircle className="w-4 h-4 shrink-0" />
          <span>
            Looking to manage account security settings? You can find them in the{" "}
            <a href="#" className="text-[#0969da] hover:underline">
              Password and authentication
            </a>{" "}
            page.
          </span>
        </div>
      </div>

      <div className="pb-8 border-b border-[#d0d7de] space-y-3">
        <h3 className="text-base font-semibold text-[#24292f]">Link Patreon account</h3>
        <p className="text-sm text-[#57606a] max-w-2xl">
          Connect a Patreon account for <span className="font-semibold text-[#24292f]">@{username}</span> to sponsor maintainers with. Get recognition on GitHub for sponsorships made on Patreon when the sponsored person has linked Patreon and GitHub, too, and has a public GitHub Sponsors profile.
        </p>
        <div>
          <button
            type="button"
            onClick={handleTogglePatreon}
            className={`px-3 py-1.5 border font-medium text-xs rounded-md shadow-sm transition-colors inline-flex items-center gap-2 cursor-pointer ${
              patreonConnected
                ? "bg-[#dafbe1] border-[#2ea043] text-[#116329] hover:bg-[#cceed5]"
                : "bg-[#f6f8fa] hover:bg-[#f3f4f6] border-[#d0d7de] text-[#24292f]"
            }`}
          >
            <SiPatreon className={`w-3.5 h-3.5 ${patreonConnected ? "text-[#2ea043]" : "text-[#ff424d]"}`} />
            {patreonConnected ? "Connected with Patreon (Disconnect)" : "Connect with Patreon"}
          </button>
        </div>
      </div>
    </div>
  );
}