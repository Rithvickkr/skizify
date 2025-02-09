"use client";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../@/components/ui/accordion";

const faqData = [
  {
    question: "What is Skizify?",
    answer: "Skizify is a video call-based platform currently under development that aims to connect users with experts and professionals through online meetings."
  },
  {
    question: "Can I apply as a Skizzer right now?",
    answer: "Yes! If you have expertise in any field and would like to be part of our platform as a Skizzer, you can apply now through our registration form. We'll review applications as we develop the platform."
  },
  {
    question: "When will Skizify be fully operational?",
    answer: "We're actively developing Skizify and will launch soon. Sign up for our newsletter to stay updated on our progress and launch"
  },
  {
    question: "What technologies does Skizify use?",
    answer: "Skizify is built using Next.js, WebRTC for video communication, Socket.io for real-time interactions, Prisma ORM with PostgreSQL for database management, and Tailwind CSS for styling."
  },
  {
    question: "What kind of experts are you looking for?",
    answer: "We welcome experts from all fields - technology, education, business, arts, healthcare, and more. If you have valuable knowledge to share, we'd love to have you on board."
  },
  {
    question: "How can I stay updated about Skizify's launch?",
    answer: "You can follow our social media channels or sign up for our newsletter to receive updates about our development progress and launch date."
  },
  {
    question: "How do I join a meeting as a Skizzer?",
    answer: "To join as a Skizzer, browse available meetings, apply for the ones relevant to your expertise, and wait for the host to approve your request."
  },
  {
    question: "How does Skizify handle payments between users and Skizzers?",
    answer: "If a meeting requires a paid consultation, payments are processed securely through Skizify's integrated payment system before the session begins."
  },
  {
    question: "Can I record my meetings on Skizify?",
    answer: "Currently, Skizify does not support built-in recording. However, you may use third-party screen recording tools if necessary."
  },
  {
    question: "How can I contact Skizify support?",
    answer: "You can reach out to Developer on X or Fill the email form on the website."
  }
];

export default function FAQ() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="bg-transparent tracking-wider text-white py-10 sm:py-20 px-4 sm:px-6 min-h-screen flex flex-col items-center">
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-3xl sm:text-6xl font-medium tracking-tight text-center mb-8 sm:mb-12"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 via-slate-100 to-zinc-300">
          Frequently Asked
        </span>{" "}
        <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-400 via-neutral-500 to-neutral-400">
          Questions
        </span>
      </motion.h2>

      <motion.div 
        className="w-full max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div key={index} variants={itemVariants}>
              <AccordionItem 
                value={`item-${index}`}
                className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 hover:border-neutral-700 rounded-lg px-4 sm:px-5 transition-all duration-300"
              >
                <AccordionTrigger className="text-sm sm:text-base md:text-lg font-medium text-neutral-200 hover:text-white transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
}
