"use client";
import {
  CheckCircle,
  Clock,
  Edit,
  Globe,
  Layers,
  Lock,
  Mail,
  MessageSquare,
  Shield,
  Star,
  User,
  Users,
  Video,
} from "lucide-react";
import React, { ReactNode } from "react";

interface BlockProps {
  mobileGridClasses?: string;
  gridClasses: string;
  title: string;
  description: string;
  quality: string;
  icon: ReactNode;
  effect?: ReactNode;
}

const Block: React.FC<BlockProps> = ({
  mobileGridClasses = "",
  gridClasses,
  title,
  description,
  quality,
  icon,
  effect,
}) => {
  return (
    <div
      className={`group relative flex cursor-pointer flex-col rounded-lg sm:rounded-xl border border-neutral-700 bg-gradient-to-b from-neutral-800 to-black p-4 shadow-md transition-all duration-500 ease-in-out ${mobileGridClasses} ${gridClasses}`}
      aria-label={title}
    >
      {effect && (
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity hover:rotate-90 duration-1000 ease-in-out group-hover:opacity-100">
        {effect}
      </div>
      )}
      <div className="relative z-10 flex flex-col flex-grow justify-between space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium tracking-wide text-neutral-300">
        {title}
        </h3>
        <span className="text-xl text-neutral-100">{icon}</span>
      </div>
      <p className="text-sm text-neutral-400">{description}</p>
      </div>
      <div className="relative z-10 mt-3 text-xs text-neutral-500">
      {quality}
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
      icon: <Mail size={16} strokeWidth={1.2} />,
      mobileGridClasses: "col-span-2 row-span-1",
      gridClasses: "col-span-1 row-span-1 sm:col-span-2 sm:row-span-2",
      effect: <Effect1 />,
    },
    {
      title: "Skizzer Applications",
      description: "Verified experts apply to your doubt.",
      quality: "Verified Experts",
      icon: <User size={16} strokeWidth={1.2} />,
      mobileGridClasses: "col-span-1 row-span-1",
      gridClasses: "col-span-1 row-span-1 sm:col-span-1 sm:row-span-2",
      effect: <Effect2 />,
    },
    {
      title: "Custom Time & Budget",
      description: "Set flexible schedules & budgets.",
      quality: "Flexible",
      icon: <Clock size={16} strokeWidth={1.2} />,
      mobileGridClasses: "col-span-1 row-span-1",
      gridClasses: "col-span-1 row-span-1 sm:col-span-1 sm:row-span-2",
      effect: <Effect7 />,
    },
    {
      title: "Live Video Sessions",
      description: "One-on-one live video calls.",
      quality: "Interactive",
      icon: <Video size={16} strokeWidth={1.2} />,
      mobileGridClasses: "col-span-2 row-span-1",
      gridClasses: "col-span-1 row-span-1 sm:col-span-2 sm:row-span-1",
      effect: <Effect1 />,
    },
    {
      title: "Secure Transactions",
      description: "Only pay when satisfied.",
      quality: "Safe & Transparent",
      icon: <Lock size={16} strokeWidth={1.2} />,
      mobileGridClasses: "col-span-2 row-span-1",
      gridClasses: "col-span-1 row-span-1 sm:col-span-2 sm:row-span-2",
      effect: <Effect1 />,
    },
    {
      title: "Customized Learning",
      description: "Personalized learning for every need.",
      quality: "Personalized",
      icon: <Edit size={16} strokeWidth={1.2} />,
      mobileGridClasses: "col-span-1 row-span-1",
      gridClasses: "col-span-1 row-span-1",
      effect: <Effect6 />,
    },
    {
      title: "Review & Ratings",
      description: "Provide feedback to experts.",
      quality: "Community-Driven",
      icon: <Star size={16} strokeWidth={1.2} />,
      mobileGridClasses: "col-span-1 row-span-1",
      gridClasses: "col-span-1 row-span-1",
      effect: <Effect7 />,
    },
    {
      title: "End-to-End Encryption",
      description: "100% secure video sessions.",
      quality: "Encrypted",
      icon: <Shield size={16} strokeWidth={1.2} />,
      mobileGridClasses: "col-span-1 row-span-1",
      gridClasses: "col-span-1 row-span-1 sm:col-span-1 sm:row-span-2",
      effect: <Effect1 />,
    },
    {
      title: "Global Accessibility",
      description: "Connect worldwide!",
      quality: "Borderless Learning",
      icon: <Globe size={16} strokeWidth={1.2} />,
      mobileGridClasses: "col-span-1 row-span-1",
      gridClasses: "col-span-1 row-span-1",
      effect: <Effect2 />,
    },
    {
      title: "Multi-Topic Support",
      description: "Experts in various fields.",
      quality: "Diverse Expertise",
      icon: <Layers size={16} strokeWidth={1.2} />,
      mobileGridClasses: "col-span-2 row-span-1",
      gridClasses: "col-span-1 row-span-1 sm:col-span-1 sm:row-span-2",
      effect: <Effect5 />,
    },
    {
      title: "Community Discussions",
      description: "Join discussions & forums.",
      quality: "Collaborative",
      icon: <Users size={16} strokeWidth={1.2} />,
      mobileGridClasses: "col-span-1 row-span-1",
      gridClasses: "col-span-1 row-span-1 sm:col-span-1 sm:row-span-2",
      effect: <Effect4 />,
    },
    {
      title: "Instant Messaging",
      description: "Chat before sessions.",
      quality: "Real-Time Communication",
      icon: <MessageSquare size={16} strokeWidth={1.2} />,
      mobileGridClasses: "col-span-1 row-span-1",
      gridClasses: "col-span-1 row-span-1 sm:col-span-1 sm:row-span-2",
      effect: <Effect5 />,
    },
    {
      title: "Verified Skizzers",
      description: "Rigorously vetted professionals.",
      quality: "Trusted & Vetted",
      icon: <CheckCircle size={16} strokeWidth={1.2} />,
      mobileGridClasses: "col-span-2 row-span-1",
      gridClasses: "col-span-1 row-span-1 sm:col-span-2 sm:row-span-2",
      effect: <Effect6 />,
    },
  ];

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black p-1">
      {/* Animated Background */}
      <div className="absolute inset-0 animate-pulse bg-[url('/retrofuture.png')] bg-cover bg-center opacity-60" />
      <div className="absolute inset-0 bg-black/40" />

      {/* Responsive Grid Layout */}
      <div
        className="relative grid w-full max-w-6xl grid-cols-2 gap-1 sm:grid-cols-2 sm:gap-3 md:grid-cols-4"
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

const Effect1 = () => {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: "url('/circle1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.2,
      }}
    />
  );
};

const Effect2 = () => {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: "url('/circle2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.2,
      }}
    />
  );
};

const Effect3 = () => {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: "url('/circle3.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.2,
      }}
    />
  );
};
const Effect4 = () => {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: "url('/circle4.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.2,
      }}
    />
  );
};
const Effect5 = () => {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: "url('/circle5.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.2,
      }}
    />
  );
};
const Effect6 = () => {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: "url('/circle6.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.2,
      }}
    />
  );
};
const Effect7 = () => {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: "url('/circle7.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.2,
      }}
    />
  );
};
