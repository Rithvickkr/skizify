import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
// import {NextUIProvider} from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <Providers >
        {/* <NextUIProvider> */}
          {children}
        {/* </NextUIProvider> */}
      </Providers>
      </body>
    </html>
  );
}
//suppressHydrationWarning When there is a Mismatch of components 
// like Component is not adaptable to Dark mode then HydrationWarning will be there

