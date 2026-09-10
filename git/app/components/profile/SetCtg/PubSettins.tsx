"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiEdit2, FiLink, FiCamera } from "react-icons/fi";

export default function PubSettings() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [url, setUrl] = useState("");
  const [social1, setSocial1] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("github_user") || "odiljonovism2010";

    async function fetchUserData() {
      try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        const headers: HeadersInit = {
          Accept: "application/vnd.github+json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch(`https://api.github.com/users/${username}`, { headers });
        if (res.ok) {
          const data = await res.json();
          if (data.name) setName(data.name);
          if (data.bio) setBio(data.bio);
          if (data.company) setCompany(data.company);
          if (data.location) setLocation(data.location);
          if (data.blog) setUrl(data.blog);
          if (data.avatar_url) setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub profile data", error);
      }
    }

    fetchUserData();
  }, []);

  const isValidUrl = (string: string) => {
    if (!string) return true;
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!name.trim()) {
      setStatusMessage({
        type: "error",
        text: "Name is required.",
      });
      return;
    }

    if (url && !isValidUrl(url)) {
      setStatusMessage({
        type: "error",
        text: "Please enter a valid URL for the Website.",
      });
      return;
    }

    if (social1 && !isValidUrl(social1)) {
      setStatusMessage({
        type: "error",
        text: "Please enter a valid URL for the Social account.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      
      if (!token) {
        setStatusMessage({
          type: "error",
          text: "GitHub token (NEXT_PUBLIC_GITHUB_TOKEN) is missing in environment variables.",
        });
        setIsSubmitting(false);
        return;
      }

      const res = await fetch("https://api.github.com/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          bio,
          company,
          location,
          blog: url,
        }),
      });

      if (res.ok) {
        setStatusMessage({
          type: "success",
          text: "Profile updated successfully!",
        });
      } else {
        const errData = await res.json().catch(() => ({}));
        setStatusMessage({
          type: "error",
          text: errData.message || "Failed to update profile. Check your token scopes.",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setStatusMessage({
        type: "error",
        text: "An unexpected error occurred while updating the profile.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-normal pb-4 mb-6 border-b border-[#d0d7de] text-[#24292f]">
        Public profile
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

      <div className="flex flex-col-reverse md:flex-row gap-8 items-start">
        <form onSubmit={handleSubmit} className="flex-1 space-y-4 w-full">
          <div>
            <label className="block text-sm font-semibold text-[#24292f] mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f]"
            />
            <p className="text-xs text-[#57606a] mt-1">
              Your name may appear around GitHub where you contribute or are mentioned. You can remove it at any time.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#24292f] mb-1">
              Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us a little bit about yourself"
              className="w-full px-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f] resize-y"
            />
            <p className="text-xs text-[#57606a] mt-1">
              You can @mention other users and organizations to link to them.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#24292f] mb-1">
              URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#24292f] mb-1">
              Social accounts
            </label>
            <div className="space-y-2">
              <div className="relative flex items-center">
                <span className="absolute left-3 text-[#57606a]">
                  <FiLink className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={social1}
                  onChange={(e) => setSocial1(e.target.value)}
                  placeholder="Link to social profile"
                  className="w-full pl-9 pr-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#24292f] mb-1">
              Company
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f]"
            />
            <p className="text-xs text-[#57606a] mt-1">
              You can @mention your company's GitHub organization to link it.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#24292f] mb-1">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-1.5 text-sm bg-[#f6f8fa] border border-[#d0d7de] rounded-md focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] text-[#24292f]"
            />
          </div>

          <p className="text-xs text-[#57606a] border-t border-[#d0d7de] pt-4 mt-6">
            All of the fields on this page are optional and can be deleted at any time, and by filling them out, you're giving us consent to share this data wherever your user profile appears. Please see our{" "}
            <a href="#" className="text-[#0969da] hover:underline">
              privacy statement
            </a>{" "}
            to learn more about how we use this information.
          </p>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-[#2da44e] hover:bg-[#2c974b] text-white font-medium text-sm rounded-md shadow-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Updating..." : "Update profile"}
            </button>
          </div>
        </form>

        <div className="w-full md:w-64 shrink-0 flex flex-col items-center md:items-start">
          <label className="block text-sm font-semibold text-[#24292f] mb-2">
            Profile picture
          </label>
          <div className="relative w-48 h-48 rounded-full overflow-hidden border border-[#d0d7de] bg-[#f6f8fa] shadow-sm">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Profile picture"
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#57606a]">
                <FiCamera className="w-12 h-12" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}