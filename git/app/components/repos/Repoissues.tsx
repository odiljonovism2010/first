"use client";

import { useEffect, useState } from "react";
import IssueSideBar from "../issues/IssueSideBar";
import Issues from "../issues/issues";
import Asigned from "../issues/Asigned";
import CreatedBy from "../issues/CreatedBy";
import Mentioned from "../issues/Mentioned";
import RecentAct from "../issues/RecentAct";

const Repoissues = () => {
  const [repoTab, setRepoTab] = useState<string | null>(null);

  useEffect(() => {
    const savedTab = localStorage.getItem("active_repo_tab") || "Issues";
    setRepoTab(savedTab);
  }, []);

  const handleTabChange = (newTab: string) => {
    setRepoTab(newTab);
    localStorage.setItem("active_repo_tab", newTab);
  };

  if (repoTab === null) return null;

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row bg-[#ffffff] overflow-hidden">
      <IssueSideBar activeTab={repoTab} setActiveTab={handleTabChange} />

      <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
        {repoTab === "Issues" && <Issues />}
        {repoTab === "Assigned to me" && <Asigned />}
        {repoTab === "Created by me" && <CreatedBy />}
        {repoTab === "Mentioned" && <Mentioned />}
        {repoTab === "Recent activity" && <RecentAct />}

        {repoTab === "Views" && <h1 className="text-xl font-semibold">Views</h1>}
        {repoTab === "Projects" && <h1 className="text-xl font-semibold">Projects</h1>}
        {repoTab === "Milestones" && <h1 className="text-xl font-semibold">Milestones</h1>}
        {repoTab === "Labels" && <h1 className="text-xl font-semibold">Labels</h1>}
      </main>
    </div>
  );
};

export default Repoissues;