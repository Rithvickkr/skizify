import { Sign } from "crypto";
import { GigForm } from "../../components/Gigform";
import Component from "../../components/postform2";
import Reviewpage from "../../components/reviewpage/review";
import Signform from "../../components/Signform";
import Profileform from "../../components/newprofileform";

export default function Home() {
  return (
    // <div className="flex min-h-screen items-center justify-center">
    //   <div className="mx-auto">
    //     <div className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-md dark:bg-black">
    //       <div className="flex justify-center">
    //         <GigForm />
    //       </div>
    //     </div>
    //   </div>

    // </div>
    // <Component />
    <Profileform />

    // <Reviewpage/>
  );
}
