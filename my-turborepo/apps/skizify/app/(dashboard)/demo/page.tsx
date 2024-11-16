"use client"
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Pin, PinOff, Fullscreen, PictureInPicture, PictureInPicture2, EllipsisVertical } from 'lucide-react';

const VideoGrid = () => {
  const [pinnedVideo, setPinnedVideo] = useState(null);
  const [selectPinTabs, setSelectPinTabs] = useState([false, false, false, false]);
  const [pipActiveIndex, setPipActiveIndex] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const videoRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  const togglePinTab = (index : any) => {
    const newSelectPinTabs = selectPinTabs.map((_, i) => i === index);
    setSelectPinTabs(newSelectPinTabs);
  };

  const handlePin = (index : any) => {
    setPinnedVideo(pinnedVideo === index ? null : index);
  };

  const renderVideo = (index : any, title : any) => {
    const isPipAvailable = "pictureInPictureEnabled" in document;
    const isPinned = pinnedVideo === index;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        key={`video-container-${index}`}
        className={`relative overflow-hidden rounded-lg border border-neutral-400 dark:border-neutral-700 ${
          isPinned
            ? "col-span-1 h-full w-full" // Pinned video container
            : pinnedVideo !== null
            ? "h-full w-full" // Unpinned videos when there's a pinned video
            : "h-full w-full" // Normal state videos
        }`}
        onClick={() => togglePinTab(index)}
      >
        <video
          ref={videoRefs[index]}
          autoPlay
          playsInline
          controls={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <motion.div 
          className="absolute bottom-2 left-2 rounded bg-black bg-opacity-50 px-2 py-1 text-sm text-white"
          initial={false}
          animate={{ opacity: selectPinTabs[index] ? 0 : 1 }}
        >
          {title}
        </motion.div>
        
        {/* Hover controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: selectPinTabs[index] ? 1 : 0 }}
          className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-200"
        >
          <motion.div className="absolute left-1/2 top-1/2 flex min-w-28 -translate-x-1/2 -translate-y-1/2 transform items-center justify-between gap-2 rounded-full bg-black/70 p-2 backdrop-blur-sm">
            <motion.button
              className="rounded-full p-2 text-white transition-colors hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                handlePin(index);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPinned ? (
                <PinOff className="size-5 sm:size-6" />
              ) : (
                <Pin className="size-5 sm:size-6" />
              )}
            </motion.button>


            <motion.button
              className="rounded-full p-2 text-white transition-colors hover:bg-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <EllipsisVertical className="size-5 sm:size-6" />
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="flex h-[calc(100vh-120px)] w-full rounded-xl bg-gradient-to-r from-neutral-900 via-black to-neutral-900">
      <div className="flex h-full w-full flex-col p-4 lg:flex-row lg:gap-4">
        {pinnedVideo !== null ? (
          // Layout when a video is pinned
          <>
            {/* Pinned video section - 80% width on desktop */}
            <div className="h-[60vh] w-full lg:h-full lg:w-4/5">
              {renderVideo(pinnedVideo, `Video ${pinnedVideo + 1}`)}
            </div>
            
            {/* Sidebar with other videos - 20% width on desktop */}
            <div className="mt-4 flex h-[30vh] w-full flex-row gap-2 overflow-x-auto lg:mt-0 lg:h-full lg:w-1/5 lg:flex-col lg:overflow-y-auto">
              {[0, 1, 2, 3].filter(index => index !== pinnedVideo).map(index => (
                <div key={index} className="h-full w-[200px] flex-none lg:h-1/3 lg:w-full">
                  {renderVideo(index, `Video ${index + 1}`)}
                </div>
              ))}
            </div>
          </>
        ) : (
          // Grid layout when no video is pinned
          <div className="grid h-full w-full grid-cols-1 gap-4 sm:grid-cols-2">
            {[0, 1, 2, 3].map(index => renderVideo(index, `Video ${index + 1}`))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoGrid;