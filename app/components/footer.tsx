import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0d0f12] text-[#7d8590] text-sm py-16 px-6 border-t border-[#1f242c] font-sans">
      <div className="max-w-[1280px] margin-0 mx-auto">
        
        <div className="mb-10">
          <div className="flex flex-col items-start">
            {/* Иконка GitHub */}
            <svg className="text-[#f0f6fc] mb-6 block" height="32" viewBox="0 0 16 16" width="32" fill="currentColor">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82A7.48 7.48 0 0 0 8 3.84c-.68.01-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
            </svg>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-3.5 bg-[#2ea44f] rounded-sm"></span>
              <span className="text-[#f0f6fc] font-semibold text-[13px] uppercase tracking-wider">The Developer Newsletter</span>
            </div>
            <p className="leading-normal text-[#8b949e] m-0 mb-4">
              Get tips, technical guides, and best practices.<br />
              Twice a month. Right in your inbox.
            </p>
            <button className="bg-[#1f883d] text-white border border-[rgba(240,246,252,0.1)] py-1.5 px-4 text-sm font-semibold rounded-md hover:bg-[#1a7f37] transition-colors cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>

        <hr className="border-0 border-t border-[#21262d] my-10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-[#f0f6fc] text-12 font-semibold uppercase mb-4 tracking-wider">Platform</h3>
            <ul className="list-none p-0 m-0 space-y-3">
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Features</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Enterprise</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Copilot</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">AI</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Security</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Pricing</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Team</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Resources</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Roadmap</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Compare GitHub</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#f0f6fc] text-12 font-semibold uppercase mb-4 tracking-wider">Ecosystem</h3>
            <ul className="list-none p-0 m-0 space-y-3">
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Developer API</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Partners</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Education</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">GitHub CLI</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">GitHub Desktop</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">GitHub Mobile</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">GitHub Marketplace</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">MCP Registry</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#f0f6fc] text-12 font-semibold uppercase mb-4 tracking-wider">Support</h3>
            <ul className="list-none p-0 m-0 space-y-3">
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Docs</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Community Forum</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Professional Services</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Premium Support</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Skills</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Status</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Contact GitHub</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">What is Git?</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Sitemap</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#f0f6fc] text-12 font-semibold uppercase mb-4 tracking-wider">Company</h3>
            <ul className="list-none p-0 m-0 space-y-3">
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">About</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Why GitHub</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Customer Stories</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Blog</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">The ReadME Project</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Careers</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Newsroom</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Inclusion</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Social Impact</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline hover:text-[#2f81f7] transition-colors">Shop</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-0 border-t border-[#21262d] my-10" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs">
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-[#8b949e]">© {new Date().getFullYear()} GitHub, Inc.</span>
            <ul className="flex flex-wrap list-none p-0 m-0 gap-4">
              <li><a href="#" className="text-[#8b949e] no-underline text-[11px] uppercase tracking-wider hover:text-[#2f81f7] transition-colors">Terms</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline text-[11px] uppercase tracking-wider hover:text-[#2f81f7] transition-colors">Privacy</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline text-[11px] uppercase tracking-wider hover:text-[#2f81f7] transition-colors">Manage cookies</a></li>
              <li><a href="#" className="text-[#8b949e] no-underline text-[11px] uppercase tracking-wider hover:text-[#2f81f7] transition-colors">Do not share my personal information</a></li>
            </ul>
          </div>
          
          <div className="flex flex-row md:flex-row justify-between w-full md:w-auto items-center gap-6">
            <div className="flex gap-4">
              <a href="#" aria-label="LinkedIn" className="text-[#7d8590] no-underline font-bold text-sm hover:text-[#f0f6fc] transition-colors">In</a>
              <a href="#" aria-label="Instagram" className="text-[#7d8590] no-underline font-bold text-sm hover:text-[#f0f6fc] transition-colors">Ig</a>
              <a href="#" aria-label="YouTube" className="text-[#7d8590] no-underline font-bold text-sm hover:text-[#f0f6fc] transition-colors">Yt</a>
              <a href="#" aria-label="X" className="text-[#7d8590] no-underline font-bold text-sm hover:text-[#f0f6fc] transition-colors">X</a>
              <a href="#" aria-label="TikTok" className="text-[#7d8590] no-underline font-bold text-sm hover:text-[#f0f6fc] transition-colors">Tk</a>
              <a href="#" aria-label="Twitch" className="text-[#7d8590] no-underline font-bold text-sm hover:text-[#f0f6fc] transition-colors">Tw</a>
              <a href="#" aria-label="GitHub" className="text-[#7d8590] no-underline font-bold text-sm hover:text-[#f0f6fc] transition-colors">Gh</a>
            </div>
            
            <div className="flex items-center gap-1.5 border border-[#30363d] py-1 px-3 rounded-md cursor-pointer text-[#f0f6fc] bg-[#161b22] hover:bg-[#21262d] transition-colors">
              <svg className="text-current" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM5.78 8.75a9.64 9.64 0 0 0 1.37 4.897c-.941-.334-1.742-.962-2.292-1.777C4.331 10.97 4 9.894 4 8.75Zm4.44 4.897a9.64 9.64 0 0 0 1.37-4.897c0-1.144-.33-2.22-.858-3.12a7.98 7.98 0 0 1-2.292 1.777 9.64 9.64 0 0 0 1.37 4.897 7.99 7.99 0 0 1 .41 1.343ZM8 1.15a8.46 8.46 0 0 1 1.43 3.65 8.46 8.46 0 0 1-2.86 0A8.46 8.46 0 0 1 8 1.15Zm-2.33 3.9a9.64 9.64 0 0 0-1.37 4.898c0 1.143.33 2.219.858 3.12a7.981 7.981 0 0 1 2.292-1.778 9.64 9.64 0 0 0-1.37-4.897 7.986 7.986 0 0 1-.41-1.343Zm6.55 3.7c0 1.144-.33 2.22-.858 3.12a7.981 7.981 0 0 1-2.292-1.778 9.64 9.64 0 0 0 1.37-4.897 7.986 7.986 0 0 1 .41 1.343c.25.385.45.8.59 1.24a8.46 8.46 0 0 1-1.43 3.65 8.46 8.46 0 0 1-2.86 0 8.46 8.46 0 0 1 1.43-3.65Z"></path>
              </svg>
              <span>English</span>
              <span className="text-[9px] text-[#8b949e] ml-1">▼</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;