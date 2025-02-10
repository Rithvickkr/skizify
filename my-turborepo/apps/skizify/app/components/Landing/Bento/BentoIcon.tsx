"use client";
import React from "react";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

const BentoIcon: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-full w-full overflow-hidden rounded-xl"
      // whileHover={{ scale: 1.02 }}
    >
      {/* Enhanced animated background */}
      <div className="absolute inset-0 opacity-40 mix-blend-overlay">
        <div
          className="animate-grain absolute inset-0"
          style={{
            background: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj4KICA8ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCI+CiAgICA8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCI+PC9mZVR1cmJ1bGVuY2U+CiAgPC9maWx0ZXI+CiAgPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNCI+PC9yZWN0Pgo8L3N2Zz4=")`,
          }}
        />
      </div>
      <div className="absolute inset-0 z-20 bg-black/30" />


       <Spline
        className="absolute inset-0 object-cover scale-150 "
        scene="https://prod.spline.design/s0o0errUn4ELdAsi/scene.splinecode" 
      />
 


      

      {/* Enhanced background images */}
      <motion.div
        className="absolute inset-0 right-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          backgroundImage: "url('/retrofuturered2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.7,
        }}
      />
      {/* <motion.div
        className="absolute top-0 size-80 z-50"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 0.7 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: "url('/selectcard2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      /> */}

      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-red-600/40 via-red-500/20 to-transparent" />

      {/* Enhanced floating orbs */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -left-1/2 -top-1/2 h-full w-full rounded-full bg-gradient-to-r from-red-500/30 to-orange-500/20 blur-xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -right-1/2 h-full w-full rounded-full bg-gradient-to-l from-red-600/30 to-pink-500/20 blur-xl"
        />
      </div>

      {/* Enhanced content section */}
      <div className="relative z-40 flex h-full flex-col justify-end p-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.3,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          <div className="relative">
            <motion.h2 
              className="mb-4 text-3xl sm:text-4xl font-extrabold"
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] [text-shadow:_0_1px_1px_rgb(255_255_255_/_30%)]">
              1:1 Meetings Reimagined
              </span>
            </motion.h2>
            <motion.p 
              className="text-sm sm:text-base leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="bg-gradient-to-r from-red-100 to-red-300 bg-clip-text text-transparent">
                Transform your one-on-one meetings with AI-powered insights,
                real-time transcription, and smart action items. Never miss a key
                discussion point again.
              </span>
            </motion.p>
          </div>
          
          {/* Enhanced floating orb */}
          <motion.div
            className="absolute -top-4 -left-4 h-24 w-24 bg-gradient-to-r from-red-500/30 to-orange-500/30 rounded-full blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BentoIcon;
