"use client"
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes'
import { RecoilRoot } from 'recoil';

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
      <SessionProvider>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
        <div className='dark:bg-[#020817] '>
        <RecoilRoot>
          {children}
        </RecoilRoot>
        </div>
        </ThemeProvider>
      </SessionProvider>
    );
  };
  // This File is made seprately as we can't use Session Provider and Theme provider
  
  // in normal Project as then we have to make the Whole Project into client component 
  // That's why we have made the Seprate File name providers 