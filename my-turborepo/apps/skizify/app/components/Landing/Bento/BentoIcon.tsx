"use client";
import React from "react";
import { motion } from "framer-motion";

const BentoIcon: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative h-full w-full overflow-hidden rounded-xl"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30 mix-blend-overlay">
        <div
          className="animate-grain absolute inset-0"
          style={{
            background: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj4KICA8ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCI+CiAgICA8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCI+PC9mZVR1cmJ1bGVuY2U+CiAgPC9maWx0ZXI+CiAgPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNCI+PC9yZWN0Pgo8L3N2Zz4=")`,
          }}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/retrofuturered2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.6,
        }}
      />
      <div
        className="absolute left-0 top-0 size-36"
        style={{
          backgroundImage: "url('/selectcard.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.6,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-tr from-red-600/30 to-transparent" />

      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -left-1/2 -top-1/2 h-full w-full rounded-full bg-gradient-to-r from-neutral-500/20 to-transparent blur-xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -right-1/2 h-full w-full rounded-full bg-gradient-to-l from-neutral-600/20 to-transparent blur-xl"
        />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col justify-end p-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white"
        >
          <h2 className="mb-2 bg-gradient-to-r from-neutral-200 to-white bg-clip-text text-xl font-bold text-transparent">
            1:1 Meetings Reimagined
          </h2>
          <p className="max-w-[80%] text-sm leading-relaxed text-neutral-300">
            Transform your one-on-one meetings with AI-powered insights,
            real-time transcription, and smart action items. Never miss a key
            discussion point again.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BentoIcon;
