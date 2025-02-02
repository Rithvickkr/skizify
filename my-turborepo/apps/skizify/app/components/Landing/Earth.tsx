"use client"
import Spline from '@splinetool/react-spline/next';

export default function Earth() {
  return (
    <main             className="w-full h-20 md:h-full z-10 relative">
      <Spline
        scene="https://prod.spline.design/xa7vl12mzbXmgiCi/scene.splinecode" 
        />
    </main>
  );
}
