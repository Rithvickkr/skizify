import { GigForm } from "../../components/Gigform";
import Reviewpage from "../../components/reviewpage/review";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto">
        <div className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-md dark:bg-black">
          <div className="flex justify-center">
            <GigForm />
          </div>
        </div>
      </div>
    </div>
    // <Reviewpage/>
  );
}
