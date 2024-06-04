import { JSX, SVGProps } from "react";
import { AppbarClient } from "../components/AppbarClient";
import { Sidebar } from "../components/SideBar/Sidebar";


//Use font-display for displaying special font
export default function Layout({
    children,
  }: {
    children: React.ReactNode;
  }): JSX.Element {
    return (
      <div className="flex w-screen">
        <Sidebar />
        <div className="w-full">
        <AppbarClient />
          {children}  
        </div>
      </div>
    );
  }

  //W-screen for full screen coverage
  //W-full for occupying the width of Parent
  //That's how you can occuply the whole screen size
  //For making squares use size-(any number)