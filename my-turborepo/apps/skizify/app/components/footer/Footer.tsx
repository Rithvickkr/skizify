import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Balancer from "react-wrap-balancer";
import * as z from "zod";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../../@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../@/components/ui/form";

import { Input } from "../../../@/components/ui/input";
import { BottomGradient } from "../SignupForm";
import { Button } from "../ui/button";
import { Section } from "./craft";
import { ReactNode } from "react";
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

interface Profile {
  name: string;
  url: string;
}

interface social {
  [platform: string]: Profile[];
}
export type IconProps = React.HTMLAttributes<SVGElement>;

const Icons = {
  linkedin: (props: IconProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>LinkedIn</title>
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  ),
  x: (props: IconProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>X</title>
      <path
        fill="currentColor"
        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
      />
    </svg>
  ),
  github: (props: IconProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
};

const SocialMedia: social = {
  github: [
    {
      name: "Rithvick",
      url: "https://github.com/Rithvickkr",
    },
    {
      name: "Yash",
      url: "https://github.com/yashop7",
    },
  ],
  linkedin: [
    {
      name: "Rithvick",
      url: "https://www.linkedin.com/in/rithvick-kumar/",
    },
    {
      name: "Yash",
      url: "https://www.linkedin.com/in/yash-gussian-462611299/",
    },
  ],
  x: [
    {
      name: "Rithvick",
      url: "https://x.com/rithvickkr027",
    },
    {
      name: "Yash",
      url: "https://x.com/YASH25764536",
    },
  ],
};
export default function Footer() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Section className=" rounded-tl-lg rounded-tr-lg border-black px-2 pb-2 pl-4 pt-5 dark:border-white dark:bg-mediumdark md:pb-0">
      <div className=" gap-2 md:gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="not-prose space-y-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold md:text-2xl opacity-75">
                    Contact us, If you like this project
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="my-2 bg-black md:w-96"
                      placeholder="example@fjord.dev"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                      Lorem ipsum dolor sit amet.
                    </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="gooeyLeft"
              className="group/btn relative bg-black dark:bg-lightwhite dark:text-black dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] md:h-10 md:px-4 md:py-2"
              size={"sm"}
            >
              Submit
              <BottomGradient />
            </Button>
          </form>
        </Form>
      </div>
      <hr className="mb-2 mt-2" />
      <div className="not-prose flex items-center justify-between text-xs dark:text-neutral-300 md:mb-3 md:flex md:text-sm">
        <div>
          <p className="text-muted-foreground">
            ©{" "}
            <a
              href="https://github.com/Rithvickkr/skizify"
              className="hover:underline"
            >
              Skizify
            </a>
            . All rights reserved. 2024-present.
          </p>
        </div>
        <div className="flex gap-2">
          {renderDropdown("github", Icons.github)}
          {renderDropdown("linkedin", Icons.linkedin)}
          {renderDropdown("x", Icons.x)}
        </div>
      </div>
    </Section>
  );
}

const renderDropdown = (
  platform: string,
  Icon: React.ComponentType<IconProps>,
) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        size="icon"
        className="group/btn relative size-7 bg-transparent opacity-70 transition-shadow duration-300 hover:opacity-100 hover:shadow-md dark:border-0 dark:bg-black dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] md:size-10"
      >
        <Icon className="size-4 md:size-6" />
        <BottomGradient />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56 bg-white dark:bg-black">
      <DropdownMenuGroup className="">
        {SocialMedia[platform]?.map((profile) => {
          console.log(profile);
          return (
            <DropdownMenuItem
              className="m-1 cursor-pointer rounded-md bg-mediumdark text-white hover:bg-lightdark"
              onClick={() => window.open(profile.url, "_blank")}
            >
              <Icon className="mr-2 h-5 w-5" />
              <DropdownMenuShortcut>{profile.name}</DropdownMenuShortcut>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);
