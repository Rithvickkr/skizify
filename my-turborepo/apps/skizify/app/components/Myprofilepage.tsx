"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { Textarea } from "../../@/components/ui/textarea";
import { Switch } from "../../@/components/ui/switch";
import { Progress } from "../../@/components/ui/progress";
import {
  X,
  Upload,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Plus,
  Activity,
  ChevronRight,
  LogOut,
  Trash2,
  Award,
  BookOpen,
  Code,
  School,
  GraduationCap,
  Briefcase,
  Languages,
} from "lucide-react";
import { Avatar } from "@repo/ui/avatar";

export default function EnhancedMyProfileSection() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [showAllActivity, setShowAllActivity] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const [name, setName] = useState("Jane Doe");
  const [bio, setBio] = useState(
    "Full-stack developer passionate about creating beautiful and functional web applications.",
  );
  const [email, setEmail] = useState("jane.doe@example.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [location, setLocation] = useState("San Francisco, CA");
  const [skills, setSkills] = useState([
    "React",
    "Node.js",
    "TypeScript",
    "GraphQL",
  ]);
  const [newSkill, setNewSkill] = useState("");
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
  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
      setIsAddingSkill(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-xl p-6 shadow-lg transition-all duration-300">
      <div className="relative mb-8">
        <motion.div
          className="  mx-auto flex items-center justify-center h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-lg dark:border-gray-700"
          whileHover={{ scale: 1.05 }}
        >
          {/* <img src="A" alt="Profile" className="w-full h-full object-cover" /> */}
          <Avatar 
          name="R"
          classname=" h-32 w-32 text-7xl " />
        </motion.div>
        <motion.div
          className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-primary p-2 text-primary-foreground"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Upload size={20} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="mb-2 text-3xl font-bold dark:text-gray-100">{name}</h1>
        <p className="text-muted-foreground mb-4 dark:text-gray-300">{bio}</p>
        <Button variant="darky" onClick={() => setIsEditingProfile(true)}>
          Edit Profile
        </Button>
      </motion.div>

      <AnimatePresence>
        {isEditingProfile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              exit={{ y: -50 }}
              className="w-full max-w-md rounded-lg bg-background p-6 shadow-xl dark:bg-zinc-900"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold dark:text-gray-100">
                  Edit Profile
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setIsEditingProfile(false)}
                >
                  <X size={24} />
                </Button>
              </div>
              <div className="space-y-4">
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="dark:bg-zinc-700 dark:text-gray-100"
                />
                <Textarea
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="dark:bg-zinc-700 dark:text-gray-100"
                />
                <Input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="dark:bg-zinc-700 dark:text-gray-100"
                />
                <Input
                  placeholder="Education"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="dark:bg-zinc-700 dark:text-gray-100"
                />
                <Input
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="dark:bg-zinc-700 dark:text-gray-100"
                />
                <Input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="dark:bg-zinc-700 dark:text-gray-100"
                />
                <div className="mb-4 flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary dark:bg-primary/20 dark:text-primary-foreground"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill} {}
                      <X
                        size={16}
                        className="ml-1 cursor-pointer"
                        onClick={() =>
                          setSkills(skills.filter((s) => s !== skill))
                        }
                      />
                    </motion.span>
                  ))}
                </div>
                {isAddingSkill ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="New skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="dark:bg-gray-700 dark:text-gray-100"
                    />
                    <Button variant="darky" onClick={handleAddSkill}>
                      Add
                    </Button>
                  </div>
                ) : (
                    
                  <Button
                  size="sm"
                    variant="darky"
                    onClick={() => setIsAddingSkill(true)}
                  >
                 <Plus size={20} className="mr-1" /> Add Skill
                  </Button>
                  
                )}
                <div>
                <Button
                
                  variant="darky"
                  onClick={() => setIsEditingProfile(false)}
                >
                  Save Changes
                </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card text-card-foreground rounded-lg p-6 shadow dark:bg-zinc-900 dark:text-gray-100"
        >
          <h2 className="mb-4 text-xl font-semibold">Details</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <Mail
                size={20}
                className="text-muted-foreground mr-2 dark:text-gray-400"
              />
              <span>{email}</span>
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
              <span>Engineer</span>
            </div>
            <div className="flex items-center">
              <Languages
                size={20}
                className="text-muted-foreground mr-2 dark:text-gray-400"
              />
              <span>Hindi, English</span>
            </div>
            <div className="flex items-center">
              <MapPin
                size={20}
                className="text-muted-foreground mr-2 dark:text-gray-400"
              />
              <span>{location}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-card text-card-foreground rounded-lg p-6 shadow dark:bg-zinc-900 dark:text-gray-100"
        >
          <h2 className="mb-4 text-xl font-semibold">Skills</h2>
          <div className="mb-4 flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <motion.span
                key={index}
                className="flex items-center rounded-full bg-primary/10 px-3 py-1   text-primary dark:bg-primary/20 dark:text-primary-foreground"
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
        className="bg-card text-card-foreground mb-8 rounded-lg p-6 shadow dark:bg-zinc-900 dark:text-gray-100"
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
        className="bg-card text-card-foreground mb-8 rounded-lg p-6 shadow dark:bg-zinc-900 dark:text-gray-100"
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

      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="bg-card dark:bg-gray-800 text-card-foreground dark:text-gray-100 p-6 rounded-lg shadow mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span>Two-Factor Authentication</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span>Profile Visibility</span>
            <Switch />
          </div>
        </div>
      </motion.div> */}

      {/* New section: Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="bg-card text-card-foreground mb-8 rounded-lg p-6 shadow dark:bg-zinc-900 dark:text-gray-100"
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

      {/* New section: Profile Completion */}

      <div className="flex items-center justify-between">
        <Button
          variant="destructive"
          onClick={() => setShowDeleteConfirmation(true)}
        >
          <Trash2 size={20} className="mr-2" /> Delete Account
        </Button>
        <Button variant="secondary">
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
                  variant="darky"
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
