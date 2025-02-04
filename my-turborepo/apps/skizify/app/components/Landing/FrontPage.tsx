'use client';

import { Button } from "../ui/button";
import { Spotlight } from '../../../components/ui/spotlight';

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      {/* Spotlight effect */}
      <Spotlight className="absolute inset-0" />
      
      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 max-w-7xl mx-auto">
        <span className="text-xl font-semibold">liveblocks</span>
        <div className="flex gap-6">
          <a href="#" className="text-gray-400 hover:text-white">Product</a>
          <a href="#" className="text-gray-400 hover:text-white">Resources</a>
          <a href="#" className="text-gray-400 hover:text-white">Docs</a>
          <a href="#" className="text-gray-400 hover:text-white">Pricing</a>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" className="text-gray-300">Book a demo</Button>
          <Button className="bg-white text-black px-6 py-2 rounded-md">Sign in</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center mt-32 px-6">
        <div className="bg-gray-800 text-sm px-4 py-1 rounded-full inline-flex items-center mb-4">
          <span className="text-pink-500 mr-2">New</span> AI Copilots ready to drop into your app
        </div>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Ready-made <br className="hidden md:block" /> collaborative features
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          Liveblocks provides customizable pre-built features that boost user engagement by adding collaboration to your product. All without derailing your roadmap.
        </p>
        <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
          <Button className="bg-white text-black px-6 py-3 rounded-md text-lg">Start today for free</Button>
          <Button variant="ghost" className="text-white text-lg">Book a demo →</Button>
        </div>
      </div>
    </div>
  );
}
