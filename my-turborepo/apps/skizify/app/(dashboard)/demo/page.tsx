"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Pin, PinOff } from "lucide-react";

const VideoMeeting = () => {
  const [pinnedVideo, setPinnedVideo] = useState<number | null>(null);

  const togglePin = (index: number) => {
    setPinnedVideo(pinnedVideo === index ? null : index);
  };

  const renderVideo = (index: number, title: string, totalVideos: number) => {
    const isPinned = pinnedVideo === index;
    const hasPinnedVideo = pinnedVideo !== null;

    // Base styles for all screen sizes
    let videoStyles = "relative rounded-lg border border-neutral-600 bg-neutral-500";

    return (
      <motion.div
        key={`video-container-${index}`}
        className={`${videoStyles} ${
          isPinned
            ? "md:col-span-1 md:row-span-3 h-64 md:h-auto" // Added fixed height for mobile
            : `w-full ${hasPinnedVideo ?  " h-40" : " h-auto"} md:h-auto ${hasPinnedVideo ? "md:w-full" : "w-full"}` // Modified width and height for mobile
        }`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          order: hasPinnedVideo ? (isPinned ? -1 : index) : index,
          gridColumn: hasPinnedVideo && window.innerWidth >= 768 ? (isPinned ? 1 : 2) : "auto"
        }}
      >
        <div className="absolute bottom-2 left-2 py-1 px-2 rounded bg-neutral-800 text-white flex items-center justify-center">
          {title}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePin(index);
          }}
          className="absolute top-2 right-2 rounded-full bg-neutral-500 p-2 text-white hover:bg-neutral-500"
        >
          {isPinned ? <PinOff size={20} /> : <Pin size={20} />}
        </button>
      </motion.div>
    );
  };

  return (
    <div className="flex justify-center">
      <div 
        className={`
          w-full p-1 gap-4 h-screen
          ${pinnedVideo !== null 
            ? "flex flex-col md:grid md:grid-cols-[3fr_1fr]" // Use flex column for mobile when pinned
            : "grid grid-cols-1 md:grid-cols-2"} // Grid for unpinned state
        `}
      >
        {[0, 1, 2, 3].map((index) => renderVideo(index, `Video ${index + 1}`, 4))}
      </div>
    </div>
  );
};

export default VideoMeeting;