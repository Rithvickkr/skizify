import { JSX } from "react";
import { SidebarDemo } from "../components/SideBar/SidebarDemo";
import MyPage from "../components/dummymodel";


//Use font-display for displaying special font
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
 
  return (
    <div className="h-full">
      <SidebarDemo children={children} />
      {/* <MyPage  /> */}
      
    </div>
  );
}

//W-screen for full screen coverage
//W-full for occupying the width of Parent
//That's how you can occuply the whole screen size
//For making squares use size-(any number)
