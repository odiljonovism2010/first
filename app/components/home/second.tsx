import React from 'react';
import { Files, MessageSquare, Terminal, Settings, Sparkles, Send, Play } from 'lucide-react';

export default function GitHubLanding() {
  return (
    <div className="relative min-h-screen w-screen max-w-full bg-[#05081a] text-white font-sans overflow-x-hidden flex flex-col antialiased">
      
     
      <section className="relative w-full min-h-screen flex items-center justify-center p-4 md:p-12 lg:p-20 mt-[-40px] z-10 bg-[#05081a]">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[900px] h-[500px] md:h-[600px] rounded-full opacity-40 pointer-events-none blur-[110px] md:blur-[150px] z-0 bg-gradient-to-r from-[#7928ca] via-[#b624ff] to-[#0070f3]" />

        <div className="relative z-10 w-full max-w-[1150px] h-[600px] rounded-xl border border-[#30363d]/60 bg-[#0d1117]/85 text-[#c9d1d9] font-mono text-xs flex flex-col shadow-[0_0_60px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          
          <div className="h-11 border-b border-[#21262d] flex items-center px-4 justify-between bg-[#161b22]/90 rounded-t-xl">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="text-xs text-[#8b949e] font-sans pr-12">workspace — github-copilot</div>
            <div />
          </div>

          <div className="flex-1 flex overflow-hidden">
            
            <div className="w-12 border-r border-[#21262d] bg-[#0d1117]/60 flex flex-col items-center py-4 gap-6 text-[#8b949e]">
              <Files size={18} className="cursor-pointer hover:text-white transition-colors" />
              <MessageSquare size={18} className="text-[#58a6ff] cursor-pointer" />
              <Terminal size={18} className="cursor-pointer hover:text-white transition-colors" />
              <div className="flex-1" />
              <Settings size={18} className="cursor-pointer hover:text-white transition-colors" />
            </div>

            <div className="w-[43%] border-r border-[#21262d] bg-[#0d1117]/40 flex flex-col p-4 overflow-y-auto justify-between select-none">
              <div className="flex-1 flex flex-col">
                <div className="text-[10px] text-[#8b949e] uppercase font-bold tracking-wider mb-4 flex items-center gap-1.5 font-sans">
                  <Sparkles size={12} className="text-[#58a6ff]" /> GitHub Copilot: Chat
                </div>
                
                <div className="space-y-4 text-[11px] leading-relaxed">
                  <div className="bg-[#161b22]/80 border border-[#21262d] rounded-md p-3 font-mono text-[#c9d1d9] overflow-x-auto whitespace-pre">
                    <span className="text-[#ff7b72]">{`} else if `}</span>
                    <span className="text-[#c9d1d9]">{`(`}</span>
                    <span className="text-[#79c0ff]">downKey</span>
                    <span className="text-[#ff7b72]">{`.isDown) {`}</span>
                    {`\n    player.setVelocityY(`}<span className="text-[#79c0ff]">200</span>{`);\n`}
                    <span className="text-[#ff7b72]">{`} else {`}</span>
                    {`\n    player.setVelocityY(`}<span className="text-[#79c0ff]">0</span>{`);\n`}
                    <span className="text-[#ff7b72]">{`}`}</span>
                    {`\n\n`}
                    <span className="text-[#8b949e]">{`// Update method refactored to use the reusable function`}</span>{`\n`}
                    <span className="text-[#d2a8ff]">update</span>{`() {\n`}
                    <span className="text-[#8b949e]">{`  // Player 1 controls`}</span>{`\n`}
                    {`  updatePlayerVelocity(this.player1, this.cursors.left, t...\n\n`}
                    <span className="text-[#8b949e]">{`  // Player 2 controls`}</span>{`\n`}
                    {`  updatePlayerVelocity(this.player2, this.aKey, this.dKey\n`}
                    <span className="text-[#ff7b72]">{`}`}</span>
                  </div>

                  <div className="font-sans space-y-2 text-[#8b949e]">
                    <div className="text-white font-semibold text-xs">Explanation</div>
                    <ul className="list-none space-y-2 text-[11px]">
                      <li className="flex items-start gap-1">
                        <span className="text-[#58a6ff] mr-1">•</span>
                        <span><strong className="text-[#c9d1d9]">Reusable Function:</strong> <code className="bg-[#161b22] px-1 py-0.5 rounded font-mono text-[#79c0ff]">updatePlayerVelocity</code> handles the logic for setting the velocity based on key presses.</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="text-[#58a6ff] mr-1">•</span>
                        <span><strong className="text-[#c9d1d9]">Parameters:</strong> The function takes the player object and the corresponding control keys as parameters.</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="text-[#58a6ff] mr-1">•</span>
                        <span><strong className="text-[#c9d1d9]">Refactored update Method:</strong> The update method now calls <code className="bg-[#161b22] px-1 py-0.5 rounded font-mono text-[#c9d1d9]">updatePlayerVelocity</code> for both <code className="bg-[#161b22] px-1 py-0.5 rounded font-mono text-[#c9d1d9]">player1</code> and <code className="bg-[#161b22] px-1 py-0.5 rounded font-mono text-[#c9d1d9]">player2</code>, passing the appropriate keys.</span>
                      </li>
                    </ul>
                    <p className="text-[11px] pt-1 leading-normal text-[#8b949e]">This refactoring improves code maintainability by reducing duplication and making the code more modular.</p>
                  </div>
                </div>
              </div>

              <div className="relative mt-4">
                <input 
                  type="text" 
                  placeholder="Ask a question or type '/' for commands" 
                  className="w-full bg-[#161b22] border border-[#30363d] rounded-md pl-3 pr-10 py-2.5 text-[11px] text-[#c9d1d9] placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] transition-all font-sans"
                />
                <Send size={13} className="absolute right-3 top-3.5 text-[#484f58] cursor-pointer hover:text-[#58a6ff] transition-colors" />
              </div>
            </div>

            <div className="flex-1 bg-[#161b22]/10 flex flex-col relative">
              
              <div className="h-9 border-b border-[#21262d] bg-[#0d1117]/80 flex items-center text-[11px] text-[#8b949e]">
                <div className="h-full px-4 flex items-center bg-[#161b22]/40 text-[#c9d1d9] border-t-2 border-[#f78166] border-r border-[#21262d] cursor-pointer backdrop-blur-sm">
                  <span>game.ts</span>
                </div>
                <div className="h-full px-4 flex items-center border-r border-[#21262d]/60 opacity-60 cursor-pointer hover:bg-[#161b22]/30">
                  <span># characters.module.css</span>
                </div>
                <div className="h-full px-4 flex items-center opacity-60 cursor-pointer hover:bg-[#161b22]/30">
                  <span>bonus-level.ts</span>
                </div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto flex gap-4 font-mono text-[11px] leading-[1.4rem] select-text">
                <div className="text-right text-[#484f58] min-w-[24px] tracking-normal select-none">
                  {Array.from({ length: 36 }, (_, i) => 75 + i).map(num => (
                    <div key={num}>{num}</div>
                  ))}
                </div>

                <div className="flex-1 text-[#c9d1d9] whitespace-pre font-mono">
                  <span className="text-[#8b949e]">{`// Player 1 controls\n`}</span>
                  <span className="text-[#ff7b72]">if</span>{` (this.cursors.left.isDown) {\n`}
                  <span className="text-[#79c0ff]">{`  this.player1.setVelocityX(-200);\n`}</span>
                  {`} `}<span className="text-[#ff7b72]">else if</span>{` (this.cursors.right.isDown) {\n`}
                  <span className="text-[#79c0ff]">{`  this.player1.setVelocityX(200);\n`}</span>
                  {`} `}<span className="text-[#ff7b72]">else</span>{` {\n`}
                  <span className="text-[#79c0ff]">{`  this.player1.setVelocityX(0);\n`}</span>
                  {`}\n\n`}
                  <span className="text-[#ff7b72]">if</span>{` (this.cursors.up.isDown) {\n`}
                  <span className="text-[#79c0ff]">{`  this.player1.setVelocityY(-200);\n`}</span>
                  {`} `}<span className="text-[#ff7b72]">else if</span>{` (this.cursors.down.isDown) {\n`}
                  <span className="text-[#79c0ff]">{`  this.player1.setVelocityY(200);\n`}</span>
                  {`} `}<span className="text-[#ff7b72]">else</span>{` {\n`}
                  <span className="text-[#79c0ff]">{`  this.player1.setVelocityY(0);\n`}</span>
                  {`}\n\n`}
                  <span className="text-[#8b949e]">{`// Player 2 controls\n`}</span>
                  <span className="text-[#ff7b72]">if</span>{` (this.aKey.isDown) {\n`}
                  <span className="text-[#79c0ff]">{`  this.player2.setVelocityX(-200);\n`}</span>
                  {`} `}<span className="text-[#ff7b72]">else if</span>{` (this.dKey.isDown) {\n`}
                  <span className="text-[#79c0ff]">{`  this.player2.setVelocityX(200);\n`}</span>
                  {`} `}<span className="text-[#ff7b72]">else</span>{` {\n`}
                  <span className="text-[#79c0ff]">{`  this.player2.setVelocityX(0);\n`}</span>
                  {`}\n\n`}
                  <span className="text-[#ff7b72]">if</span>{` (this.wKey.isDown) {\n`}
                  <span className="text-[#79c0ff]">{`  this.player2.setVelocityY(-200);\n`}</span>
                  {`} `}<span className="text-[#ff7b72]">else if</span>{` (this.sKey.isDown) {\n`}
                  <span className="text-[#79c0ff]">{`  this.player2.setVelocityY(200);\n`}</span>
                  {`} `}<span className="text-[#ff7b72]">else</span>{` {\n`}
                  <span className="text-[#79c0ff]">{`  this.player2.setVelocityY(0);\n`}</span>
                  {`}`}
                </div>
              </div>

              <button className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] flex items-center justify-center border border-[#30363d] transition-all shadow-lg group">
                <Play size={13} className="fill-[#c9d1d9] ml-0.5 group-hover:scale-105 transition-transform" />
              </button>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}