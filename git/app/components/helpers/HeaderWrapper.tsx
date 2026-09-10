"use client";

import { usePathname } from "next/navigation";
import Header2 from "../Header2";

export default function HeaderWrapper() {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/git-registration") {
    return null;
  }

  return <Header2 />;
}