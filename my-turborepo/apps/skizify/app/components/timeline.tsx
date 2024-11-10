import { Check } from "lucide-react";

import { motion } from "framer-motion";

export default function Timelinecompo({
  activeStep,
  completedSteps,
  steps,
}: {
  currentStep: number;
  activeStep: number;
  completedSteps: number[];
  steps: { title: string; description: string; icon: any }[];
}) {
  return (
    <div className="hidden h-full w-full overflow-hidden rounded-lg bg-black p-5 text-white shadow-lg sm:block lg:block">
      <div className="space-y-6">
        {/* Animated steps */}
        <div className="flex flex-col space-y-8">
          {steps.map((step, index) =>
            index >= activeStep && index < activeStep + 3 ? (
              <motion.div
                key={index}
                className={`group relative flex flex-col items-center transition-all duration-1000 sm:flex-row sm:items-start`}
                initial={{ opacity: 0, y: 50 }} // Initial state for smoother entry
                animate={{
                  opacity: 1,
                  y: 0,
                }} // Scrolls to the normal position when active
                exit={{ opacity: 0, y: -50 }} // Scrolls up when inactive
                transition={{
                  opacity: { duration: 0.9, ease: "easeInOut" }, // Smooth fade-in
                  y: {
                    duration: 1.0,
                    type: "spring",
                    stiffness: 120,
                    damping: 25,
                  }, // Smooth scroll-up effect with bounce
                }}
              >
                {/* Step Circle */}
                <div className="mb-3 flex flex-col items-center sm:mb-0 sm:mr-4">
                  <motion.div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-4 transition-all duration-500 ease-in-out sm:h-14 sm:w-14 ${completedSteps.includes(index) ? "border-gray-700 bg-green-500" : index === activeStep ? "border-gray-700 bg-white" : "border-gray-700 bg-gray-800"}`}
                    animate={{ scale: index === activeStep ? 1.2 : 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.25 }} // Hover effect for the icon
                  >
                    {completedSteps.includes(index) ? (
                      <Check className="h-7 w-7 text-black" />
                    ) : (
                      <step.icon className={`h-7 w-7 text-gray-500`} />
                    )}
                  </motion.div>

                  {/* Line between icons */}
                  {index < steps.length - 1 && (
                    <div
                      className={`my-1 h-24 w-1 ${completedSteps.includes(index) ? "bg-green-500" : "bg-gray-700"} transition-all duration-700`}
                    />
                  )}
                </div>

                {/* Text Content */}
                <div
                  className={`text-center transition-all duration-500 ease-in-out sm:pl-4 sm:text-left`}
                >
                  <motion.h3
                    className={`mb-2 text-lg font-semibold sm:text-xl ${completedSteps.includes(index) ? "text-white" : "text-gray-500"}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p
                    className={`text-base sm:text-lg ${completedSteps.includes(index) ? "text-gray-300" : "text-gray-600"}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {step.description}
                  </motion.p>
                </div>
              </motion.div>
            ) : null,
          )}
        </div>

        {/* Navigation Buttons */}
      </div>
    </div>
  );
}
