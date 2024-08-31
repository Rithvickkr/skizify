"use client";

import {
    Briefcase,
    Camera,
    GraduationCap,
    Languages,
    Mail,
    School,
    Upload,
    User,
    X
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { Label } from "../../@/components/ui/label";
import { Textarea } from "../../@/components/ui/textarea";

export default function Component() {
  const [theme, setTheme] = useState("light");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");



  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 transition-all duration-500 dark:from-black">
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl transition-all duration-500 dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 p-8 dark:border-slate-700 dark:bg-black">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
            Profile Details
          </h1>
        </div>
        <form className="space-y-8 p-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="group flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-teal-400 to-emerald-400 transition-all duration-300 hover:from-teal-500 hover:to-emerald-500">
              <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-white dark:bg-slate-800">
                <Camera
                  className="text-slate-400 transition-transform duration-300 group-hover:scale-110"
                  size={48}
                />
              </div>
            </div>
            <Button
              variant="outline"
              className="h-12 rounded-full border-2 border-slate-300 px-6 text-slate-700 transition-all duration-300 hover:border-teal-500 hover:text-teal-600 dark:border-slate-600 dark:text-slate-300 dark:hover:border-teal-400 dark:hover:text-teal-400"
            >
              <Upload className="mr-2 h-4 w-4" /> Upload Photo
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="fullName"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Full Name
                </Label>
                <div className="relative">
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    className="h-12 rounded-lg border-slate-300 bg-slate-50 pl-10 text-slate-900 focus:ring-2 focus:ring-teal-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:ring-teal-400"
                  />
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 transform text-slate-400"
                    size={18}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="johndoe@example.com"
                    className="h-12 rounded-lg border-slate-300 bg-slate-50 pl-10 text-slate-900 focus:ring-2 focus:ring-teal-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:ring-teal-400"
                  />
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 transform text-slate-400"
                    size={18}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="profession"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Profession
                </Label>
                <div className="relative">
                  <Input
                    id="profession"
                    placeholder="Software Engineer"
                    className="h-12 rounded-lg border-slate-300 bg-slate-50 pl-10 text-slate-900 focus:ring-2 focus:ring-teal-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:ring-teal-400"
                  />
                  <Briefcase
                    className="absolute left-3 top-1/2 -translate-y-1/2 transform text-slate-400"
                    size={18}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="qualification"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Qualification
                </Label>
                <div className="relative">
                  <Input
                    id="website"
                    placeholder="B.Tech in Computer Science"
                    className="h-12 rounded-lg border-slate-300 bg-slate-50 pl-10 text-slate-900 focus:ring-2 focus:ring-teal-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:ring-teal-400"
                  />
                  <GraduationCap
                    className="absolute left-3 top-1/2 -translate-y-1/2 transform text-slate-400"
                    size={18}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="education"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Education Institute
                </Label>
                <div className="relative">
                  <Input
                    id="education insitute"
                    placeholder="IIT Bombay"
                    className="h-12 rounded-lg border-slate-300 bg-slate-50 pl-10 text-slate-900 focus:ring-2 focus:ring-teal-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:ring-teal-400"
                  />

                  <School
                    className="absolute left-3 top-1/2 -translate-y-1/2 transform text-slate-400"
                    size={18}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="education"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Language
                </Label>
                <div className="relative">
                  <Input
                    id="language"
                    placeholder=" English, Hindi"
                    className="h-12 rounded-lg border-slate-300 bg-slate-50 pl-10 text-slate-900 focus:ring-2 focus:ring-teal-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:ring-teal-400"
                  />
                  <Languages
                    className="absolute left-3 top-1/2 -translate-y-1/2 transform text-slate-400"
                    size={18}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="bio"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Bio
            </Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              className="h-32 rounded-lg border-slate-300 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-teal-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:ring-teal-400"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="skills"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Skills
            </Label>
            <div className="mb-2 flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="flex items-center rounded-full bg-teal-100 px-2.5 py-0.5 text-sm font-medium text-teal-800 dark:bg-teal-800 dark:text-teal-100"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-1 text-teal-600 hover:text-teal-800 dark:text-teal-300 dark:hover:text-teal-100"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <form className="flex gap-2">
              <Input
                id="skills"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                className="h-12 rounded-lg border-slate-300 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-teal-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:ring-teal-400"
              />
              <Button
                type="button"
                onClick={addSkill}
                className="h-12 rounded-lg bg-teal-500 px-4 font-semibold text-white transition-colors duration-300 hover:bg-teal-600"
              >
                Add
              </Button>
            </form>
          </div>
          <div className="flex justify-end">
            <Button className="h-12 transform rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 px-8 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-teal-600 hover:to-emerald-600 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800">
              Save Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
