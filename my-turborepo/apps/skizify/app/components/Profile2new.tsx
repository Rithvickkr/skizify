"use client";

import { AnimatePresence, motion, useAnimation } from "framer-motion";
import {
  Briefcase,
  CheckCircle,
  ChevronRight,
  Globe,
  GraduationCap,
  Loader2,
  Shield,
  Upload,
  User,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "../../@/components/ui/input";
import { Label } from "../../@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../@/components/ui/select";
import { Textarea } from "../../@/components/ui/textarea";
import { setformy } from "../lib/actions/setform";
import { BottomGradient } from "./SignupForm";

export default function Newprofile({isVisible} : {isVisible: boolean}) {
  if (!isVisible) return null;
  interface form {
    name: string;
    username: string;
    bio: string;
    institute: string;
    session: any;
    languages: string;
    qualification: string;
    profession: string;
    location: string;
  }

  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme, setTheme } = useTheme();
  const controls = useAnimation();
  const [form, setform] = useState<form>({
    name: "",
    username: "",
    bio: "",
    institute: "",
    session: session,
    languages: "",
    qualification: "",
    profession: "",
    location: "",
  });

  const formFields = [
    { label: "Name", type: "text", placeholder: "John Doe" },
    { label: "Username", type: "text", placeholder: "johndoe" },
    { label: "profession", type: "text", placeholder: "Software Engineer" },
    {
      label: "Qualification",
      type: "text",
      placeholder: "Bachelor's in Computer Science",
    },
    {
      label: "Institute",
      type: "text",
      placeholder: "University of Technology",
    },
    { label: "Location", type: "text", placeholder: "Delhi, India" },
  ];

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await controls.start({ opacity: 0, y: 20 });
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    await controls.start({ opacity: 1, y: 0 });

    console.log(form);
    await setformy(
      form.name,
      form.username,
      form.bio,
      form.institute,
      session,
      skills,
      [form.languages], // Wrap the form.languages in an array
      form.qualification,
      form.profession,
      form.location
    );
    console.log(form);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => {
    if (currentStep < formFields.length + 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addSkill = () => {
    if (currentSkill && !skills.includes(currentSkill)) {
      setSkills([...skills, currentSkill]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4  ">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-card text-card-foreground relative w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background opacity-30" />
        <div className="relative flex flex-col md:flex-row">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col justify-between bg-black p-6 text-primary-foreground md:w-1/3 md:p-8"
          >
            <div>
              <h2 className="mb-2 text-2xl font-bold md:mb-4 md:text-3xl">
                Your Professional Profile
              </h2>
              <p className="mb-6 text-sm opacity-90">
                Showcase your qualifications, skills, and expertise to the
                world.
              </p>
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mb-6"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative mx-auto h-32 w-32 cursor-pointer md:h-40 md:w-40"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-4 border-primary-foreground bg-secondary">
                  {photo ? (
                    <img
                      src={photo}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-1/2 w-1/2 text-secondary-foreground" />
                  )}
                </div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 transition-opacity duration-300"
                  whileHover={{ opacity: 1 }}
                >
                  <Upload className="h-8 w-8 text-white" />
                </motion.div>
              </motion.div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                className="hidden"
              />
              <p className="mt-4 text-center text-sm opacity-75">
                Click to upload your profile picture
              </p>
            </motion.div>
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex items-center space-x-3"
              >
                <Shield className="h-6 w-6" />
                <div>
                  <h3 className="font-semibold">Secure Profile</h3>
                  <p className="text-xs opacity-75">Your data is protected</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex items-center space-x-3"
              >
                <Zap className="h-6 w-6" />
                <div>
                  <h3 className="font-semibold">Instant Updates</h3>
                  <p className="text-xs opacity-75">
                    Changes reflect immediately
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex items-center space-x-3"
              >
                <Users className="h-6 w-6" />
                <div>
                  <h3 className="font-semibold">Connect with Peers</h3>
                  <p className="text-xs opacity-75">Expand your network</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col p-6 md:w-2/3 md:p-8"
          >
            <form onSubmit={handleSubmit} className="flex-grow space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="flex min-h-[200px] flex-col justify-center"
                >
                  {currentStep < formFields.length ? (
                    <div>
                      <Label
                        htmlFor={formFields[currentStep]?.label
                          ?.toLowerCase()
                          .replace(" ", "-")}
                        className="text-base font-medium md:text-lg"
                      >
                        {formFields[currentStep]?.label ?? ""}
                      </Label>
                      <Input
                        type={formFields[currentStep]?.type ?? ""}
                        id={
                          formFields[currentStep]?.label
                            ?.toLowerCase()
                            .replace(" ", "-") ?? ""
                        }
                        placeholder={formFields[currentStep]?.placeholder ?? ""}
                        className="mt-2 text-base md:text-lg"
                        onChange={(e) =>
                          setform({
                            ...form,
                            [formFields[currentStep]?.label
                              ?.toLowerCase()
                              .replace(" ", "-") || ""]: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  ) : currentStep === formFields.length ? (
                    <div>
                      <Label
                        htmlFor="language"
                        className="text-base font-medium md:text-lg"
                      >
                        Preferred Language
                      </Label>
                      <Select
                        onValueChange={(value) => {
                          setform({ ...form, languages: value });
                        }}
                      >
                        <SelectTrigger className="mt-2 w-full text-base md:text-lg">
                          <SelectValue placeholder="Select your preferred language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ) : currentStep === formFields.length + 1 ? (
                    <div>
                      <Label
                        htmlFor="skills"
                        className="text-base font-medium md:text-lg"
                      >
                        Skills
                      </Label>
                      <div className="mt-2 flex">
                        <Input
                          type="text"
                          id="skills"
                          value={currentSkill}
                          onChange={(e) => setCurrentSkill(e.target.value)}
                          placeholder="Enter a skill"
                          className="mr-2 text-base md:text-lg"
                        />
                        <Button type="button" onClick={addSkill}>
                          Add
                        </Button>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="ml-2 focus:outline-none"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Label
                        htmlFor="bio"
                        className="text-base font-medium md:text-lg"
                      >
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself and your professional journey"
                        className="mt-2 text-base md:text-lg"
                        onChange={(e) =>
                          setform({ ...form, bio: e.target.value })
                        }
                        rows={4}
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
              <div className="mt-8 flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="w-24"
                >
                  Back
                </Button>
                {currentStep < formFields.length + 2 ? (
                   <Button
                   onClick={nextStep}
                   variant="gooeyLeft"
                   className="group/btn relative bg-black dark:bg-white dark:text-black text-white dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] md:h-10 md:px-4 md:py-2"
                   
                 >
                  Next
                   <BottomGradient />
                 </Button>
                ) : (
                  <Button
                    type="button"
                    className="w-24"
                    disabled={isLoading}
                    onClick={handleSubmit}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Submit <CheckCircle className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="border-border mt-8 border-t pt-8"
            >
              <h3 className="mb-4 text-lg font-semibold">
                Why Complete Your Profile?
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="flex items-start space-x-3">
                  <Briefcase className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Career Opportunities</h4>
                    <p className="text-muted-foreground text-sm">
                      Attract potential employers
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <GraduationCap className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Showcase Expertise</h4>
                    <p className="text-muted-foreground text-sm">
                      Highlight your skills and knowledge
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Globe className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Global Networking</h4>
                    <p className="text-muted-foreground text-sm">
                      Connect with professionals worldwide
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 h-1 w-full bg-primary"
          initial={{ width: "0%" }}
          animate={{
            width: `${((currentStep + 1) / (formFields.length + 3)) * 100}%`,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
}
