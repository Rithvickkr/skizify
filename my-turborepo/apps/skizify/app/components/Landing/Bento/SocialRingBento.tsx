import React from "react";
import { motion } from "framer-motion";
import { BsCalendarDate } from "react-icons/bs";

const SocialRingBento = () => {
    return (
        <div className="relative w-full h-[450px] overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-950 to-black p-4 md:p-8 shadow-2xl">
            {/* Background Layers */}
            <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                <div
                    className="animate-grain absolute inset-0"
                    style={{
                        background: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj4KICA8ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCI+CiAgICA8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCI+PC9mZVR1cmJ1bGVuY2U+CiAgPC9maWx0ZXI+CiAgPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNCI+PC9yZWN0Pgo8L3N2Zz4=")`
                    }}
                />
            </div>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/retrofutureblue.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.6,
              }}
            />


            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/90 to-transparent" />
            <div className="absolute inset-0 backdrop-blur-sm" />

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-2 w-2 rounded-full bg-white/30"
                        animate={{
                            y: [-20, -100],
                            x: Math.random() * 20 - 10,
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            {/* Main Content Container */}
            <div className="relative h-full flex flex-col justify-between">
                {/* Header Section - Positioned at top */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="z-10 pt-8"
                >
                    <motion.h2 className="text-4xl md:text-5xl font-bold tracking-tighter drop-shadow-2xl">
                        <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                            Skizify
                        </span>{" "}
                        <span className="bg-gradient-to-r from-neutral-400 to-neutral-500 bg-clip-text text-transparent">
                            Integration
                        </span>
                    </motion.h2>
                    <motion.p
                        className="mt-4 max-w-md text-neutral-400 drop-shadow-sm text-base md:text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Your all-in-one platform for seamless collaboration and productivity
                    </motion.p>
                </motion.div>

                {/* Rings Section - Positioned in bottom right */}
                <div className="absolute bottom-0 right-0 w-[150%] aspect-square">
                    <motion.div
                        initial={{ y: 200 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative w-full h-full"
                    >
                        <div className="absolute inset-0 rounded-2xl  bg-blue-500/10 blur-[120px]" />
                        
                        {/* Outer Ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 opacity-40"
                        >
                            <div className="h-full w-full rounded-2xl border-2 border-white/20 shadow-2xl shadow-black" />
                        </motion.div>

                        {/* Middle Ring */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[15%] opacity-60"
                        >
                            <div className="h-full w-full rounded-2xl border-[1.5px] border-white/30 shadow-2xl shadow-black" />
                        </motion.div>

                        {/* Inner Ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[28%] opacity-80"
                        >
                            <div className="h-full w-full rounded-2xl border border-white/40 shadow-2xl shadow-black" />
                        </motion.div>
                        
                    </motion.div>
                </div>

                {/* Bottom Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="z-10 pb-8"
                >
                    <p className="text-base md:text-lg font-semibold text-white/90 drop-shadow-lg">
                        Streamline your workflow with Skizify
                    </p>
                    <div className="flex gap-4 text-sm md:text-base font-medium text-white/70 mt-3">
                        <span className="hover:text-blue-400 transition-colors">AI-Powered</span>
                        <span className="text-blue-500">•</span>
                        <span className="hover:text-blue-400 transition-colors">Real-time Sync</span>
                        <span className="text-blue-500">•</span>
                        <span className="hover:text-blue-400 transition-colors">Smart Integration</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SocialRingBento;