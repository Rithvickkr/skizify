// app/page.tsx
'use client'

import { ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      {/* Animated background gradients */}
      <div 
        className="fixed inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(29, 78, 216, 0.15), 
            transparent 80%),
            radial-gradient(800px at ${mousePosition.x * 0.5}px ${mousePosition.y * 0.5}px, 
            rgba(124, 58, 237, 0.1), 
            transparent 80%)
          `
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center space-x-4">
          <svg className="w-8 h-8" viewBox="0 0 24 24">
            <path 
              fill="currentColor" 
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            />
          </svg>
          <div className="hidden md:flex space-x-6 text-gray-300">
            <a href="#" className="hover:text-white transition-colors">Product</a>
            <a href="#" className="hover:text-white transition-colors">Resources</a>
            <a href="#" className="hover:text-white transition-colors">Docs</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-300 hover:text-white transition-colors">
            Book a demo
          </button>
          <button className="text-gray-300 hover:text-white transition-colors">
            Sign in
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-24">
        {/* New Feature Banner */}
        <div className="flex justify-center mb-12">
          <a
            href="#"
            className="group flex items-center space-x-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2 hover:border-white/20 transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="bg-pink-500/10 text-pink-400 px-2 py-0.5 rounded-full text-sm font-medium">
              New
            </span>
            <span className="text-gray-300">AI Copilots ready to drop into your app</span>
            <ArrowRight 
              className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${
                isHovered ? 'transform translate-x-1' : ''
              }`}
            />
          </a>
        </div>

        {/* Main Header */}
        <div className="text-center space-y-8">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
            <span className="inline-block mb-2">Ready-made</span>
            <br />
            <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              collaborative features
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Liveblocks provides customizable pre-built features that boost user engagement 
            by adding collaboration to your product. All without derailing your roadmap.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 pt-8">
            <button className="w-full md:w-auto px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Start today for free
            </button>
            <button className="w-full md:w-auto px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all font-medium">
              Book a demo
              <ArrowRight className="inline ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0A0A0A]/80 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-400">Fast to implement. Add features to your product in days, not months.</span>
            </div>
            <div className="flex items-center space-x-4 text-gray-400">
              <span>2</span>
              <span>/</span>
              <span>Chat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}