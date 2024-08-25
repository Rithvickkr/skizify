"use client";
import { useState, useEffect } from "react";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { Textarea } from "../../@/components/ui/textarea";
import { Label } from "../../@/components/ui/label";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  Pencil,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../@/components/ui/select";
import { set } from "date-fns";

// Particle background component
const ParticleBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById(
      "particle-canvas",
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.1;
      }

      draw() {
        if (ctx) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
          ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();
        }
      }
    }

    let particleArray: Particle[] = [];

    const init = () => {
      particleArray = [];
      for (let i = 0; i < 100; i++) {
        particleArray.push(new Particle());
      }
    };

    const animate = () => {
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i]?.update();
        particleArray[i]?.draw();
      }
      requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      id="particle-canvas"
      className="fixed left-0 top-0 -z-10 h-full w-full"
    />
  );
};

export default function Postform() {
  interface FormData {
    eventName: string;
    startdate: string;
    starttime: string;
    enddate: string;
    endtime: string;
    description: string;
    category: string;
    [key: string]: string; // Add index signature
  }

  const [formData, setFormData] = useState<FormData>({
    eventName: "",
    startdate: "",
    starttime: "",
    enddate: "",
    endtime: "",
    description: "",
    category: "",
  });

  interface FormErrors {
    eventName?: string;
    date?: string;
    time?: string;
    location?: string;
    description?: string;

    [key: string]: string | undefined;
  }

  const [errors, setErrors] = useState<FormErrors>({});

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors: FormErrors = {};
    if (!formData.eventName.trim())
      newErrors.eventName = "gig name is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.category.trim()) newErrors.location = "category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (true) {
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
      setFormData({
        eventName: "",
        startdate: "",
        starttime: "",
        enddate: "",
        endtime: "",
        category: "",
        description: "",
      });
      setCurrentStep(0);
    }
  };

  const formSteps = [
    { title: "Gig Details", fields: ["Title", "description"] },
    {
      title: "Date & Time",
      fields: ["startdate", "starttime", "enddate", "endtime"],
    },
    { title: "category", fields: ["category"] },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white text-white dark:bg-black">
      <ParticleBackground />

      <main className="container mx-auto flex-grow px-4 py-10">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-5xl font-bold text-black dark:text-white">
            Create Your GIG
          </h1>
          <p className="text-xl text-black dark:text-white">
            Bring your vision to life with our immersive GIG creation
            experience.
          </p>
        </motion.section>

        <div className="mx-auto max-w-4xl rounded-lg bg-[#000000e0] p-8 shadow-lg backdrop-blur-lg dark:bg-white dark:bg-opacity-10">
          <div className="mb-8 flex items-center justify-between ">
            {formSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index <= currentStep ? "text-white" : "text-gray-400"
                }`}
              >
                <div
                  className={`mr-2 flex h-8 w-8 items-center justify-center rounded-full ${
                    index <= currentStep ? "bg-purple-500" : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="hidden sm:inline">{step.title}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {formSteps[currentStep]?.fields.map((field) => (
                  <div className="p-2">
                    {field === "enddate" ? (
                      <div className="pt-5 text-center">TO</div>
                    ) : (
                      ""
                    )}
                    <div key={field}>
                      <Label htmlFor={field} className="  text-white ">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </Label>
                      {field === "description" ? (
                        currentStep === 0 && (
                          <Textarea
                            id={field}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            placeholder={`Enter event ${field}`}
                            className={`mt-3  border-purple-300 bg-white bg-opacity-20 text-white placeholder-purple-200 ${errors[field] ? "border-red-500" : ""}`}
                            rows={4}
                          />
                        )
                      ) : (
                        <div className="relative">
                          {field === "startdate" || field === "enddate" ? (
                            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 transform text-white" />
                          ) : field === "starttime" || field === "endtime" ? (
                            <ClockIcon className="absolute left-3 top-1/2 -translate-y-1/2 transform text-white" />
                          ) : (
                            field === "Title" && (
                              <Pencil className="absolute left-3 top-1/2 -translate-y-1/2 transform text-white" />
                            )
                          )}
                          <div >
                            {field === "category" ? (
                              <div className="mt-3">
                              <Select
                                onValueChange={(value) => {
                                  setFormData((prevData) => ({
                                    ...prevData,
                                    category: value,
                                  }));
                                  console.log(value); // This will log the selected category
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value={"Entertainment"}>
                                    Entertainment
                                  </SelectItem>
                                  <SelectItem
                                    onClick={() => {
                                      setFormData({
                                        ...formData,
                                        category: "Education",
                                      });
                                    }}
                                    value={"Education"}
                                  >
                                    Education
                                  </SelectItem>
                                  <SelectItem
                                    onClick={() => {
                                      setFormData({
                                        ...formData,
                                        category: "Art",
                                      });
                                    }}
                                    value={"Art"}
                                  >
                                    Art
                                  </SelectItem>
                                  <SelectItem
                                    onClick={() => {
                                      setFormData({
                                        ...formData,
                                        category: "Tech",
                                      });
                                    }}
                                    value={"Tech"}
                                  >
                                    Tech
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              </div>
                            ) : (
                              <Input
                                id={field}
                                name={field}
                                type={
                                  field === "startdate" || field === "enddate"
                                    ? "date"
                                    : field === "starttime" ||
                                        field === "endtime"
                                      ? "time"
                                      : "text"
                                }
                                value={formData[field]}
                                onChange={handleChange}
                                placeholder={`Enter event ${field}`}
                                className={`mt-3  border-purple-300 bg-white bg-opacity-20 pl-10 text-white placeholder-purple-200  ${errors[field] ? "border-red-500" : ""}`}
                              />
                            )}
                          </div>
                        </div>
                      )}
                      {errors[field] && (
                        <p className="mt-1 text-sm text-red-300">
                          {errors[field]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between">
              {currentStep > 0 && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  <ChevronLeftIcon className="mr-2 h-5 w-5" />
                  Previous
                </Button>
              )}
              {currentStep < formSteps.length - 1 ? (
                <Button
                  type="button"
                  variant= "secondary"
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Next
                  <ChevronRightIcon className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button type="button" onClick={handleSubmit}>
                  Submit
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>

      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-4 right-4 rounded-lg bg-purple-600 px-4 py-2 text-white shadow-lg"
        >
          Form submitted successfully!
        </motion.div>
      )}
    </div>
  );
}