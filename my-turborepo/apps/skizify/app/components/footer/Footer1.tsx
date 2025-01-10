import React from 'react'
import Content from './Content';

export default function Footer1() {
  return (
    <div 
      className='relative h-[500px]'
      style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
    >
      <div className='fixed bottom-0 h-[500px] w-full'>
        <Content />
      </div>
    </div>
  )
}