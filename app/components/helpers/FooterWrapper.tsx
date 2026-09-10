"use client";

import { usePathname } from "next/navigation";
import Footer2 from "../Footer2"; 

export default function HeaderWrapper() {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/git-registration"  ) {
    return null;
  }

  return <Footer2/>;
}