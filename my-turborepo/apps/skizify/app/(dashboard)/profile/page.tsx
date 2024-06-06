"use client";
import { useState, useEffect } from "react";
import { Label } from "../../../@/components/ui/label";
import { Input } from "../../../@/components/ui/input";
import { Textarea } from "../../../@/components/ui/textarea";
import { Button } from "../../../@/components/ui/button";
import { setform } from "../../lib/actions/setform";
import { useSession } from "next-auth/react";
import { Avatar } from "@repo/ui/avatar";
import { getImageSet } from "../../lib/actions/imageset";

export default async function Component() {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  const { data: session } = useSession();
  const [avatar, setAvatar] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (session) {
      const response = await setform(name, username, bio, education, session);
      if (response) {
        window.alert("Profile created successfully");

        setName("");
        setUsername("");
        setBio("");
        setEducation("");
      } else {
        window.alert("Profile creation failed");
      }
    } else {
      window.alert("No session found");
    }
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 dark:bg-black md:rounded-2xl md:p-8">
      <div className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Create Your Profile
        </h1>
        <div>
          <div className="flex items-center justify-center">
            <Avatar
              name={session?.user?.name || ""}
              photo={avatar || ""}
              classname="size-24 text-5xl self-center"
            />
          </div>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="education">Education</Label>
            <Input
              id="education"
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="Enter your education details"
              className="w-full"
            />
          </div>
          <Button
            className="w-full bg-black text-white dark:bg-white dark:text-black"
            type="submit"
            onClick={handleSubmit}
          >
            Save Profile
          </Button>
        </form>
      </div>
    </div>
  );
}
