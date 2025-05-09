"use client";
import { DatePicker, PickerValidDate, TimePicker } from "@mui/x-date-pickers";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Input } from "../../@/components/ui/input";
import { Label } from "../../@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../@/components/ui/select";
import { Textarea } from "../../@/components/ui/textarea";
import { GigSet } from "../lib/actions/setgig";
import { Button } from "./ui/button";
import { ToastAction } from "../../@/components/ui/toast";
import { toast } from "../../@/components/ui/use-toast";

// Particle background component

export default function Postform() {
  interface FormData {
    Title: string;
    startdate: string;
    starttime: string;
    enddate: string;
    endtime: string;
    description: string;
    category: string;
    [key: string]: string; // Add index signature
  }
  const { data: session } = useSession();
  const [timeneed, setTimeneed] = useState<number>(0);
  const theme = useTheme();

  const [formData, setFormData] = useState<FormData>({
    Title: "",
    startdate: "",
    starttime: "",
    enddate: "",
    endtime: "",
    description: "",
    category: "",
    timeneed: "",
  });

  interface FormErrors {
    Title?: string;
    startdate?: string;
    starttime?: string;
    enddate?: string;
    endtime?: string;
    category?: string;
    slot?: string;
    description?: string;

    [key: string]: string | undefined;
  }

  const [errors, setErrors] = useState<FormErrors>({});

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  const validateForm = () => {
    let newErrors: FormErrors = {};
    if (currentStep === 0) {
      if (!formData.Title.trim()) newErrors.Title = "gig name is required";
      if (!formData.description.trim())
        newErrors.description = "description is required";
      else return true;
    }
    if (currentStep === 1) {
      if (!formData.startdate) newErrors.startdate = "Start Date is required";
      if (!formData.starttime) newErrors.starttime = "Start Time is required";
      if (!formData.enddate) newErrors.enddate = "End Date is required";
      if (!formData.endtime) newErrors.endtime = "End Time is required";
      else return true;
    }
    if (currentStep === 2) {
      if (!formData.category.trim()) newErrors.category = "slot is required";
      if (!timeneed) newErrors.slot = "slot is required";
      else return true;
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return false;
    else return true;
  };
  function calculateTimeInterval(startTime: string, endTime: string) {
    const date = new Date().toISOString().split("T")[0];
    const startDateTime1 = new Date(`${date}T${startTime}:00`);
    const endDateTime1 = new Date(`${date}T${endTime}:00`);

    const differenceInMilliseconds =
      endDateTime1.getTime() - startDateTime1.getTime();
    const differenceInSeconds = differenceInMilliseconds / 1000;
    const differenceInMinutes = differenceInSeconds / 60;
    const differenceInHours = differenceInMinutes / 60;

    return {
      milliseconds: differenceInMilliseconds,
      seconds: differenceInSeconds,
      minutes: differenceInMinutes,
      hours: differenceInHours,
    };
  }
  const interval = calculateTimeInterval(formData.starttime, formData.endtime);

  const startdateonly = formData.startdate.slice(0, 15);
  const enddateonly = formData.enddate.slice(0, 15);
  const starttimeonly = formData.starttime.slice(16);
  const endtimeonly = formData.endtime.slice(16);
  function compileToISO(dateStr: string, timeStr: string) {
    const combinedStr = `${dateStr} ${timeStr}`;

    const dateObj = new Date(combinedStr);

    if (isNaN(dateObj.getTime())) {
      return "Invalid date or time value";
    }

    return dateObj.toISOString();
  }

  const startisodate = compileToISO(startdateonly, starttimeonly);
  const endisodate = compileToISO(enddateonly, endtimeonly);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!validateForm()) {
        setIsSubmitting(false);
        return;
      }
      await GigSet(
        formData.Title,
        formData.description,
        startisodate,
        endisodate,
        session,
        interval,
        timeneed,
        formData.category,
      );
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          Title: "",
          startdate: "",
          starttime: "",
          enddate: "",
          endtime: "",
          category: "",
          description: "",
        });
      }, 3000);
      setCurrentStep(0);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast("Error", "There was a problem with your request.", {
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formSteps = [
    { Title: "Details", fields: ["Title", "description"] },
    {
      Title: "Date & Time",
      fields: ["startdate", "starttime", "enddate", "endtime"],
    },
    { Title: "Category", fields: ["category"] },
    
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white text-white dark:bg-black">
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

        <div className="mx-auto max-w-4xl rounded-lg bg-v0dark p-8 shadow-lg backdrop-blur-lg dark:bg-white dark:bg-opacity-10">
          <div className="mb-8 flex items-center justify-between">
            {formSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index <= currentStep ? "text-white" : "text-neutral-400"
                }`}
              >
                <div
                  className={`mr-2 flex size-10 items-center justify-center rounded-md ${
                    index <= currentStep ? "bg-neutral-500" : "bg-neutral-300"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="hidden sm:inline">{step.Title}</span>
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
                      <Label htmlFor={field} className="text-white">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </Label>
                      {field === "description" ? (
                        currentStep === 0 && (
                          <Textarea
                            id={field}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            placeholder={`Description`}
                            className={`mt-3 border-white bg-white bg-opacity-20 text-white placeholder-white ${errors[field] ? "border-red-500" : ""}`}
                            rows={4}
                          />
                        )
                      ) : (
                        <div className="relative">
                          <div>
                            {field === "category" ? (
                              <>
                                <div className="mt-3">
                                  <Select
                                    onValueChange={(value) => {
                                      setFormData((prevData) => ({
                                        ...prevData,
                                        category: value,
                                      }));
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue
                                        className="bg-white bg-opacity-20"
                                        placeholder="Select a category"
                                      />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white p-1 pr-2 dark:border-0 dark:bg-black">
                                      <SelectItem
                                        className="m-1 rounded-md border bg-neutral-300 text-black opacity-80 hover:opacity-100 hover:shadow-sm dark:border-neutral-700 dark:bg-black dark:text-white dark:opacity-60 hover:dark:opacity-90"
                                        value={"Entertainment"}
                                      >
                                        Entertainment
                                      </SelectItem>
                                      <SelectItem
                                        className="m-1 rounded-md border bg-neutral-300 text-black opacity-80 hover:opacity-100 hover:shadow-sm dark:border-neutral-700 dark:bg-black dark:text-white dark:opacity-60 hover:dark:opacity-90"
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
                                        className="m-1 rounded-md border bg-neutral-300 text-black opacity-80 hover:opacity-100 hover:shadow-sm dark:border-neutral-700 dark:bg-black dark:text-white dark:opacity-60 hover:dark:opacity-90"
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
                                        className="m-1 rounded-md border bg-neutral-300 text-black opacity-80 hover:opacity-100 hover:shadow-sm dark:border-neutral-700 dark:bg-black dark:text-white dark:opacity-60 hover:dark:opacity-90"
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
                                <div className="">
                                  {errors[field] && (
                                    console.log(errors[field]),
                                    <p className="mt-1 text-sm text-red-300">
                                      category is required
                                    </p>
                                  )}
                                </div>

                                <div className="pt-2">
                                  <Label htmlFor="timeneeded">Slot</Label>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className="mt-2 w-full bg-transparent"
                                      >
                                        <div className="flex items-center justify-between">
                                          <span>
                                            {selectedTime
                                              ? `${selectedTime} mins selected`
                                              : "Select a time"}
                                          </span>
                                          <ChevronDownIcon className="h-4 w-4" />
                                        </div>
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="space-y-4 border border-[#d1d5d8] bg-[#484848] p-4 transition duration-200 hover:shadow-xl dark:border-neutral-800 dark:bg-black dark:shadow-none">
                                      <div className="grid grid-cols-3 gap-2">
                                        {[30, 45, 60].map((time) => (
                                          <Button
                                            key={time}
                                            variant="default"
                                            className={`border-[#d1d5d8] px-2 py-1 text-xs ${
                                              selectedTime === time
                                                ? "border-neutral-500 bg-black text-white hover:border hover:border-neutral-500 hover:bg-black hover:text-white dark:bg-white dark:text-black"
                                                : "bg-white text-black opacity-80 hover:border hover:border-neutral-500 hover:bg-black hover:text-white hover:opacity-100 dark:bg-neutral-800 dark:text-white"
                                            }`}
                                            onClick={() => {
                                              setTimeneed(time);
                                              setSelectedTime(time);
                                            }}
                                          >
                                            {time} mins
                                          </Button>
                                        ))}
                                      </div>
                                    </PopoverContent>
                                  </Popover>
                                </div>
                              </>
                            ) : (
                              <>
                                {field === "startdate" ||
                                field === "enddate" ? (
                                  <div
                                    className={`${errors[field] ? "border-red-500" : ""} flex flex-col`}
                                  >
                                    <DatePicker
                                      slotProps={{
                                        popper: {
                                          sx: {
                                            ...{
                                              "& .MuiPickersDay-root.Mui-selected":
                                                { backgroundColor: "#484848" },
                                              "& .MuiPickersDay-root.Mui-selected:hover":
                                                { backgroundColor: "#484848" },

                                              "& .MuiPickersDay-root:hover": {
                                                backgroundColor: "#484848",
                                                color: "#ffffff",
                                              },
                                              borderRadius: "20px",
                                            },
                                          },
                                        },
                                        textField: {
                                          variant: "outlined",

                                          size: "small",
                                          error: false,
                                        },
                                        layout: {
                                          sx: {
                                            color:
                                              theme.toString() === "dark"
                                                ? "#ffffff"
                                                : "#000000",
                                            borderRadius: "2px",
                                            borderWidth: "1px",
                                            borderColor: "#2196f3",
                                            border: "1px solid",
                                            backgroundColor:
                                              theme.toString() === "dark"
                                                ? "#484848"
                                                : "#ffffff",
                                          },
                                        },
                                      }}
                                      sx={{
                                        backgroundColor: "#484848",

                                        borderRadius: "10px",

                                        width: "100%",
                                      }}
                                      value={
                                        formData[field] as unknown as
                                          | PickerValidDate
                                          | null
                                          | undefined
                                      }
                                      onChange={(date) => {
                                        setFormData({
                                          ...formData,
                                          [field]: (date || "").toString(),
                                        });
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <>
                                    <div className="mt-3 flex flex-col">
                                      {field === "starttime" ||
                                      field === "endtime" ? (
                                        <>
                                          <div>
                                            <TimePicker
                                              sx={{
                                                backgroundColor: "#484848",
                                                color: "white",
                                                borderRadius: "10px",
                                                borderColor: "white",

                                                width: "100%",
                                              }}
                                              slotProps={{
                                                popper: {
                                                  sx: {
                                                    ...{
                                                      "& .MuiPickersDay-root.Mui-selected":
                                                        {
                                                          backgroundColor:
                                                            "#484848",
                                                        },
                                                      "& .MuiPickersDay-root.Mui-selected:hover":
                                                        {
                                                          backgroundColor:
                                                            "#484848",
                                                        },

                                                      "& .MuiPickersDay-root:hover":
                                                        {
                                                          backgroundColor:
                                                            "#484848",
                                                          color: "white",
                                                        },
                                                    },
                                                  },
                                                },
                                                textField: {
                                                  variant: "outlined",
                                                  size: "small",
                                                  error: false,
                                                },
                                              }}
                                              value={
                                                formData[field] as unknown as
                                                  | PickerValidDate
                                                  | null
                                                  | undefined
                                              }
                                              onChange={(time) => {
                                                setFormData({
                                                  ...formData,
                                                  [field]: (
                                                    time || ""
                                                  ).toString(),
                                                });
                                              }}
                                            />
                                          </div>
                                        </>
                                      ) : (
                                        <Input
                                          type="text"
                                          id={field}
                                          name={field}
                                          value={formData[field]}
                                          onChange={handleChange}
                                          placeholder={`Title`}
                                          className={`rounded-md border-neutral-300 bg-white bg-opacity-20 text-white placeholder-neutral-200 focus:border-transparent focus:outline-none ${errors[field] ? "border-red-500" : ""} `}
                                        />
                                      )}
                                    </div>
                                  </>
                                )}
                              </>
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
                  variant="gooeyLeft"
                  className="bg-white text-black opacity-90 hover:opacity-100"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  <ChevronLeftIcon className="mr-2 size-5" />
                  Previous
                </Button>
              )}
              {currentStep < formSteps.length - 1 ? (
                <Button
                  type="button"
                  variant="gooeyLeft"
                  className="bg-white text-black opacity-90 hover:opacity-100"
                  onClick={() => {
                    if (validateForm()) {
                      setCurrentStep(currentStep + 1);
                    }
                  }}
                >
                  Next
                  <ChevronRightIcon className="ml-2 size-5" />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="gooeyLeft"
                  className="min-w-28 bg-white text-black opacity-90 hover:opacity-100"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="spinner">Submitting...</div>
                  ) : (
                    "Submit"
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>

      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-80% fixed bottom-4 right-4 flex max-w-lg items-center justify-between rounded-lg border bg-transparent px-5 py-3 text-black shadow-lg dark:border-white/20 dark:text-white"
        >
          <div className="text-sm">
            <div className="flex flex-col">
              <div className="text-base font-medium">
                Meeting: {formData.Title}
              </div>
              <div className="mt-2 flex gap-1 text-xs text-gray-500 dark:text-gray-400">
                <div>
                  {new Date(formData.startdate).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  {new Date(formData.starttime).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                {"⎯"}
                <div>
                  {new Date(formData.enddate).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  {new Date(formData.endtime).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          </div>
          <div>
            <Button
              className="ml-4 rounded-lg border bg-white px-3 py-1 text-black opacity-90 hover:bg-black/20 hover:opacity-100 dark:border-white/20 dark:bg-black dark:text-white dark:opacity-90 dark:hover:opacity-100"
              onClick={() => setIsSubmitted(false)}
            >
              Close
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
