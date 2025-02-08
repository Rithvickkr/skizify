"use client";
import React, { ReactNode } from "react";
import { Mail, User, Clock, Video, Lock, Edit, Star } from "lucide-react";

interface BlockProps {
    gridClasses: string;
    title?: string;
    description?: string;
    date?: string;
    icon?: ReactNode;
    quality?: string;
    children?: ReactNode;
}

const Block: React.FC<BlockProps> = ({
    gridClasses,
    title,
    description,
    date,
    icon,
    quality,
    children,
}) => {
    return (
        <div
            className={`flex cursor-pointer flex-col border-t-1 border-t-neutral-600 overflow-hidden rounded-xl border border-neutral-800/50 bg-gradient-to-b from-black/40 to-neutral-900 p-6 transition-transform duration-300 hover:scale-105 hover:-rotate-1 ${gridClasses}`}
        >
            <div className="space-y-2 flex flex-col flex-grow">
                {title && (
                    <div className="flex items-center gap-2">
                        <h3 className="font-medium text-neutral-200">{title}</h3>
                        {icon && <span className="text-neutral-400">{icon}</span>}
                    </div>
                )}
                {description && (
                    <p className="line-clamp-2 text-sm text-neutral-400">{description}</p>
                )}
                {quality && (
                    <p className="mt-auto text-xs text-neutral-500">{quality}</p>
                )}
                {date && <p className="text-xs text-neutral-500">{date}</p>}
            </div>
            {children}
        </div>
    );
};

const Home: React.FC = () => {
    const blocks = [
        {
            title: "Post Your Doubt",
            description:
                "Kickstart your learning by posting your doubt or query. Set your topic, desired timeframe, and even your preliminary budget. You’re in complete control from the start.",
            date: "Feb 3, 2025",
            quality: "User-Controlled",
            icon: <Mail size={16} />,
            gridClasses: "col-span-2 row-span-2",
        },
        {
            title: "Skizzer Applications",
            description:
                "Our network of verified professionals—Skizzers—will quickly apply to your posted gig. Review their tailored offers and proposals to find the expert who best matches your learning style.",
            date: "Feb 3, 2025",
            quality: "Verified Experts",
            icon: <User size={16} />,
            gridClasses: "col-start-3 row-start-1",
        },
        {
            title: "Custom Timeframe & Budget",
            description:
                "You decide when and how much. Post your preferred schedule and budget, and let the professionals choose the time slots and rates that work for them. Flexibility for both parties.",
            date: "Feb 3, 2025",
            quality: "Flexible",
            icon: <Clock size={16} />,
            gridClasses: "col-start-3 row-start-2 row-span-2",
        },
        {
            title: "Live Video Sessions",
            description:
                "Once you select a Skizzer, enjoy a live, one-on-one video call tailored to your needs. Ask questions, dive deep into topics, and gain personalized guidance in real time.",
            date: "Feb 3, 2025",
            quality: "Interactive",
            icon: <Video size={16} />,
            gridClasses: "col-start-1 row-start-3",
        },
        {
            title: "Secure Transactions",
            description:
                "Rest easy with our secure payment system. The chosen expert sets the price, and you only pay when you’re satisfied after the session.",
            date: "Feb 3, 2025",
            quality: "Safe & Transparent",
            icon: <Lock size={16} />,
            gridClasses: "col-start-2 row-start-3 row-span-2",
        },
        {
            title: "Customized Learning",
            description:
                "Every session is tailored to your needs. Whether it’s in-depth problem solving or a quick doubt clearance, the learning experience is as unique as you are.",
            date: "Jan 9, 2025",
            quality: "Personalized",
            icon: <Edit size={16} />,
            gridClasses: "col-start-1 row-start-4",
        },
        {
            title: "Review & Ratings",
            description:
                "After your session, provide feedback on your Skizzer. Your reviews help build a trusted community where quality guidance is the norm.",
            date: "Feb 3, 2025",
            quality: "Community-Driven",
            icon: <Star size={16} />,
            gridClasses: "col-start-3 row-start-4",
        },
    ];

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-black p-5">
            {/* Animated background overlay */}
            <div
                className="absolute inset-0 animate-pulse opacity-60 bg-[url('/retrofuture.png')] bg-cover bg-center"
            />
            <div className="absolute inset-0 bg-black/70" />

            <div
                className="relative grid w-full max-w-5xl grid-cols-3 gap-4"
                style={{ gridAutoRows: "200px" }}
            >
                {blocks.map((block, index) => (
                    <Block key={index} {...block} />
                ))}
            </div>
        </div>
    );
};

export default Home;
