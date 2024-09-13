import { ReactNode } from "react";
import { Button } from "./button";
import {
  Credenza,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "./Credenza";

export interface WarningPageProps {
  title?: string;
  content?: string;
  button1?: string;
  destructivebutton?: string;
  trigger?: string;
  button3?: ReactNode;
}

export default function WarningPage({
  title,
  content,
  button1,
  destructivebutton,
  trigger,
  button3,
}: WarningPageProps) {
  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button className="animate-pulse border border-neutral-600 " variant="outline">{trigger || "Share"}</Button>
      </CredenzaTrigger>
      <CredenzaContent className="border border-neutral-300 p-4 dark:border-neutral-700 sm:max-w-md">
        <CredenzaHeader className="gap-2">
          <CredenzaTitle className="text-lg dark:text-neutral-100">
            {title || "Are you absolutely sure?"}
          </CredenzaTitle>
          <CredenzaDescription className="text-neutral-500 dark:text-neutral-400">
            {content || "This action cannot be undone Later."}
          </CredenzaDescription>
        </CredenzaHeader>

        <CredenzaFooter className="gap-4 sm:justify-end">
          <CredenzaClose asChild>
            <Button
              type="button"
              variant="gooeyLeft"
              className="h-9 border border-neutral-300 bg-black text-white dark:border-neutral-700"
            >
              {button1 || "Cancel"}
            </Button>
          </CredenzaClose>
          <CredenzaClose asChild>{button3}</CredenzaClose>
          {destructivebutton && (
            <CredenzaClose asChild>
              <Button
                type="button"
                variant="destructive"
                className="h-9 bg-red-700 text-white hover:opacity-85 dark:bg-red-800"
              >
                {destructivebutton}
              </Button>
            </CredenzaClose>
          )}
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
