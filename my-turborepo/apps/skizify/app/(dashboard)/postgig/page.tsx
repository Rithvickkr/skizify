import { GigForm } from "../../components/Gigform";
import Reviewpage from "../../components/reviewpage/review";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-cyan-800 ">
      <div className=" mx-auto ">
        <div className="max-w-lg w-full bg-white overflow-hidden dark:bg-[#020817] shadow-md rounded-lg ">
          <div className="flex justify-center">
              <GigForm />
            </div>
          </div>
        </div>
      </div>
    // <Reviewpage/>
    
  );
}
