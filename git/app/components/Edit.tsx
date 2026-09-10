"use client";

import React, { useState } from "react";
import { FiX, FiMail, FiLink, FiInstagram, FiPlus, FiTrash2, FiMapPin } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialName?: string;
  initialBio?: string;
  initialCompany?: string;
  initialLocation?: string;
  initialWebsite?: string;
  initialEmail?: string;
  initialSocials?: string[];
  onSave?: (data: {
    name: string;
    bio: string;
    company: string;
    location: string;
    website: string;
    email: string;
    socials: string[];
  }) => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  initialName = "",
  initialBio = "",
  initialCompany = "",
  initialLocation = "",
  initialWebsite = "",
  initialEmail = "odiljonovism2010@icloud.com",
  initialSocials = ["https://www.instagram.com/odiljonov_ismoiljon/?__pwa=1#"],
  onSave,
}: EditProfileModalProps) {
  const [name, setName] = useState(initialName);
  const [bio, setBio] = useState(initialBio);
  const [company, setCompany] = useState(initialCompany);
  const [location, setLocation] = useState(initialLocation);
  const [website, setWebsite] = useState(initialWebsite);
  const [email, setEmail] = useState(initialEmail);
  const [socials, setSocials] = useState<string[]>(
    initialSocials.length > 0 ? initialSocials : [""]
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAddSocial = () => {
    setSocials([...socials, ""]);
  };

  const handleSocialChange = (index: number, value: string) => {
    const updated = [...socials];
    updated[index] = value;
    setSocials(updated);
  };

  const handleRemoveSocial = (index: number) => {
    setSocials(socials.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN || "";
      const filteredSocials = socials.filter((s) => s.trim() !== "");

      const res = await fetch("https://api.github.com/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `token ${token}` } : {}),
        },
        body: JSON.stringify({
          name,
          bio,
          company,
          location,
          blog: website,
        }),
      });

      if (res.ok || true) {
        if (onSave) {
          onSave({
            name,
            bio,
            company,
            location,
            website,
            email,
            socials: filteredSocials,
          });
        }
        onClose();
      } else {
        alert("Не удалось обновить профиль. Проверьте права токена.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-[2px] p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl border border-[#d0d7de] w-full max-w-lg overflow-hidden my-8">
        
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#d0d7de] bg-[#f6f8fa]">
          <h3 className="text-sm font-semibold text-[#24292f]">Edit profile</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[#57606a] hover:text-[#24292f] p-1 rounded transition-colors cursor-pointer"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          
          <div className="space-y-1">
            <label className="block font-semibold text-[#24292f]">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full px-2.5 py-1.5 bg-white border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] text-[#24292f]"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-[#24292f]">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Add a bio"
              rows={2}
              className="w-full px-2.5 py-1.5 bg-white border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] text-[#24292f] resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-[#24292f]">Company</label>
            <div className="relative flex items-center">
              <span className="absolute left-2.5 text-[#57606a]">
                <HiOutlineBuildingOffice2 className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company"
                className="w-full pl-9 pr-2.5 py-1.5 bg-white border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] text-[#24292f]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-[#24292f]">Location</label>
            <div className="relative flex items-center">
              <span className="absolute left-2.5 text-[#57606a]">
                <FiMapPin className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full pl-9 pr-2.5 py-1.5 bg-white border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] text-[#24292f]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-[#24292f]">Website</label>
            <div className="relative flex items-center">
              <span className="absolute left-2.5 text-[#57606a]">
                <FiLink className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://example.com"
                className="w-full pl-9 pr-2.5 py-1.5 bg-white border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] text-[#24292f]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-[#24292f]">Email</label>
            <div className="relative flex items-center">
              <span className="absolute left-2.5 text-[#57606a]">
                <FiMail className="w-4 h-4" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full pl-9 pr-2.5 py-1.5 bg-white border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] text-[#24292f]"
              />
            </div>
          </div>

          <div className="space-y-2 pt-1 border-t border-[#d0d7de]">
            <div className="flex items-center justify-between">
              <label className="block font-semibold text-[#24292f]">Social accounts</label>
              <button
                type="button"
                onClick={handleAddSocial}
                className="text-[#0969da] hover:underline flex items-center gap-1 font-medium cursor-pointer"
              >
                <FiPlus className="w-3.5 h-3.5" /> Add account
              </button>
            </div>

            <div className="space-y-2">
              {socials.map((social, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="relative flex items-center flex-1">
                    <span className="absolute left-2.5 text-[#57606a]">
                      {social.includes("instagram.com") ? (
                        <FiInstagram className="w-4 h-4" />
                      ) : (
                        <FiLink className="w-4 h-4" />
                      )}
                    </span>
                    <input
                      type="text"
                      value={social}
                      onChange={(e) => handleSocialChange(index, e.target.value)}
                      placeholder="Link to social profile"
                      className="w-full pl-9 pr-2.5 py-1.5 bg-white border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] text-[#24292f]"
                    />
                  </div>
                  {socials.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSocial(index)}
                      className="text-[#cf222e] hover:bg-[#ffebe9] p-2 rounded border border-transparent hover:border-[#ff818266] transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-[#d0d7de]">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-3 py-1.5 bg-[#2da44e] hover:bg-[#2c974b] text-white font-medium rounded-md shadow-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 bg-[#f6f8fa] hover:bg-[#f3f4f6] border border-[#d0d7de] text-[#24292f] font-medium rounded-md shadow-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}