"use client"
import React from 'react'
import Content from './Content';
import { motion } from 'framer-motion';

export default function Footer1() {
  return (
    <div 
      className='relative h-[450px] rounded-t-[50px] bg-gradient-to-t from-[#1a1a1a] to-[#2a2a2a]'
      style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
    >
            {/* <motion.div
        className="absolute inset-0 rounded-[50px]"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          backgroundImage: "url('/retrofuturered.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.7,
        }}
      />
 */}
      <div className='fixed bottom-0 h-[400px] w-full'>
        <Content />
      </div>
    </div>
  )
}