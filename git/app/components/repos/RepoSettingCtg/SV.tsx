'use client';

import { useState } from 'react';

export default function ActionsSecretsAndVariables() {
  const [activeSubTab, setActiveSubTab] = useState<'secrets' | 'variables'>('secrets');

  return (
    <div>
      <h2 className="text-2xl font-normal pb-2 border-b border-[#d0d7de]">
        Actions secrets and variables
      </h2>

      <div className="mt-4 space-y-3">
        <p className="text-xs text-[#57606a] leading-relaxed">
          Secrets and variables allow you to manage reusable configuration data. Secrets are <strong>encrypted</strong> and are used for sensitive data.{' '}
          <a href="#" className="text-[#0969da] hover:underline">Learn more about encrypted secrets.</a> Variables are shown as plain text and are used for <strong>non-sensitive</strong> data.{' '}
          <a href="#" className="text-[#0969da] hover:underline">Learn more about variables.</a>
        </p>
        <p className="text-xs text-[#57606a] leading-relaxed">
          Anyone with collaborator access to this repository can use these secrets and variables for actions. They are not passed to workflows that are triggered by a pull request from a fork.
        </p>

        <div className="flex border-b border-[#d0d7de] pt-4">
          <button
            onClick={() => setActiveSubTab('secrets')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
              activeSubTab === 'secrets'
                ? 'border-[#fd8c73] text-[#24292f]'
                : 'border-transparent text-[#57606a] hover:text-[#24292f]'
            }`}
          >
            Secrets
          </button>
          <button
            onClick={() => setActiveSubTab('variables')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
              activeSubTab === 'variables'
                ? 'border-[#fd8c73] text-[#24292f]'
                : 'border-transparent text-[#57606a] hover:text-[#24292f]'
            }`}
          >
            Variables
          </button>
        </div>

        {activeSubTab === 'secrets' && (
          <div className="space-y-6 pt-4">
            {/* Environment secrets */}
            <div className="space-y-2">
              <h3 className="font-semibold text-base text-[#24292f]">Environment secrets</h3>
              <div className="border border-[#d0d7de] rounded-md p-8 bg-white text-center space-y-3">
                <p className="text-sm text-[#57606a]">This environment has no secrets.</p>
                <div>
                  <button className="px-4 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md font-medium text-sm hover:bg-[#f3f4f6] active:bg-[#edeff2] transition-colors cursor-pointer text-[#24292f]">
                    Manage environment secrets
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="font-semibold text-base text-[#24292f]">Repository secrets</h3>
              <div className="border border-[#d0d7de] rounded-md p-8 bg-white text-center space-y-3">
                <p className="text-sm text-[#57606a]">This repository has no secrets.</p>
                <div>
                  <button className="px-4 py-1.5 bg-[#2da44e] border border-[rgba(27,31,36,0.15)] rounded-md font-medium text-sm text-white hover:bg-[#2c974b] active:bg-[#298e46] transition-colors cursor-pointer shadow-sm">
                    New repository secret
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'variables' && (
          <div className="space-y-6 pt-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-base text-[#24292f]">Environment variables</h3>
              <div className="border border-[#d0d7de] rounded-md p-8 bg-white text-center space-y-3">
                <p className="text-sm text-[#57606a]">This environment has no variables.</p>
                <div>
                  <button className="px-4 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md font-medium text-sm hover:bg-[#f3f4f6] active:bg-[#edeff2] transition-colors cursor-pointer text-[#24292f]">
                    Manage environment variables
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="font-semibold text-base text-[#24292f]">Repository variables</h3>
              <div className="border border-[#d0d7de] rounded-md p-8 bg-white text-center space-y-3">
                <p className="text-sm text-[#57606a]">This repository has no variables.</p>
                <div>
                  <button className="px-4 py-1.5 bg-[#2da44e] border border-[rgba(27,31,36,0.15)] rounded-md font-medium text-sm text-white hover:bg-[#2c974b] active:bg-[#298e46] transition-colors cursor-pointer shadow-sm">
                    New repository variable
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}