import { GigForm } from "../../components/Gigform";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className=" mx-auto p-4">
        <div className="max-w-lg w-full bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">Gig Form</h2>
            <div className="flex justify-center">
              <GigForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
