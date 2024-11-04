import { Video } from "lucide-react";
import { Input } from "../../../@/components/ui/input";
import { Button } from "../ui/button";
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaTrigger,
} from "../ui/Credenza";

const JoinMeetingCredenza = () => {
  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button className="col-span-1 flex h-auto flex-col items-center justify-center border border-black/60 bg-transparent text-black opacity-75 hover:bg-black/5 hover:opacity-100 dark:border-white/50 dark:text-white dark:hover:bg-white/10">
          <Video className="mb-2 h-6 w-6" />
          Join Meeting
        </Button>
      </CredenzaTrigger>
      <CredenzaContent className="p-6 max-w-md mx-auto bg-neutral-50 dark:bg-white/5 backdrop-blur-xl  shadow-lg rounded-lg border border-neutral-200 dark:border-neutral-800">
  <CredenzaHeader className="mb-4">
    <CredenzaTitle className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
      Join Meeting
    </CredenzaTitle>
    <CredenzaDescription className="text-neutral-700 dark:text-neutral-400">
      Please enter the meeting code to join.
    </CredenzaDescription>
  </CredenzaHeader>
  
  <Input
    placeholder="Meeting code"
    className="w-full px-5 py-6 bg-neutral-800 border text-lg border-neutral-600 rounded-lg text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500"
  />

  <div className="flex justify-center">
    <Button
    variant={"outline"} 
    className="w-full px-6 py-5 text-center hover:dark:ring-2  dark:ring-white bg-white text-neutral-900 border-2 border-neutral-800/40 rounded-lg hover:bg-black/5 dark:hover:bg-neutral-100  text-lg font-medium   dark:bg-white dark:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-all">
      Join
    </Button>
  </div>

</CredenzaContent>
    </Credenza>
  );
};

export default JoinMeetingCredenza;
