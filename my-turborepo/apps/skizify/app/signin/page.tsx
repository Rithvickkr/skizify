// "use client";
// import React, { useState } from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardDescription,
// } from "../../@/components/ui/card";
// import { Button } from "../../@/components/ui/button";
// import { Input } from "../../@/components/ui/input";
// import { Checkbox } from "../../@/components/ui/checkbox";
// import { Label } from "../../@/components/ui/label";
// import { Separator } from "../../@/components/ui/separator";
// import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";
// import { BackgroundBeams } from "../../@/components/ui/background-beams";
// export default function SignIn() {
    

// // const HeroSection = () => {
// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);

// //   const router = useRouter();

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //       const res = await signIn("credentials", {
// //         name: `${name}`,
// //         password: password,
// //         email: email,
// //         redirect: false,
// //       });

// //       router.push("/");
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   const handleGoogleSignIn = async () => {
// //     const result = await signIn("google", {
// //       redirect: true,
// //       callbackUrl: "/explore", // Specify your desired redirect page
// //     });
// //     if (result?.ok) {
// //       // Successfully signed in
// //       console.log("Signed in successfully");
// //     }
// //   };

// //   const handleGithubSignIn = async () => {
// //     const result = await signIn("github", {
// //       redirect: true,
// //       callbackUrl: "/explore", // Specify your desired redirect page
// //     });
// //     if (result?.ok) {
// //       // Successfully signed in
// //       console.log("Signed in successfully");
// //     }
// //   };

// //   return (
// //     <>
// //       <div className="relative flex h-screen w-full items-center justify-center rounded-lg bg-gradient-to-bl from-white via-white to-background dark:from-neutral-900 dark:via-neutral-900/90 dark:to-black">
// //         <div className="w-full px-4 py-10 sm:px-8 sm:py-20 md:px-24">
// //           <div className="grid items-center justify-center gap-8 lg:grid-cols-2 lg:gap-12">
// //             <div className="text-center mt-10 lg:mt-0 lg:text-left">
// //               <p className="block bg-gradient-to-l from-blue-600 to-violet-500 bg-clip-text text-sm font-medium text-transparent dark:from-blue-400 dark:to-violet-400">
// //                 Where Video Ideas Come to Life
// //               </p>
// //               <div className="mt-6 max-w-3xl md:mb-14">
// //                 <h1 className="mb-3 md:mb-7 scroll-m-20 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-xl md:text-3xl font-extrabold tracking-tight text-transparent dark:from-white dark:to-neutral-300 ">
// //                   Connect, Collaborate, Solve with Ease
// //                 </h1>
// //                 <p className="hidden md:block text-muted-foreground text-sm md:text-lg dark:text-neutral-400">
// //                   Your one-stop platform where creative minds meet video
// //                   experts. Post your gigs, discover talented creators, and watch
// //                   your vision take flight.
// //                 </p>
// //               </div>
// //               <blockquote className="relative hidden max-w-md lg:block">
// //                 <svg
// //                   className="absolute start-0 top-0 h-20 w-20 -translate-x-6 -translate-y-8 transform text-foreground/10 dark:text-neutral-700"
// //                   width={20}
// //                   height={20}
// //                   viewBox="0 0 16 16"
// //                   fill="none"
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   aria-hidden="true"
// //                 >
// //                   <path
// //                     d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
// //                     fill="currentColor"
// //                   />
// //                 </svg>
// //                 <div className="relative z-10">
// //                   <p className="hidden md:block text-2xl italic text-foreground/90 dark:text-neutral-300">
// //                     "This platform has transformed the way I solve my doubts. I
// //                     posted my query, connected with an expert instantly, and
// //                     walked away with all the clarity I needed. It's seamless and
// //                     effective!"
// //                   </p>
// //                 </div>
// //               </blockquote>
// //             </div>
// //             <div>
// //               <form>
// //                 <div className="mx-auto lg:mx-0 lg:me-0 lg:max-w-2xl">
// //                   <Card className="border p-4 shadow-lg backdrop-blur-xl dark:border-neutral-700 dark:bg-black sm:p-6 md:p-8 lg:p-10">
// //                     <CardHeader className="text-center">
// //                       <h2 className="text-3xl font-semibold leading-none tracking-tight dark:text-neutral-200 md:text-4xl">
// //                         Start your free trial
// //                       </h2>
// //                       <CardDescription className="dark:text-neutral-400">
// //                         Already have an account?{" "}
// //                         <a
// //                           className="text-primary underline-offset-4 hover:underline dark:text-blue-400"
// //                           href="#"
// //                         >
// //                           Sign in here
// //                         </a>
// //                       </CardDescription>
// //                     </CardHeader>
// //                     <CardContent>
// //                       <div className="flex flex-col md:flex-row md:space-x-4">
// //                         <Button
// //                           onClick={handleGoogleSignIn}
// //                           className="h-12 w-full border bg-white px-3 text-sm md:text-base text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-black dark:text-neutral-300 dark:hover:bg-white/5 sm:h-10 sm:text-sm"
// //                         >
// //                           <svg
// //                             className="mr-2 h-auto w-5 sm:w-4"
// //                             width={46}
// //                             height={47}
// //                             viewBox="0 0 46 47"
// //                             fill="none"
// //                           >
// //                             <path
// //                               d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
// //                               fill="#4285F4"
// //                             />
// //                             <path
// //                               d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
// //                               fill="#34A853"
// //                             />
// //                             <path
// //                               d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
// //                               fill="#FBBC05"
// //                             />
// //                             <path
// //                               d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
// //                               fill="#EB4335"
// //                             />{" "}
// //                           </svg>
// //                           Sign up with Google
// //                         </Button>
// //                         <Button
// //                           onClick={handleGithubSignIn}
// //                           className="mt-4 h-12 w-full border bg-white px-3 text-sm md:text-base text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-black dark:text-neutral-300 dark:hover:bg-white/5 sm:h-10 sm:text-sm md:mt-0"
// //                         >
// //                           <svg
// //                             className="mr-2 h-auto w-6 sm:w-5"
// //                             width={18}
// //                             height={18}
// //                             viewBox="0 0 24 24"
// //                             fill="none"
// //                           >
// //                             <path
// //                               d="M12 0.297852C5.373 0.297852 0 5.67085 0 12.2979C0 17.6179 3.438 22.0979 8.207 23.7979C8.807 23.8979 9.027 23.5179 9.027 23.1879C9.027 22.8879 9.017 22.0979 9.017 21.2979C6 21.7979 5.22 20.2979 5.22 20.2979C4.68 19.0979 4 18.7979 4 18.7979C3.027 18.1979 4.087 18.2079 4.087 18.2079C5.167 18.2979 5.707 19.2979 5.707 19.2979C6.707 20.7979 8.227 20.2979 8.807 20.0979C8.907 19.2979 9.227 18.7979 9.587 18.4979C7.007 18.1979 4.307 17.0979 4.307 12.2979C4.307 10.8979 4.807 9.79785 5.607 8.99785C5.507 8.69785 5.107 7.29785 5.707 5.49785C5.707 5.49785 6.707 5.19785 9.007 6.79785C9.907 6.49785 10.907 6.29785 11.907 6.29785C12.907 6.29785 13.907 6.49785 14.807 6.79785C17.107 5.19785 18.107 5.49785 18.107 5.49785C18.707 7.29785 18.307 8.69785 18.207 8.99785C19.007 9.79785 19.507 10.8979 19.507 12.2979C19.507 17.1079 16.807 18.1979 14.227 18.4979C14.707 18.8979 15.107 19.6979 15.107 20.7979C15.107 22.4979 15.097 23.6979 15.097 23.9979C15.097 24.3279 15.317 24.7079 15.917 24.5979C20.687 22.8979 24.127 18.4179 24.127 12.2979C24.127 5.67085 18.754 0.297852 12 0.297852Z"
// //                               fill="currentColor"
// //                             />
// //                           </svg>
// //                           Sign up with GitHub
// //                         </Button>
// //                       </div>
// //                       <div className="relative mt-6">
// //                         <div className="text-muted-foreground flex items-center py-3 text-xs uppercase before:me-6 before:flex-[1_1_0%] before:border-t before:border-neutral-200 after:ms-6 after:flex-[1_1_0%] after:border-t after:border-neutral-200 dark:text-neutral-400 dark:before:border-neutral-700 dark:after:border-neutral-700">
// //                           Or
// //                         </div>
// //                       </div>
// //                       <div className="mt-6">
// //                         <div className="grid grid-cols-2 gap-4">
// //                           <Input
// //                             placeholder="Name"
// //                             className="col-span-2 border border-black/20 bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-neutral-500"
// //                           />
// //                           <Input
// //                             placeholder="Email"
// //                             id="email"
// //                             type="email"
// //                             value={email}
// //                             onChange={(e) => setEmail(e.target.value)}
// //                             required
// //                             className="col-span-2 border border-black/20 bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-neutral-500"
// //                           />
// //                           <Input
// //                             className="col-span-2 border border-black/20 bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-neutral-500"
// //                             type={showPassword ? "text" : "password"}
// //                             placeholder="••••••••"
// //                             value={password}
// //                             onChange={(e) => setPassword(e.target.value)}
// //                             required
// //                           />
// //                           <div className="col-span-2 mt-4 flex cursor-pointer items-center space-x-2">
// //                             <Checkbox
// //                               id="terms"
// //                               className="dark:border-neutral-700"
// //                             />
// //                             <Label
// //                               htmlFor="terms"
// //                               className="relative dark:text-neutral-300"
// //                             >
// //                               Accept terms and conditions
// //                               <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
// //                             </Label>
// //                           </div>
// //                           <Button
// //                             onClick={handleSubmit}
// //                             className="col-span-2 mt-4 bg-neutral-800 text-white hover:bg-neutral-700 dark:bg-white dark:text-black dark:hover:bg-neutral-50"
// //                           >
// //                             Get started
// //                           </Button>
// //                         </div>
// //                       </div>
// //                     </CardContent>
// //                   </Card>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       {/* <BackgroundBeams className="-z-10"/> */}
// //     </>
// //   );
// // };

// // export default HeroSection;

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
        redirect: true,
      });

      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await signIn("google", {
      redirect: true,
      callbackUrl: "/explore", // Specify your desired redirect page
    });
    if (result?.ok) {
      // Successfully signed in
      console.log("Signed in successfully");
    }
  };

  const handleGithubSignIn = async () => {
    const result = await signIn("github", {
      redirect: true,
      callbackUrl: "/explore", // Specify your desired redirect page
    });
    if (result?.ok) {
      // Successfully signed in
      console.log("Signed in successfully");
    }  };

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

