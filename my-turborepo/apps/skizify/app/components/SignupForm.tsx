"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "../utils/cn";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Chrome, Github } from "lucide-react";

export function SignupFormDemo() {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [password, setpassword] = useState("");
  const [number, setnumber] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 dark:bg-black md:rounded-2xl md:p-8">
      <h2 className="text-center text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to Skizify
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300"></p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="John"
              type="text"
              onChange={(e) => setfirstname(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Doe"
              type="text"
              onChange={(e) => setlastname(e.target.value)}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            placeholder="XYZ@email.com"
            type="email"
            onChange={(e) => setnumber(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            onChange={(e) => setpassword(e.target.value)}
          />
        </LabelInputContainer>
        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          onClick={async () => {
            try {
              const res = await signIn("credentials", {
                name: `${firstname} ${lastname}`,
                password: password,
                email: number,
                redirect: false,
              });

              router.push("/");
            } catch (err) {
              console.error(err);
            }
          }}
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <Github className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <Chrome className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

export const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
