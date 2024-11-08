"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  ChevronDown,
  X,
  Plus,
} from "lucide-react";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { Textarea } from "../../@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../@/components/ui/select";
import { Switch } from "../../@/components/ui/switch";
import { Badge } from "../../@/components/ui/badge";
import { Separator } from "../../@/components/ui/separator";
import { Card, CardContent } from "../../@/components/ui/card";
import { Progress } from "../../@/components/ui/progress";
import { Label } from "../../@/components/ui/label";
import { ScrollArea, ScrollBar } from "../../@/components/ui/scroll-area";
import languages from "../utils/languages";

const MotionCard = motion(Card);

interface SectionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  toggleOpen: () => void;
}

const Section = ({ title, children, isOpen, toggleOpen }: SectionProps) => (
  <MotionCard
    layout
    className="bg-card text-card-foreground overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <CardContent className="p-6">
      <motion.div
        layout
        className="flex cursor-pointer items-center justify-between"
        onClick={toggleOpen}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <h2 className="text-2xl font-semibold">{title}</h2>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-4 space-y-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </CardContent>
  </MotionCard>
);

export default function EnhancedUXProfileCreation() {
  const { register, control, handleSubmit, watch } = useForm();
  const [newSkill, setNewSkill] = useState("");
  const [socialToggles, setSocialToggles] = useState({
    linkedin: false,
    github: false,
    twitter: false,
    instagram: false,
  });
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [skillsList, setSkillsList] = useState<string[]>([]);
  const [language, setlanguage] = useState("");

  const [openSections, setOpenSections] = useState({
    basicInfo: true,
    aboutYou: false,
    skillsAchievements: false,
    languages: false,
    socialLinks: false,
    gigsReviews: false,
    location: false,
  });

  const watchedFields = watch();
  const completionPercentage =
    (Object.values(watchedFields).filter(Boolean).length /
      Object.keys(watchedFields).length) *
    10;

  const onSubmit = (data: any) => {
    console.log(data);
    console.log(language);
    console.log(skillsList);
  };



  const toggleSocial = (
    platform: "linkedin" | "github" | "twitter" | "instagram",
  ) => {
    setSocialToggles((prev) => ({ ...prev, [platform]: !prev[platform] }));
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  function handleAddSkill(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void {
    event.preventDefault();
    if (newSkill.trim() !== "") {
      setSkillsList([...skillsList, newSkill.trim()]);
      setNewSkill("");
      setIsAddingSkill(false);
    }
  }

  return (
    <div className="min-h-screen bg-black from-background to-secondary/10 text-foreground transition-colors duration-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-4xl space-y-8 p-4 sm:p-6"
      >
        <motion.div
          className="mb-8 flex flex-col items-center justify-between sm:flex-row"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 text-center sm:mb-0 sm:text-left">
            <h1 className="bg-gradient-to-r from-black to-black/60 bg-clip-text text-4xl font-bold text-transparent dark:from-white dark:to-white/15">
              Create Your Profile
            </h1>
            <p className="text-muted-foreground">
              Let's get to know you better!
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Progress
            value={completionPercentage}
            className="h-2 bg-secondary/30 bg-gradient-to-r from-primary to-secondary"
          />
          <p className="text-muted-foreground mt-2 text-sm">
            Profile Completion: {Math.round(completionPercentage)}%
          </p>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Section
            title="Basic Info"
            isOpen={openSections.basicInfo}
            toggleOpen={() => toggleSection("basicInfo")}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="username"
                  className="mb-1 block text-sm font-medium"
                >
                  Username
                </label>
                <Input
                  id="username"
                  {...register("username")}
                  className="w-full transition-all duration-300 focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full transition-all duration-300 focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  {...register("name")}
                  className="w-full transition-all duration-300 focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="image"
                  className="mb-1 block text-sm font-medium"
                >
                  Profile Image
                </label>
                <div className="flex items-center space-x-4">
                  <div className="bg-muted flex h-20 w-20 items-center justify-center overflow-hidden rounded-full">
                    <Upload className="text-muted-foreground" />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                  >
                    Upload Image
                  </Button>
                </div>
              </div>
            </div>
          </Section>

          <Section
            title="About You"
            isOpen={openSections.aboutYou}
            toggleOpen={() => toggleSection("aboutYou")}
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="bio" className="mb-1 block text-sm font-medium">
                  Bio
                </label>
                <Textarea
                  id="bio"
                  {...register("bio")}
                  className="w-full transition-all duration-300 focus:ring-2 focus:ring-primary"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="education"
                    className="mb-1 block text-sm font-medium"
                  >
                    Education
                  </label>
                  <Input
                    id="education"
                    {...register("education")}
                    className="w-full transition-all duration-300 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="qualification"
                    className="mb-1 block text-sm font-medium"
                  >
                    Qualification
                  </label>
                  <Input
                    id="qualification"
                    {...register("qualification")}
                    className="w-full transition-all duration-300 focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="profession"
                  className="mb-1 block text-sm font-medium"
                >
                  Profession
                </label>
                <Input
                  id="profession"
                  {...register("profession")}
                  className="w-full transition-all duration-300 focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </Section>

          <Section
            title="Skills"
            isOpen={openSections.skillsAchievements}
            toggleOpen={() => toggleSection("skillsAchievements")}
          >
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium">Skills</label>
                <div className="flex flex-wrap gap-2">
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(skillsList) &&
                      skillsList.map((skill, index) => (
                        <motion.span
                          key={index}
                          className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary dark:bg-primary/20 dark:text-primary-foreground"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {skill}
                          <X
                            size={16}
                            className="ml-1 cursor-pointer"
                            onClick={() =>
                              setSkillsList(
                                skillsList.filter((s) => s !== skill),
                              )
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
                </div>
              </div>
              <Separator className="bg-muted/50" />
            </div>
          </Section>

          <Section
            title="Languages"
            isOpen={openSections.languages}
            toggleOpen={() => toggleSection("languages")}
          >
            <div>
              <label
                htmlFor="languages"
                className="mb-2 block text-sm font-medium"
              >
                Select Languages
              </label>
              <div>
                <Select
                  onValueChange={(value) => {
                    setlanguage(value);
                  }}
                >
                  <SelectTrigger className="mt-2 w-full text-base md:text-sm">
                    <SelectValue placeholder="Select your preferred language" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-black">
                    <ScrollArea className="h-44 rounded-md">
                      <div className="mb-2 mt-2">
                        {languages.map((language) => (
                          <SelectItem
                            className="break-words bg-white text-black dark:bg-black dark:text-white"
                            key={language.alpha2}
                            value={language.alpha2}
                          >
                            {language.English}
                            <br />
                          </SelectItem>
                        ))}
                      </div>

                      <ScrollBar
                        className="bg-black dark:bg-zinc-900"
                        orientation="vertical"
                      />
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Section>

          <Section
            title="Social Links"
            isOpen={openSections.socialLinks}
            toggleOpen={() => toggleSection("socialLinks")}
          >
            <div className="space-y-4">
              {Object.entries({
                linkedin: {
                  icon: Linkedin,
                  color: "text-blue-600 dark:text-blue-400",
                },
                github: {
                  icon: Github,
                  color: "text-gray-800 dark:text-gray-200",
                },
                twitter: { icon: Twitter, color: "text-blue-400" },
                instagram: {
                  icon: Instagram,
                  color: "text-pink-600 dark:text-pink-400",
                },
              }).map(([platform, { icon: Icon, color }]) => {
                const typedPlatform = platform as keyof typeof socialToggles;
                return (
                  <div key={platform} className="flex items-center space-x-4">
                    <Switch
                      checked={socialToggles[typedPlatform]}
                      onCheckedChange={() => toggleSocial(typedPlatform)}
                      className="data-[state=checked]:bg-primary"
                    />
                    <Icon className={`h-6 w-6 ${color}`} />
                    <AnimatePresence>
                      {socialToggles[typedPlatform] && (
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-grow"
                        >
                          <Input
                            placeholder={`Enter your ${platform} profile URL`}
                            {...register(`social.${platform}`)}
                            className="w-full transition-all duration-300 focus:ring-2 focus:ring-primary"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Section>

          <Section
            title="Location"
            isOpen={openSections.location}
            toggleOpen={() => toggleSection("location")}
          >
            <div>
              <label
                htmlFor="location"
                className="mb-1 block text-sm font-medium"
              >
                Your Location
              </label>
              <Input
                id="location"
                {...register("location")}
                className="w-full transition-all duration-300 focus:ring-2 focus:ring-primary"
              />
            </div>
          </Section>
        </motion.div>

        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            type="submit"
            className="w-full max-w-md bg-gradient-to-r from-primary to-secondary py-6 text-lg transition-opacity duration-300 hover:opacity-90"
          >
            Create Profile
          </Button>
        </motion.div>
      </form>
    </div>
  );
}
