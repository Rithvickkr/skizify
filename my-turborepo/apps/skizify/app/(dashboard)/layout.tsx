import { JSX, SVGProps } from "react";
import { AppbarClient } from "../components/AppbarClient";
import { Sidebar } from "../components/SideBar/Sidebar";
import { SidebarDemo } from "../components/SideBar/NewSidebar";

//Use font-display for displaying special font
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
      <SidebarDemo children={children} />
  );
}

//W-screen for full screen coverage
//W-full for occupying the width of Parent
//That's how you can occuply the whole screen size
//For making squares use size-(any number)
