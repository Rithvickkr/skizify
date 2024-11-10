"use client"
import { useState, useEffect } from "react";
import SkizzerModal from "./SkizzerModal"; // Adjust path as necessary

export default function MyPage() {
  const [isSkizzer, setIsSkizzer] = useState<boolean | null>(null);

  useEffect(() => {
    // We only want to check cookies in the client-side (browser)
    if (typeof window !== "undefined") {
      const isSkizzerCookie = document.cookie.includes("X-Is-Skizzer=true");
      setIsSkizzer(isSkizzerCookie);
    }
  }, []);

  // If we don't have the Skizzer info yet, show loading
  if (isSkizzer === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to My Page</h1>
      {/* Show the SkizzerModal only if the user is a Skizzer */}
      <SkizzerModal isSkizzer={isSkizzer} />
    </div>
  );
}
