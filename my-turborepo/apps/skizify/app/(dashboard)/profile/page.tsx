"use client";
import { useState, useEffect } from "react";
import { Label } from "../../../@/components/ui/label";
import { Input } from "../../../@/components/ui/input";
import { Textarea } from "../../../@/components/ui/textarea";
import { Button } from "../../../@/components/ui/button";
import { setform } from "../../lib/actions/setform";
import { useSession } from "next-auth/react";
import { Avatar } from "@repo/ui/avatar";
import { XIcon } from "lucide-react";


export default function Component() {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  
  const { data: session } = useSession();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [skills, setSkills] = useState<string[]>([])
  const handleSkillInput = (e:any) => {
    if (e.key === "Enter") {
      const newSkill = e.target.value.trim()
      if (newSkill !== "") {
        setSkills([...skills, newSkill])
       
        e.target.value = ""
      }
    }
  }
  const handleKeyDown = (event:any) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the form submission
    }
  };
  const removeSkill = (skill:string) => {
    
    setSkills(skills.filter((s) => s !== skill))
  
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (session) {
      const response = await setform(name, username, bio, education, session, skills);
      if (response) {
        
        window.alert("Profile created successfully");
        console.log(skills)

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
        <form className="space-y-6" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full"
              required={true}
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
              required={true}
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
              required={true}
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
              required={true}
            />
          </div>
          <div>
          <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Skills</Label>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 rounded-md bg-muted px-3 py-1 text-sm font-medium"
                >
                  {skill}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:bg-muted/50"
                    
                  >
                    <XIcon onClick={() => removeSkill(skill)} className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Input
                type="text"
                placeholder="Add a skill"
                className="flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                onKeyDown={handleSkillInput}
              />
            </div>
          </div>
        </div>
          </div>
          <Button
            className="w-full bg-black text-white dark:bg-white dark:text-black"
            type="button"
            onClick={handleSubmit}
          >
            Save Profile
          </Button>
        </form>
      </div>
    </div>
  );
}
