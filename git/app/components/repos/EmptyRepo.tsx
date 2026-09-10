"use client";

import React, { useState } from 'react';
import { Copy} from 'lucide-react';

interface QuickSetupProps {
  username: string;
  repoName: string;
}

const QuickSetup: React.FC<QuickSetupProps> = ({ username, repoName }) => {
  const [protocol, setProtocol] = useState<'HTTPS' | 'SSH'>('HTTPS');
  const repoUrl = protocol === 'HTTPS'
    ? `https://github.com/${username}/${repoName}.git`
    : `git@github.com:${username}/${repoName}.git`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const commandsNewRepo = [
    `echo "# ${repoName}" >> README.md`,
    'git init',
    'git add README.md',
    'git commit -m "first commit"',
    'git branch -M main',
    `git remote add origin ${repoUrl}`,
    'git push -u origin main',
  ];

  const commandsExistingRepo = [
    `git remote add origin ${repoUrl}`,
    'git branch -M main',
    'git push -u origin main',
  ];

  const ProtocolButton = ({ name }: { name: 'HTTPS' | 'SSH' }) => (
    <button
      onClick={() => setProtocol(name)}
      className={`px-3 py-1 text-xs rounded-md transition-all cursor-pointer ${
        protocol === name
          ? 'bg-white shadow-sm ring-1 ring-black ring-opacity-5 font-semibold text-gray-900'
          : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      {name}
    </button>
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 font-sans text-sm text-[#24292f] antialiased">
      
      <div className="bg-[#ddf4ff] border border-gray-300 rounded-t-lg p-5 space-y-4 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">
          Quick setup — if you’ve done this kind of thing before
        </h2>

    

        <p className="text-xs text-gray-600 leading-relaxed">
          Get started by{' '}
          <a href="#" className="text-[#0969da] hover:underline">
            creating a new file
          </a>{' '}
          or{' '}
          <a href="#" className="text-[#0969da] hover:underline">
            uploading an existing file
          </a>
          . We recommend every repository include a <code className="bg-white px-1 py-0.5 rounded border border-gray-200 font-mono text-[11px]">README</code>, <code className="bg-white px-1 py-0.5 rounded border border-gray-200 font-mono text-[11px]">LICENSE</code>, and <code className="bg-white px-1 py-0.5 rounded border border-gray-200 font-mono text-[11px]">.gitignore</code>.
        </p>
      </div>

      <div className="bg-white border-x border-b border-gray-300 p-5 space-y-3">
        <h3 className="font-semibold text-gray-900">
          ...or create a new repository on the command line
        </h3>

        <div className="relative group bg-[#f6f8fa] border border-gray-300 rounded-md p-4 font-mono text-xs text-gray-800 shadow-inner space-y-1.5 overflow-x-auto">
          {commandsNewRepo.map((cmd, index) => (
            <div key={index} className="select-all whitespace-nowrap">{cmd}</div>
          ))}
          <button
            onClick={() => handleCopy(commandsNewRepo.join('\n'))}
            title="Copy commands"
            className="absolute top-3 right-3 p-1.5 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-800 transition-shadow shadow-sm cursor-pointer"
          >
            <Copy size={14} />
          </button>
        </div>
      </div>

      <div className="bg-white border-x border-b border-gray-300 p-5 space-y-3 rounded-b-lg">
        <h3 className="font-semibold text-gray-900">
          ...or push an existing repository from the command line
        </h3>

        <div className="relative group bg-[#f6f8fa] border border-gray-300 rounded-md p-4 font-mono text-xs text-gray-800 shadow-inner space-y-1.5 overflow-x-auto">
          {commandsExistingRepo.map((cmd, index) => (
            <div key={index} className="select-all whitespace-nowrap">{cmd}</div>
          ))}
          <button
            onClick={() => handleCopy(commandsExistingRepo.join('\n'))}
            title="Copy commands"
            className="absolute top-3 right-3 p-1.5 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-800 transition-shadow shadow-sm cursor-pointer"
          >
            <Copy size={14} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default QuickSetup;