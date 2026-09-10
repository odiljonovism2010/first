'use client';

import  { useState, useEffect } from 'react';
import SeetingTab from '../repos/SettingTab'; 
import General from "./RepoSettingCtg/GeneralSetting";
import Branch from "./RepoSettingCtg/BranchSetting";
import Actions from "./RepoSettingCtg/ActionsSetting";
import SV from "./RepoSettingCtg/SV";
import Page from "./RepoSettingCtg/Pagessetting";

export default function RepoSettings() {
  const [activeTab, setActiveTab] = useState<string>('general');
  const [username, setUsername] = useState<string>('');
  const [repoName, setRepoName] = useState<string>('');
  const [newRepoName, setNewRepoName] = useState<string>('');
  const [defaultBranch, setDefaultBranch] = useState<string>('main');
  const [isTemplate, setIsTemplate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const storedUser = localStorage.getItem('github_user') || '';
    const storedRepo = localStorage.getItem('last_repo') || '';
    
    setUsername(storedUser);
    setRepoName(storedRepo);
    setNewRepoName(storedRepo);

    fetchRepoData(storedUser, storedRepo);
  }, []);

  const fetchRepoData = async (owner: string, repo: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      if (response.ok) {
        const data = await response.json();
        setDefaultBranch(data.default_branch || 'main');
        setIsTemplate(data.is_template || false);
        setNewRepoName(data.name);
      }
    } catch (error) {
      console.error('Error fetching repo settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRename = async () => {
    setSaving(true);
    setMessage('');
    try {
      const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newRepoName })
      });

      if (response.ok) {
        setRepoName(newRepoName);
        localStorage.setItem('last_repo', newRepoName);
        setMessage('Repository renamed successfully!');
      } else {
        setMessage('Failed to rename repository (Check API Token permissions).');
      }
    } catch (error) {
      console.error('Error updating repository:', error);
      setMessage('An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#ffffff] text-[#57606a]">
        Loading settings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#24292f] font-sans flex justify-center p-3 sm:p-6">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-4 lg:gap-8 lg:pr-10">
        
        <SeetingTab currentTab={activeTab} onSelectTab={setActiveTab} />

        <main className="flex-1 bg-white min-w-0 overflow-x-auto">
          {activeTab === 'general' && (
            <General 
              message={message}
              newRepoName={newRepoName}
              setNewRepoName={setNewRepoName}
              handleRename={handleRename}
              saving={saving}
              isTemplate={isTemplate}
              setIsTemplate={setIsTemplate}
              defaultBranch={defaultBranch}
            />
          )}

          {activeTab === 'branches' && <Branch />}
          {activeTab === 'actions' && <Actions />}
          {activeTab === 'secrets' && <SV />}
          {activeTab === 'pages' && <Page />}
        </main>

      </div>
    </div>
  );
}