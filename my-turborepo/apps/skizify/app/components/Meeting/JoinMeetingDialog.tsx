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
import { BorderBeam } from "../../../@/components/ui/border-beam";
import CheckMeetingCode from "./CheckMeetingCode";


const JoinMeetingCredenza = () => {
  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button className="col-span-1 relative flex h-40 w-full flex-col items-center justify-center border border-black/60 bg-transparent text-black opacity-75 hover:bg-black/5 hover:opacity-100 dark:border-white/50 dark:text-white dark:hover:bg-white/10">
          <Video className="mb-2 h-6 w-6" />
          Join Meeting
          <BorderBeam size={200} duration={12} delay={9} colorFrom="white" colorTo="#484848" />
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
  
  <CheckMeetingCode />

</CredenzaContent>
    </Credenza>
  );
};

export default JoinMeetingCredenza;
