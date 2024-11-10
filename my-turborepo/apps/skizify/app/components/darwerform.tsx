import * as React from "react";

import { motion } from "framer-motion";
import { Linkedin, Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../../@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../@/components/ui/drawer";
import { Input } from "../../@/components/ui/input";
import { Label } from "../../@/components/ui/label";
import { ScrollArea, ScrollBar } from "../../@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../@/components/ui/select";
import { Textarea } from "../../@/components/ui/textarea";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { cn } from "../utils/cn";
import languages from "../utils/languages";

import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { BorderBeam } from "../../@/components/ui/border-beam";
import { Switch } from "../../@/components/ui/switch";
export function DrawerDialogDemo({
  skills,
  langs,
}: {
  skills: string[];
  langs: string[];
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="darky">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <BorderBeam
            size={200}
            duration={12}
            delay={8}
            colorFrom="white"
            colorTo="#484848"
          />
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm skills={skills} langs={langs} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="darky">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <BorderBeam
          size={200}
          duration={12}
          delay={8}
          colorFrom="white"
          colorTo="#484848"
        />
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" skills={skills} langs={langs} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({
  className,
  skills,
  langs,
}: {
  className?: string;
  skills: string[];
  langs: string[];
}) {
  const [skillsList, setSkillsList] = useState(skills);
  const [newSkill, setNewSkill] = useState("");
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [isLinkedIn, setIsLinkedIn] = useState(false);
  const [isGitHub, setIsGitHub] = useState(false);
  const [isInstagram, setIsInstagram] = useState(false);
  const [isX, setIsX] = useState(false);
  const [langList, setLanglist] = useState(langs);
  const [newLang, setNewlang] = useState("");

  const handleLinkedInChange = () => setIsLinkedIn(!isLinkedIn);
  const handleGitHubChange = () => setIsGitHub(!isGitHub);
  const handleInstagramChange = () => setIsInstagram(!isInstagram);
  const handleXChange = () => setIsX(!isX);

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
  function handleAddlang(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void {
    event.preventDefault();
    if (newLang.trim() !== "") {
      setLanglist([...langList, newLang.trim()]);
      setNewlang("");
    }
    console.log(langList);
    console.log(newLang);
  }

  const [form, setForm] = useState({ languages: "" });

  function setform(updatedForm: any) {
    setForm(updatedForm);
  }

  return (
    <ScrollArea className="h-96">
      <form className={cn("grid items-start gap-4", className)}>
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>

          <Input type="text" id="name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="Education">Education</Label>
          <Input id="Education" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="Qualification">Qualification</Label>
          <Input id="Qualification" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="Profession">Profession</Label>
          <Input id="Profession" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="Achievements">Achievements</Label>
          <Input id="Achievements" />
        </div>
        <div className="grid gap-2">
          <div>
            <Label
              htmlFor="language"
              className="text-sm font-medium md:text-sm"
            >
              Preferred Language
            </Label>
            <div className="flex items-center justify-center  space-x-4">
            <Select
              onValueChange={(value) => {
                setNewlang(value);
              }}
            >
              <SelectTrigger className="mt-2 text-base md:text-sm">
                <SelectValue placeholder="Select your preferred language" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-black ">
                <ScrollArea className="h-44 rounded-md"
                onWheel={(e) => {
                  e.stopPropagation(); // Prevent outer ScrollArea from capturing events
                  e.currentTarget.scrollTop += e.deltaY; 
                   // Manually scroll based on wheel movement
                }}
                tabIndex={0}>
                 
                  <div className="">
                 
                    {languages.map((language) => (
                      
                      <SelectItem
                        className="break-words bg-white text-black dark:bg-black dark:text-white"
                        key={language.alpha2}
                        value={language.English}
                      >
                        {language.English}
                        <br />
                      </SelectItem>
                      
                    ))}
                      <ScrollBar orientation="vertical"
                  className="h-2 bg-gray-400 rounded-full transition-all duration-300 hover:bg-gray-600" />
                  </div>
                 
                </ScrollArea>
              </SelectContent>
            </Select>

            <div className=" relative mt-2">
              <Button type="button" variant="darky" onClick={handleAddlang}>
                Add
              </Button>
            </div>
            </div>
            <div className="mb-2  mt-4 flex flex-wrap gap-2">
              {Array.isArray(langList) &&
                langList.map((lang, index) => (
                  <motion.span
                    key={index}
                    className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary dark:bg-primary/20 dark:text-primary-foreground"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {lang} {}
                    <X
                      size={16}
                      className="ml-1 cursor-pointer"
                      onClick={() =>
                        setLanglist(langList.filter((s) => s !== lang))
                      }
                    />
                  </motion.span>
                ))}
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="Location">Location</Label>
          <Input id="Location" />
        </div>
        <div className="">
          <Label className="mb-2" htmlFor="Socialmedia">
            Social media
          </Label>
          <div className="mb-2 mt-2 flex items-center justify-center space-x-4">
            <div className="flex items-center justify-center space-x-2">
              <Linkedin size={24} />
              <Switch
                id="LK"
                checked={isLinkedIn}
                onCheckedChange={handleLinkedInChange}
                className={`transition-colors duration-300 ${isLinkedIn ? "bg-white" : "bg-gray-400"}`}
              />
            </div>
            <div className="flex items-center justify-center space-x-2">
              <GitHubLogoIcon width={24} height={24} />
              <Switch
                checked={isGitHub}
                onCheckedChange={handleGitHubChange}
                className={`transition-colors duration-300 ${isGitHub ? "bg-white" : "bg-gray-400"}`}
              />
            </div>
            <div className="flex items-center justify-center space-x-2">
              <X size={24} />
              <Switch
                checked={isX}
                onCheckedChange={handleXChange}
                className={`transition-colors duration-300 ${isX ? "bg-white" : "bg-gray-400"}`}
              />
            </div>
            <div className="flex items-center justify-center space-x-2">
              <InstagramLogoIcon width={24} height={24} />
              <Switch
                checked={isInstagram}
                onCheckedChange={handleInstagramChange}
                className={`transition-colors duration-300 ${isInstagram ? "bg-white" : "bg-gray-400"}`}
              />
            </div>
          </div>
          <div className="mb-2">
            {isLinkedIn && (
              <div className="flex items-center space-x-2">
                <Input placeholder="Enter LinkedIn URL" />
              </div>
            )}
          </div>
          <div className="mb-2">
            {isGitHub && (
              <div className="flex items-center space-x-2">
                <Input placeholder="Enter GitHub URL" />
              </div>
            )}
          </div>
          <div className="mb-2">
            {isX && (
              <div className="flex items-center space-x-2">
                <Input placeholder="Enter X URL" />
              </div>
            )}
          </div>
          <div className="mb-2">
            {isInstagram && (
              <div className="flex items-center space-x-2">
                <Input placeholder="Enter Instagram URL" />
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-2">
          <Label className="mb-2" htmlFor="Skills">
            Skills
          </Label>

          <div className="mb-4 flex flex-wrap gap-2">
            {Array.isArray(skillsList) &&
              skillsList.map((skill, index) => (
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
                      setSkillsList(skillsList.filter((s) => s !== skill))
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
        <Button type="submit">Save changes</Button>
      </form>
    </ScrollArea>
  );
}
