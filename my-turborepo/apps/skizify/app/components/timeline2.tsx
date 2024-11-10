'use client'

import { Check, User, FileText, Tags, Zap, Trophy } from 'lucide-react'
import { useState, useEffect } from 'react'

const steps = [
  {
    title: "Create Account",
    description: "Sign up and verify your email",
    icon: User,
    completed: true,
  },
  {
    title: "Add Profile Photo",
    description: "Upload a photo that best represents you",
    icon: User,
    completed: true,
  },
  {
    title: "Enter Bio",
    description: "Write a short description about yourself",
    icon: FileText,
    completed: true,
  },
  {
    title: "Select Skills",
    description: "Choose skills that showcase your expertise",
    icon: Tags,
    completed: false,
    current: true,
  },
  {
    title: "Set Preferences",
    description: "Customize your account settings",
    icon: Zap,
    completed: false,
  },
  {
    title: "Complete Onboarding",
    description: "Finish up and explore the platform",
    icon: Trophy,
    completed: false,
  },
]

export default function timelineComponent() {
  const [activeStep, setActiveStep] = useState(3) // Index of the current step

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % steps.length)
    }, 5000) // Change active step every 5 seconds for demo purposes

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-96 h-full bg-black text-white shadow-lg overflow-y-auto">
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-8 text-white">Your Journey</h2>
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex group">
                <div className="flex flex-col items-center mr-6">
                  <div 
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-4 transition-all duration-500 ease-in-out ${
                      index <= activeStep 
                        ? 'bg-white border-white' 
                        : 'bg-gray-800 border-gray-700'
                    } ${index === activeStep ? 'scale-110' : 'scale-100'}`}
                  >
                    {index < activeStep ? (
                      <Check className={`w-6 h-6 text-black transition-all duration-500 ease-in-out ${
                        index === activeStep ? 'scale-110' : 'scale-100'
                      }`} />
                    ) : (
                      <step.icon className={`w-6 h-6 transition-all duration-500 ease-in-out ${
                        index <= activeStep ? 'text-black' : 'text-gray-500'
                      } ${index === activeStep ? 'scale-110' : 'scale-100'}`} />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div 
                      className={`w-1 h-full my-2 transition-all duration-500 ease-in-out ${
                        index < activeStep ? 'bg-white' : 'bg-gray-700'
                      }`}
                    />
                  )}
                </div>
                <div className={`pt-2 transition-all duration-500 ease-in-out ${
                  index === activeStep ? 'translate-x-2' : 'translate-x-0'
                }`}>
                  <h3 className={`text-xl font-bold mb-2 transition-all duration-500 ease-in-out ${
                    index <= activeStep ? 'text-white' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-base transition-all duration-500 ease-in-out ${
                    index <= activeStep ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 p-8 bg-white">
        <div className="max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-md p-8 transition-all duration-500 ease-in-out">
          <h2 className="text-2xl font-bold mb-4 text-black">Welcome to Your Onboarding</h2>
          <p className="text-gray-700 mb-4">
            Follow the steps on the left to complete your profile setup. Your progress is automatically saved at each step.
          </p>
          <p className="text-gray-700">
            Currently on: <span className="font-bold">{steps[activeStep]?.title}</span>
          </p>
        </div>
      </div>
    </div>
  )
}