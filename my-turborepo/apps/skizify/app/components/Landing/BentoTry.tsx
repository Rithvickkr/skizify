"use client";
import React, { ReactNode } from "react";
import {
    Mail,
    User,
    Clock,
    Video,
    Lock,
    Edit,
    Star,
    Shield,
    Globe,
    Layers,
    Users,
    MessageSquare,
    CheckCircle,
} from "lucide-react";

interface BlockProps {
    mobileGridClasses?: string;
    gridClasses: string;
    title: string;
    description: string;
    quality: string;
    icon: ReactNode;
}

const Block: React.FC<BlockProps> = ({
    mobileGridClasses = "",
    gridClasses,
    title,
    description,
    quality,
    icon,
}) => {
    return (
        <div
            className={`flex flex-col border border-neutral-800/80 cursor-pointer rounded-md sm:rounded-xl bg-gradient-to-br from-neutral-800/60 to-black/60 p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105 ${mobileGridClasses} ${gridClasses}`}
        >
            <div className="flex flex-col flex-grow space-y-2">
                <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg text-neutral-200">{icon}</span>
                    <h3 className="text-xs sm:text-sm font-semibold text-neutral-200">{title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-400">{description}</p>
            </div>
            <div className="mt-4 flex justify-between text-xs text-neutral-500">
                <span>{quality}</span>
            </div>
        </div>
    );
};

const Home: React.FC = () => {
    const blocks = [
        {
            title: "Post Your Doubt",
            description: "Kickstart your learning by posting a query.",
            quality: "User-Controlled",
            icon: <Mail size={16} />,
            mobileGridClasses: "col-span-2 row-span-1",
            gridClasses: "col-span-1 row-span-1 sm:col-span-2 sm:row-span-2",
        },
        {
            title: "Skizzer Applications",
            description: "Verified experts apply to your doubt.",
            quality: "Verified Experts",
            icon: <User size={16} />,
            mobileGridClasses: "col-span-1 row-span-1",
            gridClasses: "col-span-1 row-span-1 sm:col-span-1 sm:row-span-2",
        },
        {
            title: "Custom Time & Budget",
            description: "Set flexible schedules & budgets.",
            quality: "Flexible",
            icon: <Clock size={16} />,
            mobileGridClasses: "col-span-1 row-span-1",
            gridClasses: "col-span-1 row-span-1 sm:col-span-1 sm:row-span-2",
        },
        {
            title: "Live Video Sessions",
            description: "One-on-one live video calls.",
            quality: "Interactive",
            icon: <Video size={16} />,
            mobileGridClasses: "col-span-2 row-span-1",
            gridClasses: "col-span-1 row-span-1 sm:col-span-2 sm:row-span-1",
        },
        {
            title: "Secure Transactions",
            description: "Only pay when satisfied.",
            quality: "Safe & Transparent",
            icon: <Lock size={16} />,
            mobileGridClasses: "col-span-2 row-span-1",
            gridClasses: "col-span-1 row-span-1 sm:col-span-2 sm:row-span-2",
        },
        {
            title: "Customized Learning",
            description: "Personalized learning for every need.",
            quality: "Personalized",
            icon: <Edit size={16} />,
            mobileGridClasses: "col-span-1 row-span-1",
            gridClasses: "col-span-1 row-span-1",
        },
        {
            title: "Review & Ratings",
            description: "Provide feedback to experts.",
            quality: "Community-Driven",
            icon: <Star size={16} />,
            mobileGridClasses: "col-span-1 row-span-1",
            gridClasses: "col-span-1 row-span-1",
        },
        {
            title: "End-to-End Encryption",
            description: "100% secure video sessions.",
            quality: "Encrypted",
            icon: <Shield size={16} />,
            mobileGridClasses: "col-span-1 row-span-1",
            gridClasses: "col-span-1 row-span-1 sm:col-span-1 sm:row-span-2",
        },
        {
            title: "Global Accessibility",
            description: "Connect worldwide!",
            quality: "Borderless Learning",
            icon: <Globe size={16} />,
            mobileGridClasses: "col-span-1 row-span-1",
            gridClasses: "col-span-1 row-span-1",
        },
        {
            title: "Multi-Topic Support",
            description: "Experts in various fields.",
            quality: "Diverse Expertise",
            icon: <Layers size={16} />,
            mobileGridClasses: "col-span-2 row-span-1",
            gridClasses: "col-span-1 row-span-1 sm:col-span-1 sm:row-span-2",
        },
        {
            title: "Community Discussions",
            description: "Join discussions & forums.",
            quality: "Collaborative",
            icon: <Users size={16} />,
            mobileGridClasses: "col-span-1 row-span-1",
            gridClasses: "col-span-1 row-span-1 sm:col-span-1 sm:row-span-2",
        },
        {
            title: "Instant Messaging",
            description: "Chat before sessions.",
            quality: "Real-Time Communication",
            icon: <MessageSquare size={16} />,
            mobileGridClasses: "col-span-1 row-span-1",
            gridClasses: "col-span-1 row-span-1 sm:col-span-1 sm:row-span-2",
        },
        {
            title: "Verified Skizzers",
            description: "Rigorously vetted professionals.",
            quality: "Trusted & Vetted",
            icon: <CheckCircle size={16} />,
            mobileGridClasses: "col-span-2 row-span-1",
            gridClasses: "col-span-1 row-span-1 sm:col-span-2 sm:row-span-2",
        },
    ];

    return (
        <div className="relative flex min-h-screen items-center sm:p-0 p-1 justify-center bg-black">
            {/* Animated Background */}
            <div className="absolute inset-0 animate-pulse opacity-60 bg-[url('/retrofuture.png')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-black/70" />

            {/* Responsive Grid Layout */}
            <div
                className="relative grid w-full max-w-6xl grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-1 sm:gap-3"
                style={{ gridAutoRows: "180px" }}
            >
                {blocks.map((block, index) => (
                    <Block key={index} {...block} />
                ))}
            </div>
        </div>
    );
};

export default Home;
