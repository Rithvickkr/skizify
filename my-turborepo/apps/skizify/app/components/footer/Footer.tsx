
import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github, Twitter, Facebook } from "lucide-react";

import { Section, Container } from "./craft";
import { Button } from "../ui/button";
import { Input } from "../../../@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../@/components/ui/form";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

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
    <Section className="mt-4 rounded-md p-4 dark:bg-black">
      <div className="grid gap-6">
        <div className="not-prose flex flex-col gap-6">
          <Link href="/">
            <h3 className="sr-only">brijr/components</h3>
            <div className="dark:bg-white bg-black ring-1 border-2 ring-black dark:ring-white h-5 w-6 flex-shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm" />
          </Link>
          <p>
            <Balancer>
              brijr/components is a collection of Next.js, React, Typescript
              components for building landing pages and websites.
            </Balancer>
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="hover:shadow-md transition-shadow duration-300 bg-transparent ">
              <Github />
            </Button>
            <Button variant="outline" size="icon" className="hover:shadow-md transition-shadow duration-300 bg-transparent ">
              <Twitter />
            </Button>
            <Button variant="outline" size="icon" className="hover:shadow-md transition-shadow duration-300 bg-transparent ">
              <Facebook />
            </Button>
          </div>
        </div>

        <div className="mb-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="not-prose space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="md:text-xl text-lg">
                    Contact us, If you like this project
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-96 my-4"
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
              className="bg-black dark:bg-white dark:text-black"
            >
              Submit
            </Button>
          </form>
        </Form>
        </div>
      </div>
      <hr className="mt-2 mb-2"/>
      <div className="not-prose items-center justify-between text-sm md:flex mb-3">
        <div className="decoration-muted mb-6 flex flex-col gap-4 underline underline-offset-4 md:mb-0 md:flex-row">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
          <Link href="/cookie-policy">Cookie Policy</Link>
        </div>
        <p className="text-muted-foreground">
          © <a href="https://github.com/brijr/components" className="hover:underline">brijr/components</a>.
          All rights reserved. 2024-present.
        </p>
      </div>
    </Section>
  );
}
