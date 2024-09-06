"use client";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import React from "react";
import { RecoilRoot } from "recoil";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="no-scrollbar w-full bg-black dark:bg-black">
            <RecoilRoot>{children}</RecoilRoot>
          </div>
        </ThemeProvider>
      </SessionProvider>
    </LocalizationProvider>
  );
};
// This File is made seprately as we can't use Session Provider and Theme provider

// in normal Project as then we have to make the Whole Project into client component
// That's why we have made the Seprate File name providers
