'use client';
import React from 'react';

interface BlurBottomScreenProps {
    children?: React.ReactNode;
    height?: string;
    blurAmount?: string;
}

const BlurBottomScreen: React.FC<BlurBottomScreenProps> = ({ 
    children, 
    height = '80px',
    blurAmount = '14px'
}) => {
    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-50"
            style={{
            height: height,
            background: 'linear-gradient(to bottom, transparent, rgba(30, 30, 30, 9.3))',
            backdropFilter: `blur(${blurAmount})`,
            WebkitBackdropFilter: `blur(${blurAmount})`,
            maskImage: 'linear-gradient(to bottom, transparent, black)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)'
            }}
        >
            {children}
        </div>
    );
};

export default BlurBottomScreen;