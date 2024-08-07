"use client";
import { useEffect, useState, useRef } from "react";
import Room from "./Room";
import { Button } from "../ui/button";
import { CameraOff } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Landing() {
  // User can see the Hair-Setting Screen
  const session = useSession();

  const [name, setName] = useState("");
  const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>();
  const [localVideoTrack, setlocalVideoTrack] = useState<MediaStreamTrack | null>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [join, setJoin] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [isVideoInitialized, setIsVideoInitialized] = useState(true);
  async function getPermissionEnableStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      // Do something with the stream
      console.log("Media stream acquired:", stream);
      const videotrack = stream.getVideoTracks()[0];
      const audiotrack = stream.getAudioTracks()[0];
      setlocalVideoTrack(videotrack);
      setLocalAudioTrack(audiotrack);

      if (videotrack && videoRef && videoRef.current) {
        // Ensure valid values are passed inside the VideoRef
        videoRef.current.srcObject = new MediaStream([videotrack]);
        videoRef.current.play();
      }
      setIsVideoInitialized(true);
      // Reset permission denied state
      setPermissionDenied(false);
    } catch (err) {
      console.error("Permissions Denied:", err);
      setIsVideoInitialized(true);
      setPermissionDenied(true);
      alert(
        "We need access to your camera and microphone. Please enable them in your browser settings.",
      );
      setIsVideoInitialized(false);
    }
  }

  const getCam = async () => {
    try {
      await getPermissionEnableStream();
    } catch (error) {
      console.error("Error accessing media devices:", error);
      setIsVideoInitialized(false);
      alert(
        "We need access to your camera and microphone. Please enable them in your browser settings.",
      );
    }
  };

  useEffect(() => {
    if (videoRef && videoRef.current) {
      getCam();
    }
  }, [videoRef]);

  useEffect(() => {
    if (permissionDenied) {
      const retryInterval = setInterval(() => {
        getCam();
      }, 5000); // Retry every 5 seconds

      return () => clearInterval(retryInterval); // Clear interval after cleanup
    }
  }, [permissionDenied]);

  if (!session) {
    return <div>You are not Signed In</div>;
  }

  if (!join) {
    return (
      <div className="flex h-full md:items-center justify-center">
        <div className="mx-auto grid h-[60%] md:w-[60%] w-[90%] rounded-xl bg-neutral-100 p-2 shadow-2xl dark:ring-2 dark:ring-gray-500 md:grid-cols-2">
          <div className="my-auto flex h-full w-full cursor-pointer grid-cols-1 items-center justify-center rounded-2xl bg-themeblue dark:border-2 dark:border-gray-600">
            {isVideoInitialized ? (
              <video
                ref={videoRef}
                autoPlay
                className=" object-cover size-[95%] rounded-xl bg-themeblue ring-2 ring-white dark:ring-gray-600"
              ></video>
            ): (
                <CameraOff className="size-20 text-white" />
            )}
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="mx-auto font-light dark:text-black text-2xl md:text-3xl">
              Ready to join?
            </div>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="h-10 rounded"
            />
            <Button
              className="h-12 w-44 rounded-3xl bg-black text-white ring-1 ring-black border border-white dark:bg-[#020817] xl:h-12"
              variant="gooeyLeft"
              onClick={() => setJoin(true)}
            >
              Join
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <Room
        name={name}
        localAudioTrack={localAudioTrack}
        localVideoTrack={localVideoTrack}
      />
    </div>
  );
}
