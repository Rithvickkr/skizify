import { GigForm } from "../../components/Gigform";
import Reviewpage from "../../components/reviewpage/review";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cyan-800">
      <div className="mx-auto">
        <div className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-md dark:bg-[#020817]">
          <div className="flex justify-center">
            <GigForm />
          </div>
        </div>
      </div>
    </div>
    // <Reviewpage/>
  );
}
