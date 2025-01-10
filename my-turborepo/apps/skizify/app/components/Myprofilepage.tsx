"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../@/components/ui/dialog";
import { Badge } from "../../@/components/ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../@/components/ui/card";
import { Separator } from "../../@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../@/components/ui/tabs";
import {
  Activity,
  BookOpen,
  Building2,
  Code2,
  Edit3,
  GraduationCap,
  Github,
  Languages,
  LinkedinIcon,
  LogOut,
  MapPin,
  MessageSquare,
  School,
  Settings,
  Star,
  Timer,
  Trash2,
  Trophy,
  Twitter,
  User2,
  Upload,
} from "lucide-react";

import { getSignedURL } from "../lib/action";
import setImageInDB from "../lib/actions/setImage_in_DB";
import { ProfilePageProps } from "../(dashboard)/profile/page";
import { Icons } from "./footer/Footer";

const SkillBar = ({ skill, level }: { skill: string; level: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span>{skill}</span>
      <span className="text-muted-foreground">{level}%</span>
    </div>
    <div className="bg-muted h-2 rounded-full">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full rounded-full bg-gradient-to-r from-black to-black/50"
      />
    </div>
  </div>
);

const StatCard = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-card hover:bg-accent relative flex cursor-pointer items-center gap-7 overflow-hidden rounded-xl border p-6 transition-colors dark:text-white/80"
  >
    {/* <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-black/10" /> */}
    <Icon className="h-8 w-8 text-black dark:text-white" />
    <div className="mt-4 space-y-1">
      <p className="text-4xl font-bold tracking-tight">{value}</p>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  </motion.div>
);

export default function ProfilePage({
  info,
  datauser,
}: {
  info: ProfilePageProps;
  datauser: any;
}) {
  const { data: session } = useSession();

  // -- States for file uploading (avatar), just like old code
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // -- Activity array
  const [activities] = useState([
    { id: 1, text: "Completed a new project", date: "2 days ago" },
    { id: 2, text: "Added a new skill", date: "1 week ago" },
    { id: 3, text: "Updated profile picture", date: "2 weeks ago" },
    { id: 4, text: "Joined a new team", date: "1 month ago" },
  ]);

  // -- For sticky tabs
  const [activeTab, setActiveTab] = useState("achievements");
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // -- For S3 file upload
  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      setStatusMessage("Uploading...");

      try {
        const signedURLResult = await getSignedURL({
          session,
          region: info.region,
          accessKey: info.accessKey,
          secretAccessKey: info.secretAccessKey,
          bucketName: info.bucketName,
          fileSize: file.size,
          fileType: file.type,
          checksum: await computeSHA256(file),
        });

        if (signedURLResult.failure) {
          setStatusMessage(signedURLResult.failure);
          setLoading(false);
          return;
        }

        const url = signedURLResult.success?.url;
        if (!url) {
          setStatusMessage("Failed to get signed URL");
          setLoading(false);
          return;
        }

        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });

        if (session?.user?.id) {
          await setImageInDB({ userId: session.user.id, url });
          setStatusMessage("Upload complete!");
        }
      } catch (error) {
        setStatusMessage("Upload failed");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      const fakeEvent = {
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      await handleFileChange(fakeEvent);
    }
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // -- Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tabItems = [
    { value: "achievements", label: "Achievements", icon: Trophy },
    { value: "overview", label: "Overview", icon: User2 },
    { value: "activity", label: "Activity", icon: Star },
  ];

  return (
    <div className="min-h-screen w-full rounded-lg bg-white text-black transition-colors dark:bg-black md:rounded-2xl">
      {/* Hero Section */}
      <div className="relative mb-5 overflow-hidden pb-12">
        <div className="absolute inset-0 rounded-lg md:rounded-xl bg-black" />
        <div className="relative mx-auto max-w-5xl px-4 pt-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-6 rounded-lg p-4"
          >
            {/* Avatar + Upload */}
            <div className="group relative">
              <Dialog>
                <DialogContent className="hidden" />
                <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-white bg-neutral-200 shadow-lg transition-transform group-hover:scale-105">
                  <Image
                    src={
                      session?.user?.userImage
                        ? session.user.userImage
                        : "/placeholder.svg"
                    }
                    alt="Profile"
                    width={192}
                    height={192}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <Button
                  size="icon"
                  className="absolute bottom-2 right-2 rounded-full bg-white text-black shadow-md hover:bg-neutral-200"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {loading ? (
                    <Upload className="h-4 w-4 animate-pulse" />
                  ) : (
                    <Edit3 className="h-4 w-4" />
                  )}
                </Button>
              </Dialog>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            {/* Name/Bio */}
            <div className="text-center">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold tracking-tight text-white"
              >
                {datauser?.name || session?.user?.name || "My Profile"}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-neutral-600"
              >
                {datauser?.bio || "A short bio goes here..."}
              </motion.p>
            </div>
            {statusMessage && (
              <p className="text-sm text-neutral-600">{statusMessage}</p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Star} label="Total Projects" value="24" />
          <StatCard icon={Trophy} label="Achievements" value="12" />
          <StatCard icon={User2} label="Followers" value="1.2k" />
          <StatCard icon={Code2} label="Contributions" value="3.4k" />
        </div>
      </div>

      {/* Main Content (Tabs) */}
      <main className="mx-auto max-w-5xl space-y-8 rounded-lg p-4 pt-12 md:rounded-xl">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <div className="sticky top-16 z-40 -mx-4 backdrop-blur-xl">
            <div className="">
              <div className="mx-auto max-w-5xl">
                <TabsList className="h-12 w-full justify-evenly bg-black/5 p-1 dark:bg-white/10">
                  {tabItems.map((item) => (
                    <TabsTrigger
                      key={item.value}
                      value={item.value}
                      className="relative flex h-full items-center gap-2 px-6 text-sm transition-colors data-[state=active]:bg-white data-[state=active]:dark:bg-neutral-800 md:text-base"
                    >
                      <div className="flex items-center gap-3 rounded-none">
                        <item.icon
                          className={`h-5 w-5 transition-colors ${
                            activeTab === item.value
                              ? "text-neutral-800 dark:text-neutral-100"
                              : "text-neutral-500 dark:text-neutral-400"
                          }`}
                        />
                        <span
                          className={`font-medium transition-colors ${
                            activeTab === item.value
                              ? "text-neutral-800 dark:text-neutral-100"
                              : "text-neutral-500 dark:text-neutral-400"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            <TabsContent
              value="overview"
              className="space-y-8 rounded-lg bg-white p-4 text-black transition-colors dark:bg-black"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="grid gap-8 lg:grid-cols-3"
              >
                {/* About Section */}
                <Card className="rounded-lg border border-neutral-200 bg-neutral-100 p-4 shadow lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="mb-2 flex items-center gap-2 text-xl font-semibold md:text-2xl">
                      <User2 className="h-5 w-5" />
                      About
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="leading-relaxed text-neutral-600">
                      {datauser?.bio ||
                        "Passionate developer focused on modern web experiences."}
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-neutral-200 p-2">
                          <Building2 className="h-5 w-5 text-neutral-700" />
                        </div>
                        <div>
                          <p className="text-sm text-neutral-600">
                            Institution
                          </p>
                          <p className="font-medium text-black">
                            {datauser?.education || "NIT KKR"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-neutral-200 p-2">
                          <GraduationCap className="h-5 w-5 text-neutral-700" />
                        </div>
                        <div>
                          <p className="text-sm text-neutral-600">Degree</p>
                          <p className="font-medium text-black">BTech</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-neutral-200 p-2">
                          <Code2 className="h-5 w-5 text-neutral-700" />
                        </div>
                        <div>
                          <p className="text-sm text-neutral-600">Role</p>
                          <p className="font-medium text-black">
                            {datauser?.profession || "Engineer"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-neutral-200 p-2">
                          <MapPin className="h-5 w-5 text-neutral-700" />
                        </div>
                        <div>
                          <p className="text-sm text-neutral-600">Location</p>
                          <p className="font-medium text-black">
                            {datauser?.location || "Unknown"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Connect Section */}
                <Card className="rounded-lg border border-neutral-200 bg-neutral-100 p-4 shadow">
                  <CardHeader>
                    <CardTitle className="mb-2 flex items-center gap-2 text-xl font-semibold">
                      <Star className="h-5 w-5" />
                      Connect
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <Button
                        variant="outline"
                        className="flex h-14 items-center justify-start gap-4 rounded-lg bg-white px-4 shadow-sm hover:bg-neutral-200"
                      >
                        <Icons.github className="h-5 w-5" />
                        <div className="flex flex-col items-start">
                          <span className="text-sm font-medium">Github</span>
                          <span className="text-xs text-neutral-600">
                            500+ contributions
                          </span>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex h-14 items-center justify-start gap-4 rounded-lg bg-white px-4 shadow-sm hover:bg-neutral-200"
                      >
                        <Icons.x className="h-5 w-5" />
                        <div className="flex flex-col items-start">
                          <span className="text-sm font-medium">Twitter</span>
                          <span className="text-xs text-neutral-600">
                            1.2k followers
                          </span>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex h-14 items-center justify-start gap-4 rounded-lg bg-white px-4 shadow-sm hover:bg-neutral-200"
                      >
                        <Icons.linkedin className="h-5 w-5" />
                        <div className="flex flex-col items-start">
                          <span className="text-sm font-medium">LinkedIn</span>
                          <span className="text-xs text-neutral-600">
                            500+ connections
                          </span>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Skills & Expertise */}
                <Card className="rounded-lg border border-neutral-200 bg-neutral-100 p-4 shadow lg:col-span-3">
                  <CardHeader>
                    <CardTitle className="mb-2 flex items-center gap-2 text-xl font-semibold">
                      <BookOpen className="h-5 w-5" />
                      Skills & Expertise
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardContent>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <SkillBar skill="React" level={95} />
                        <SkillBar skill="Next.js" level={90} />
                        <SkillBar skill="TypeScript" level={85} />
                        <SkillBar skill="Node.js" level={80} />
                        <SkillBar skill="UI/UX Design" level={75} />
                        <SkillBar skill="DevOps" level={70} />
                      </div>
                    </CardContent>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
              >
                <Card className="bg-neutral-100 shadow">
                  <CardContent className="p-4 pt-6">
                    <div className="space-y-6">
                      {activities.map((activity, i) => (
                        <motion.div
                          key={activity.id}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex gap-4"
                        >
                          <div className="relative">
                            <div className="rounded-full bg-neutral-200 p-2">
                              <Activity className="h-4 w-4" />
                            </div>
                            {i !== activities.length - 1 && (
                              <div className="absolute left-1/2 top-8 h-16 w-px bg-neutral-400" />
                            )}
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="font-medium">{activity.text}</p>
                            <p className="text-sm text-neutral-600">
                              {activity.date}
                            </p>
                            <p className="mt-2 text-sm text-neutral-600">
                              Some more details about this activity...
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
              >
                {[
                  {
                    icon: Trophy,
                    title: "Top Contributor",
                    description: "Ranked #1 contributor this month",
                    date: "This Month",
                  },
                  {
                    icon: Timer,
                    title: "Learning Streak",
                    description: "Maintained a 30-day learning streak",
                    date: "30 Days",
                  },
                  {
                    icon: Code2,
                    title: "Code Master",
                    description: "Reached 1000+ commits milestone",
                    date: "1000+ Commits",
                  },
                  {
                    icon: Star,
                    title: "Rising Star",
                    description: "Featured developer of the month",
                    date: "This Month",
                  },
                  {
                    icon: Languages,
                    title: "Polyglot",
                    description: "Mastered 5+ programming languages",
                    date: "Achievement",
                  },
                  {
                    icon: School,
                    title: "Mentor",
                    description: "Helped 50+ developers grow",
                    date: "Lifetime",
                  },
                ].map((achievement, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="group relative cursor-pointer overflow-hidden rounded-xl border border-neutral-300 bg-neutral-100 shadow-lg"
                  >
                    <motion.div
                      className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-neutral-200 sm:h-40 sm:w-40"
                      animate={{ scale: [1, 4, 1] }}
                      whileHover={{
                        scale: [1, 4, 1],
                        transition: { duration: 0.5 },
                      }}
                    />
                    <div className="relative p-4 sm:p-6">
                      <achievement.icon className="h-8 w-8 sm:h-12 sm:w-12" />
                      <div className="mt-3 space-y-1 sm:mt-4 sm:space-y-2">
                        <h3 className="text-base font-semibold tracking-tight sm:text-lg">
                          {achievement.title}
                        </h3>
                        <p className="text-xs text-neutral-600 sm:text-sm lg:text-base">
                          {achievement.description}
                        </p>
                        <p className="text-xs font-medium sm:text-sm">
                          {achievement.date}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </main>

      {/* Footer Actions */}
      <div className="mx-auto mt-4 max-w-5xl px-4 pb-8">
        <Separator className="mb-8 bg-black dark:bg-white/20 shadow-xl" />
        <div className="flex items-center justify-between">
          <Button
            variant="destructive"
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Account
          </Button>
          <Button
            variant="default"
            className="bg-neutral-800 text-white shadow hover:bg-neutral-700"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirmation && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full max-w-md rounded-lg border border-neutral-300 bg-white p-6 shadow-xl"
            >
              <DialogHeader>
                <DialogTitle>Confirm Account Deletion</DialogTitle>
                <DialogDescription className="text-neutral-600">
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-4">
                <Button onClick={() => setShowDeleteConfirmation(false)}>
                  Cancel
                </Button>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drag & drop area if wanted */}
      <Dialog open={false}>
        <DialogContent
          className="hidden"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        />
      </Dialog>
    </div>
  );
}
