"use client";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  EyeIcon,
  EyeOffIcon,
  GithubIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { Label } from "../../@/components/ui/label";
import { Separator } from "../../@/components/ui/separator";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Signform() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        name: `${name}`,
        password: password,
        email: email,
        redirect: false,
      });

      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Sign in with Google");
  };

  const handleGithubSignIn = () => {
    console.log("Sign in with GitHub");
  };

  return (
    <div
      className={`flex min-h-screen flex-col bg-gray-100 dark:bg-black lg:flex-row`}
    >
      <div
        className={`hidden flex-col justify-center bg-white p-8 dark:bg-black lg:flex lg:w-1/2 lg:p-16`}
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className={`mb-6 text-4xl font-bold text-gray-900 dark:text-white lg:text-6xl`}
          >
            Welcome to Skizify
          </h1>
          <p className={`mb-8 text-lg text-gray-600 dark:text-gray-300`}>
            Experience the future of collaboration with Skizify. Create your
            account today and start learning with who you want
          </p>
          <ul className="space-y-4">
            {["Innovative Features", "Global Network", "Secure Platform"].map(
              (item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * (index + 1) }}
                  className={`flex items-center text-gray-800 dark:text-white`}
                >
                  <ArrowRightIcon
                    className={`mr-2 h-5 w-5 text-blue-500 dark:text-gray-400`}
                  />
                  {item}
                </motion.li>
              ),
            )}
          </ul>
        </motion.div>
      </div>

      {/* Right Section - Signup Form */}
      <div
        className={`flex min-h-screen w-full items-center justify-center bg-white p-8 dark:bg-black lg:w-1/2 lg:bg-opacity-100 lg:backdrop-blur-none`}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-6 flex justify-end">
            {/* <Button
              onClick={toggleMode}
              variant="outline"
              size="icon"
              className={`rounded-full bg-gray-200 text-gray-800 dark:bg-white dark:text-black ${isDarkMode ? "bg-white text-black" : "bg-gray-200 text-gray-800"}`}
            >
              {isDarkMode ? (
                <SunIcon className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
              )}
            </Button> */}
          </div>
          <h2
            className={`mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white`}
          >
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className={`text-sm font-medium text-gray-700 dark:text-white`}
              >
                Full Name
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full rounded-full border-gray-300 bg-gray-100 bg-opacity-10 py-2 pl-10 text-black placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-2 dark:border-white dark:border-opacity-30 dark:bg-white dark:text-black dark:placeholder-gray-400`}
                  required
                />
                <UserIcon
                  className={`absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400 dark:text-black dark:opacity-70`}
                  size={18}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className={`text-sm font-medium text-gray-700 dark:text-white`}
              >
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-full border-gray-300 bg-gray-100 bg-opacity-10 py-2 pl-10 text-gray-900 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-2 dark:border-white dark:border-opacity-30 dark:bg-white dark:text-black dark:placeholder-gray-400`}
                  required
                />
                <MailIcon
                  className={`absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400 dark:text-black dark:opacity-70`}
                  size={18}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className={`text-sm font-medium text-gray-700 dark:text-white`}
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-full border-gray-300 bg-gray-100 bg-opacity-10 py-2 pl-10 pr-10 text-gray-900 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-2 dark:border-white dark:border-opacity-30 dark:bg-white dark:text-black dark:placeholder-gray-400`}
                  required
                />
                <LockIcon
                  className={`absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400 dark:text-black dark:opacity-70`}
                  size={18}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 focus:outline-none dark:text-black dark:opacity-70`}
                >
                  {showPassword ? (
                    <EyeOffIcon size={18} />
                  ) : (
                    <EyeIcon size={18} />
                  )}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className={`w-full rounded-full bg-blue-600 text-white transition-colors duration-300 hover:bg-opacity-90 dark:bg-white dark:text-black`}
            >
              Sign Up
            </Button>
          </form>

          <Separator
            className={`dark: my-8 bg-gray-200 bg-opacity-20 dark:bg-white`}
          />

          <div className="space-y-4">
            <Button
              onClick={handleGoogleSignIn}
              className={`w-full rounded-full bg-red-600 text-white dark:bg-white dark:text-black`}
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </Button>
            <Button
              onClick={handleGithubSignIn}
              className={`flex w-full items-center justify-center rounded-full bg-gray-800 text-white transition-colors duration-300 hover:bg-opacity-90 dark:bg-white dark:text-black`}
            >
              <GithubIcon className="mr-2 h-5 w-5" />
              Sign in with GitHub
            </Button>
          </div>

          <p
            className={`mt-8 text-center text-sm text-gray-600 dark:text-white`}
          >
            Already have an account?
            <a
              href="#"
              className={`font-medium underline transition-colors duration-300 hover:text-blue-600 dark:hover:text-gray-300`}
            >
              Log in
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
