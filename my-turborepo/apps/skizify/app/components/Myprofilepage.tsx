"use client";

import { Avatar, AvatarImage, AvatarFallback } from "../../@/components/ui/avatar";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Aperture,
  Award,
  BookOpen,
  Briefcase,
  ChevronRight,
  Code,
  Github,
  GraduationCap,
  Languages,
  Linkedin,
  LogOut,
  Mail,
  MapPin,
  School,
  Trash2,
  Twitter,
  Upload
} from "lucide-react";
import { useRef, useState, ReactElement } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../@/components/ui/dialog";
import { DrawerDialogDemo } from "./darwerform";
import { getSignedURL } from "../lib/action";
import setImageInDB from "../lib/actions/setImage_in_DB";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function EnhancedMyProfileSection(datauser: any) {
  const [showAllActivity, setShowAllActivity] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      setStatusMessage("Uploading...");

      try {
        const signedURLResult = await getSignedURL({
          session,
          region: process.env.NEXT_PUBLIC_AWS_REGION || "",
          accessKey: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
          bucketName: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || "",
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

        if (session.data?.user.id) {
          await setImageInDB({ userId: session.data.user.id, url });
          setAvatarSrc(url);
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
        target: {
          files: [file]
        }
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

  // const [name, setName] = useState("Jane Doe");
  // const [bio, setBio] = useState(
  //   "Full-stack developer passionate about creating beautiful and functional web applications.",
  // );
 
  
 
  const [activities] = useState([
    { id: 1, text: "Completed a new project", date: "2 days ago" },
    { id: 2, text: "Added a new skill", date: "1 week ago" },
    { id: 3, text: "Updated profile picture", date: "2 weeks ago" },
    { id: 4, text: "Joined a new team", date: "1 month ago" },
  ]);
  const [Editform, setEditform] = useState({
    name: "",
    email: "",
    bio: "",
    education: "",
    language: "",
    location: "",
    Achievement: "",
  });
  const userdata=datauser.datauser;
  console.log(userdata);
 


  return (
    <div className="mx-auto max-w-4xl rounded-xl p-6 shadow-2xl transition-all duration-300">
      <div className="relative mb-8 flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
        <div
          className="relative inline-block cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
            <Avatar className="size-64 cursor-pointer text-4xl bg-neutral-800 dark:bg-neutral-200">
            <AvatarImage src={session.data?.user.userImage || ""} alt="Yash" />
            <AvatarFallback className="text-neutral-200 text-5xl dark:text-neutral-800">
              {"Yash".charAt(0)}
            </AvatarFallback>
            </Avatar>
          {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50">
            <Upload className="text-white opacity-65 size-10" />
          </div>
          )}
        </div>
        </DialogTrigger>
        <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Avatar</DialogTitle>
          <DialogDescription>
          Drag and drop an image or click to select a file.
          </DialogDescription>
        </DialogHeader>
            {statusMessage && (
              <p className="text-sm text-yellow-600">{statusMessage}</p>
            )}
            <div
              className={`mt-4 rounded-lg border-2 border-dashed p-8 text-center ${
                isDragging ? "border-primary" : "border-gray-300"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Select Image"}
              </Button>
              <p className="mt-2 text-sm text-gray-500">
                or drag and drop your image here
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="mb-2 text-3xl font-bold dark:text-gray-100">{userdata.name}</h1>
        <p className="text-muted-foreground mb-4 dark:text-gray-300">{userdata.bio}</p>
        <DrawerDialogDemo skills={userdata.skills} langs={userdata.languages}/>
      </motion.div>

      <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card text-card-foreground rounded-lg p-6 shadow-lg dark:bg-zinc-900 dark:text-gray-100"
        >
          <h2 className="mb-4 text-xl font-semibold">Details</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <Mail
                size={20}
                className="text-muted-foreground mr-2 dark:text-gray-400"
              />
              <span>{session.data?.user.email}</span>
            </div>
            <div className="flex items-center">
              <School
                size={20}
                className="text-muted-foreground mr-2 dark:text-gray-400"
              />
              <span>NIt kkr</span>
            </div>
            <div className="flex items-center">
              <GraduationCap
                size={20}
                className="text-muted-foreground mr-2 dark:text-gray-400"
              />
              <span>Btech</span>
            </div>
            <div className="flex items-center">
              <Briefcase
                size={20}
                className="text-muted-foreground mr-2 dark:text-gray-400"
              />
              <span>{userdata.profession}</span>
            </div>
            <div className="flex items-center">
              <Languages
                size={20}
                className="text-muted-foreground mr-2 dark:text-gray-400"
              />
              <span>{userdata.languages}</span>
            </div>
            <div className="flex items-center">
              <MapPin
                size={20}
                className="text-muted-foreground mr-2 dark:text-gray-400"
              />
              <span>{userdata.location}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-card text-card-foreground rounded-lg p-6 shadow-lg dark:bg-zinc-900 dark:text-gray-100"
        >
          <h2 className="mb-4 text-xl font-semibold">Skills</h2>
          <div className="mb-4 flex flex-wrap gap-2">
            {userdata.skills.map((skill: any, index: number) => (
              <motion.span
                key={index}
                className="flex items-center cursor-pointer rounded-full bg-primary/10 px-3 py-1   text-primary dark:bg-primary/20 dark:text-primary-foreground"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {skill} 
                
              </motion.span>
            ))}
          </div>
          
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-card text-card-foreground mb-8 rounded-lg p-6 shadow-lg dark:bg-zinc-900 dark:text-gray-100"
      >
        <h2 className="mb-4 text-xl font-semibold">Social Media</h2>
        <div className="flex space-x-4">
          <motion.a
            href="#"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-muted-foreground hover:text-primary dark:text-gray-400 dark:hover:text-primary-foreground"
          >
            <Github size={24} />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-muted-foreground hover:text-primary dark:text-gray-400 dark:hover:text-primary-foreground"
          >
            <Twitter size={24} />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-muted-foreground hover:text-primary dark:text-gray-400 dark:hover:text-primary-foreground"
          >
            <Linkedin size={24} />
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-card text-card-foreground mb-8 rounded-lg p-6 shadow-lg dark:bg-zinc-900 dark:text-gray-100"
      >
        <h2 className="mb-4 text-xl font-semibold">Activity</h2>
        <ul className="space-y-4">
          {activities
            .slice(0, showAllActivity ? activities.length : 2)
            .map((activity) => (
              <motion.li
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start"
              >
                <Activity
                  size={20}
                  className="mr-2 mt-1 text-primary dark:text-primary-foreground"
                />
                <div>
                  <p className="font-medium">{activity.text}</p>
                  <p className="text-muted-foreground text-sm dark:text-gray-400">
                    {activity.date}
                  </p>
                </div>
              </motion.li>
            ))}
        </ul>
        {!showAllActivity && (
          <Button
            variant="link"
            onClick={() => setShowAllActivity(true)}
            className="mt-4 dark:text-primary-foreground"
          >
            See All Activity <ChevronRight size={16} className="ml-1" />
          </Button>
        )}
      </motion.div>

      {/* New section: Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="bg-card text-card-foreground mb-8 rounded-lg p-6 shadow-lg dark:bg-zinc-900 dark:text-gray-100"
      >
        <h2 className="mb-4 text-xl font-semibold">Achievements</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex items-center space-x-2">
            <Award className="text-yellow-500" size={24} />
            <div>
              <p className="font-medium">Top Contributor</p>
              <p className="text-muted-foreground text-sm dark:text-gray-400">
                This Month
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <BookOpen className="text-green-500" size={24} />
            <div>
              <p className="font-medium">Learning Streak</p>
              <p className="text-muted-foreground text-sm dark:text-gray-400">
                30 Days
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Code className="text-blue-500" size={24} />
            <div>
              <p className="font-medium">Code Master</p>
              <p className="text-muted-foreground text-sm dark:text-gray-400">
                1000+ Commits
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex items-center justify-between">
        <Button
          variant="destructive"
          onClick={() => setShowDeleteConfirmation(true)}
        >
          <Trash2 size={20} className="mr-2" /> Delete Account
        </Button>
        <Button >
          <LogOut size={20} className="mr-2" /> Log Out
        </Button>
      </div>

      <AnimatePresence>
        {showDeleteConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full max-w-md rounded-lg bg-background p-6 shadow-xl dark:bg-zinc-900"
            >
              <h2 className="mb-4 text-2xl font-bold dark:text-gray-100">
                Confirm Account Deletion
              </h2>
              <p className="mb-6 dark:text-gray-300">
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <Button
                  onClick={() => setShowDeleteConfirmation(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
