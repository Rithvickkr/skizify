"use client"
import React from 'react';
import Spline from '@splinetool/react-spline';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-gray-900">
      {/* Spline 3D model as the background */}
      <Spline
        className="absolute inset-0 w-full h-full object-cover"
        scene="https://prod.spline.design/h278ZWDgVFxWZ9qh/scene.splinecode"
      />

      {/* Monochrome overlay to give a dramatic, toned look */}
      <div className="absolute inset-0 bg-black opacity-10"></div>

      {/* Content Layer */}
      <div className="relative z-10 mt-28 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-white text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
          Welcome to the Future
        </h1>
        <p className="text-gray-300 text-lg md:text-2xl mb-8 max-w-2xl drop-shadow-md">
          Explore a realm where art meets technology. Dive into an experience that is as immersive as it is visually stunning.
        </p>
        <button
          className="bg-white text-gray-900 px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-300 transition-all duration-300 shadow-lg"
          onClick={() => {
            // Replace with your desired action (e.g., routing or modal popup)
            console.log("Get Started clicked");
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
