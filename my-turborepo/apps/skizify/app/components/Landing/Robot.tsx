'use client'

import { SplineScene } from "../../../@repo/store/components/ui/splite";
import { Card } from "../../../@/components/ui/card";
import { Spotlight } from "../../../@repo/store/components/ui/Spotlight";
import { HoverCard } from "./HoverCard";
 
export function Robot() {
  return (
    <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden">
        <HoverCard>

      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
      />

            <div className="flex h-full">
        <div className="flex-1 relative">
          <SplineScene 
        scene="https://prod.spline.design/E12tL9nXP1IFs6vR/scene.splinecode" 
        className="w-full h-20 md:h-full z-10 relative"
          />
        </div>
        {/* Left content */}
        <div className="flex-1 bg-transparent p-8 relative flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Interactive 3D
          </h1>
          <p className="mt-4 text-neutral-300 max-w-lg">
            Bring your UI to life with beautiful 3D scenes. Create immersive experiences 
            that capture attention and enhance your design.
          </p>
        </div>

        {/* Right content */}
        <div className="flex-1 relative">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-20 md:h-full z-10 relative"
          />
        </div>
      </div>
      </HoverCard>
    </Card>
  )
}