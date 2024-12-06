import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../../../@/components/ui/card";
import { Button } from "../../../@/components/ui/button";
import { Input } from "../../../@/components/ui/input";
import { Checkbox } from "../../../@/components/ui/checkbox";
import { Label } from "../../../@/components/ui/label";
import { Separator } from "../../../@/components/ui/separator";

const HeroSection = () => {
  return (
    <>
      <div className="relative w-full rounded-lg bg-gradient-to-bl from-primary-foreground/50 via-primary-foreground/25 to-background dark:from-neutral-900 dark:via-neutral-900/90 dark:to-black">
        <div className="w-full px-2 py-10 sm:px-6 sm:py-20 md:px-20">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="inline-block bg-gradient-to-l from-blue-600 to-violet-500 bg-clip-text text-sm font-medium text-transparent dark:from-blue-400 dark:to-violet-400">
                Where Video Ideas Come to Life
              </p>
              <div className="mt-4 max-w-2xl md:mb-12">
                <h1 className="mb-4 scroll-m-20 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent dark:from-white dark:to-neutral-300 lg:text-5xl">
                  Connect, Collaborate, Solve with Ease
                </h1>
                <p className="text-muted-foreground text-xl dark:text-neutral-400">
                  Your one-stop platform where creative minds meet video
                  experts. Post your gigs, discover talented creators, and watch
                  your vision take flight.
                </p>
              </div>
              <blockquote className="relative hidden max-w-sm lg:block">
                <svg
                  className="absolute start-0 top-0 h-16 w-16 -translate-x-6 -translate-y-8 transform text-foreground/10 dark:text-neutral-700"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
                    fill="currentColor"
                  />
                </svg>
                <div className="relative z-10">
                  <p className="text-xl italic text-foreground/90 dark:text-neutral-300">
                    "This platform has transformed the way I solve my doubts. I
                    posted my query, connected with an expert instantly, and
                    walked away with all the clarity I needed. It's seamless and
                    effective!"
                  </p>
                </div>
              </blockquote>
            </div>
            <div>
              <form>
                <div className="ms-auto lg:mx-auto lg:me-0 lg:max-w-xl">
                  <Card className="border p-2 shadow-lg backdrop-blur-xl dark:border-neutral-700 dark:bg-black sm:p-3 md:p-6 lg:p-7">
                    <CardHeader className="text-center">
                      <h2 className="text-2xl font-semibold leading-none tracking-tight dark:text-neutral-200 md:text-3xl">
                        Start your free trial
                      </h2>
                      <CardDescription className="dark:text-neutral-400">
                        Already have an account?{" "}
                        <a
                          className="text-primary underline-offset-4 hover:underline dark:text-blue-400"
                          href="#"
                        >
                          Sign in here
                        </a>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row md:space-x-4">
                        <Button className="h-10 w-full border bg-white px-3 text-sm text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-black dark:text-neutral-300 dark:hover:bg-white/5 sm:h-12 sm:text-base">
                          <svg
                          className="mr-2 h-auto w-4"
                          width={46}
                          height={47}
                          viewBox="0 0 46 47"
                          fill="none"
                          >
                          <path
                            d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                            fill="#4285F4"
                          />
                          <path
                            d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                            fill="#34A853"
                          />
                          <path
                            d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                            fill="#EB4335"
                          />
                          </svg>
                          Sign up with Google
                        </Button>
                        <Button className="mt-4 h-10 w-full border bg-white px-3 text-sm text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-black dark:text-neutral-300 dark:hover:bg-white/5 sm:h-12 sm:text-base md:mt-0">
                          <svg
                          className="mr-2 h-auto w-5"
                          width={18}
                          height={18}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          >
                          <path
                            d="M12 0.297852C5.373 0.297852 0 5.67085 0 12.2979C0 17.6179 3.438 22.0979 8.207 23.7979C8.807 23.8979 9.027 23.5179 9.027 23.1879C9.027 22.8879 9.017 22.0979 9.017 21.2979C6 21.7979 5.22 20.2979 5.22 20.2979C4.68 19.0979 4 18.7979 4 18.7979C3.027 18.1979 4.087 18.2079 4.087 18.2079C5.167 18.2979 5.707 19.2979 5.707 19.2979C6.707 20.7979 8.227 20.2979 8.807 20.0979C8.907 19.2979 9.227 18.7979 9.587 18.4979C7.007 18.1979 4.307 17.0979 4.307 12.2979C4.307 10.8979 4.807 9.79785 5.607 8.99785C5.507 8.69785 5.107 7.29785 5.707 5.49785C5.707 5.49785 6.707 5.19785 9.007 6.79785C9.907 6.49785 10.907 6.29785 11.907 6.29785C12.907 6.29785 13.907 6.49785 14.807 6.79785C17.107 5.19785 18.107 5.49785 18.107 5.49785C18.707 7.29785 18.307 8.69785 18.207 8.99785C19.007 9.79785 19.507 10.8979 19.507 12.2979C19.507 17.1079 16.807 18.1979 14.227 18.4979C14.707 18.8979 15.107 19.6979 15.107 20.7979C15.107 22.4979 15.097 23.6979 15.097 23.9979C15.097 24.3279 15.317 24.7079 15.917 24.5979C20.687 22.8979 24.127 18.4179 24.127 12.2979C24.127 5.67085 18.754 0.297852 12 0.297852Z"
                            fill="currentColor"
                          />
                          </svg>
                          Sign up with GitHub
                        </Button>
                        </div>
                      <div className="relative">
                        <div className="text-muted-foreground flex items-center py-3 text-xs uppercase before:me-6 before:flex-[1_1_0%] before:border-t before:border-neutral-200 after:ms-6 after:flex-[1_1_0%] after:border-t after:border-neutral-200 dark:text-neutral-400 dark:before:border-neutral-700 dark:after:border-neutral-700">
                          Or
                        </div>
                      </div>
                      <div className="mt-5">
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            placeholder="Name"
                            className="col-span-2 bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-neutral-500"
                          />

                          <Input
                            placeholder="Email"
                            className="col-span-2 bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-neutral-500"
                          />
                          <Input
                            className="col-span-2 bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-neutral-500"
                            placeholder="New password"
                            type="password"
                          />
                          <div className="col-span-2 mt-3 flex cursor-pointer items-center space-x-2">
                            <Checkbox
                              id="terms"
                              className="dark:border-neutral-700"
                            />
                            <Label
                              htmlFor="terms"
                              className="dark:text-neutral-300"
                            >
                              Accept terms and conditions
                            </Label>
                          </div>
                          <Button className="col-span-2 mt-3 bg-neutral-800 text-white hover:bg-neutral-700 dark:bg-white dark:text-black dark:hover:bg-neutral-50">
                            Get started
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
