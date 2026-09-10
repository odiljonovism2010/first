"use client";

import { useEffect, useState } from "react";
import RepoCode  from "../../../components/repos/RepoCode";
import PreHeader from "../../../components/repos/PreHeader";
import RepoIssues from "../../../components/repos/Repoissues";
import SQ from "../../../components/issues/SQ"
import RepoSetting from "../../../components/repos/RepoSettings";
import RepoRequest from "../../../components/repos/RepoPullRequest"
export default function Page() {
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const updateTab = () => {
      setActiveTab(localStorage.getItem("activeTab") || "");
    };

    updateTab();

    window.addEventListener("activeTabChanged", updateTab);

    return () => {
      window.removeEventListener("activeTabChanged", updateTab);
    };
  }, []);

  switch (activeTab) {
    case "Code":
      return (
        <>
          <PreHeader />
          <RepoCode></RepoCode>
        </>
      );

    case "Issues":
      return (
        <>
          <PreHeader />
          <RepoIssues/>
        </>
      );

    case "Pull requests":
      return (
        <>
          <PreHeader />
<RepoRequest></RepoRequest>
        </>
      );

    

   

    case "Projects":
      return (
        <>
          <PreHeader />
          Projects 
        </>
      );

   

    case "Security and quality":
      return (
        <>
          <PreHeader />
          <SQ></SQ>
        </>
      );

   

    case "Settings":
      return (
        <>
          <PreHeader />
   <RepoSetting></RepoSetting>
        </>
      );

    default:
      return (
        <>
          <PreHeader />
          Code 
        </>
      );
  }
}