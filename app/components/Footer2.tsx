'use client'
import Link from "next/link";
import { useState , useEffect } from "react";
const Footer = () => {
const [username, setUsername] = useState("");
useEffect(() => {
  const savedUser = localStorage.getItem("github_user");
  if (savedUser) {
    setUsername(savedUser);
  }
}, []);


    const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Security", href: "/security" },
    { label: "Status", href: "/status" },
    { label: "Community", href: "/community" },
    { label: "Docs", href: "/docs" },
    { label: "Contact", href: "/contact" },
    { label: "Manage cookies", href: "/manage-cookies" },
    { label: "Do not share my personal information", href: "/privacy-choices" },
  ];

  return (
    <footer className="w-full bg-[#ffffff] border-t border-[#d0d7de] py-10 px-4 mt-auto">
      <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-start md:justify-center gap-x-4 gap-y-2 text-[12px] text-[#57606a] font-sans">
        
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/${username}`} className="text-[#6e7781] hover:text-[#1f2328] transition-colors">
            <svg 
              height="24" 
              width="24" 
              viewBox="0 0 16 16" 
              aria-hidden="true" 
              className="fill-current"
            >
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82A7.48 7.48 0 0 0 8 2.81c-.68.003-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
            </svg>
          </Link>
          <span className="text-[#24292f]">© {currentYear} GitHub, Inc.</span>
        </div>

        {footerLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-[#0969da] hover:underline"
          >
            {link.label}
          </Link>
        ))}

      </div>
    </footer>
  );
};

export default Footer;