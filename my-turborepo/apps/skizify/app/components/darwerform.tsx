import * as React from "react";

import { cn } from "../utils/cn";
import { useMediaQuery } from "../hooks/useMediaQuery";
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
import { motion } from "framer-motion";
import { Linkedin, Plus, X } from "lucide-react";
import { useState } from "react";
import { Textarea } from "../../@/components/ui/textarea";
import { ScrollArea, ScrollBar } from "../../@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../@/components/ui/select";
import languages from "../utils/languages";

import { BorderBeam } from "../../@/components/ui/border-beam";
import { Switch } from "../../@/components/ui/switch";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
export function DrawerDialogDemo({ skills }: { skills: string[] }) {
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
          <ProfileForm skills={skills} />
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
        <ProfileForm className="px-4" skills={skills} />
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
}: {
  className?: string;
  skills: string[];
}) {
  const [skillsList, setSkillsList] = useState(skills);
  const [newSkill, setNewSkill] = useState("");
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [isLinkedIn, setIsLinkedIn] = useState(false);
  const [isGitHub, setIsGitHub] = useState(false);
  const [isInstagram, setIsInstagram] = useState(false);
  const [isX, setIsX] = useState(false);

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

  const [form, setForm] = useState({ languages: "" });

  function setform(updatedForm: any) {
    setForm(updatedForm);
  }

  const [isOn, setIsOn] = useState(false);

  const handleSwitchChange = () => {
    setIsOn(!isOn);
  };

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
            <Select
              onValueChange={(value) => {
                setform({ ...form, languages: value });
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
        <div className="grid gap-2">
          <Label htmlFor="Location">Location</Label>
          <Input id="Location" />
        </div>
        <div className="">
          <Label className="mb-2" htmlFor="Socialmedia">
            Social media
          </Label>
          <div className=" mb-2 mt-2 flex items-center justify-center space-x-4">
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
