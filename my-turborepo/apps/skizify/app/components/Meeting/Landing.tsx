"use client";
import { useEffect, useState, useRef } from "react";
import Room from "./Room";
import { Button } from "../ui/button";
import { CameraOff, Mic, MicOff, Video, VideoOff } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Landing() {
  // User can see the Hair-Setting Screen
  const session = useSession();
  const [name, setName] = useState("");
  const [localAudioTrack, setLocalAudioTrack] = useState<
    MediaStreamTrack | null | undefined
  >(null);
  const [localVideoTrack, setlocalVideoTrack] = useState<
    MediaStreamTrack | null | undefined
  >(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [join, setJoin] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [isVideoInitialized, setIsVideoInitialized] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  async function getPermissionEnableStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      // Do something with the stream
      const videotrack = stream.getVideoTracks()[0];
      const audiotrack = stream.getAudioTracks()[0];
      setlocalVideoTrack(videotrack);
      setLocalAudioTrack(audiotrack);

      if (videotrack && videoRef && videoRef.current) {
        videoRef.current.srcObject = new MediaStream([videotrack]);
        videoRef.current.play();
      }
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

  async function getAudioPermissionEnableStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const audiotrack = stream.getAudioTracks()[0];
      setLocalAudioTrack(audiotrack);
      setPermissionDenied(false);
    } catch (err) {
      console.error("Permissions Denied:", err);
      setPermissionDenied(true);
      alert(
        "We need access to your microphone. Please enable it in your browser settings.",
      );
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
      }, 10000); // Retry every 10 seconds

      return () => clearInterval(retryInterval); // Clear interval after cleanup
    }
  }, [permissionDenied]);

  const handleToggleAudio = async () => {
    if (localAudioTrack) {
      if (isAudioEnabled) {
        localAudioTrack.stop();
      } else {
        await getAudioPermissionEnableStream();
      }
      setIsAudioEnabled(!isAudioEnabled);
    } else {
      await getAudioPermissionEnableStream();
    }
  };

  const handleToggleVideo = async () => {
    if (localVideoTrack) {
      if (isVideoEnabled) {
        localVideoTrack.stop();
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      } else {
        await getPermissionEnableStream();
      }
      setIsVideoEnabled(!isVideoEnabled);
    } else {
      console.log("VideoTracks are not here");
    }
  };

  if (session.status === "unauthenticated") {
    return <div>You are not Signed In</div>;
  }

  if (!join) {
    return (
      <div className="flex h-full justify-center md:items-center">
        <div className="mx-auto grid h-[86%] w-[90%] rounded-xl p-2 shadow-2xl dark:bg-spotlight dark:ring-2 dark:ring-gray-500 md:h-[60%] md:grid-cols-2 lg:w-[60%]">
          <div className="relative my-auto flex h-full w-full grid-cols-1 items-center justify-center rounded-2xl bg-themeblue dark:border-2 dark:border-gray-600">
            {isVideoInitialized ? (
              <video
                ref={videoRef}
                autoPlay
                className="size-[95%] cursor-pointer rounded-xl bg-themeblue object-cover ring-2 ring-white dark:ring-gray-600"
              ></video>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <CameraOff className="size-20 text-white" />
                <span className="text-lg text-white">
                  Allow the permissions
                </span>
              </div>
            )}
            {isVideoInitialized ? (
              <div className="absolute bottom-4 flex justify-center gap-32 md:gap-8">
                <div
                  className={`flex size-12 cursor-pointer items-center justify-center rounded-full ${isAudioEnabled ? "bg-transparent ring-2 ring-white" : "bg-[#EA4335]"} text-white hover:-translate-y-0.5 hover:shadow-xl`}
                  onClick={handleToggleAudio}
                >
                  {isAudioEnabled ? (
                    <Mic size={24} strokeWidth={1.3} />
                  ) : (
                    <MicOff size={24} strokeWidth={1.3} />
                  )}
                </div>
                <div
                  className={`flex size-12 cursor-pointer items-center justify-center rounded-full ${isVideoEnabled ? "bg-transparent ring-2 ring-white" : "bg-[#EA4335]"} text-white hover:-translate-y-0.5 hover:shadow-xl`}
                  onClick={handleToggleVideo}
                >
                  {isVideoEnabled ? (
                    <Video size={28} strokeWidth={1.3} />
                  ) : (
                    <VideoOff size={28} strokeWidth={1.3} />
                  )}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="flex flex-col items-center justify-evenly space-y-2">
            <div className="mx-auto from-blue-900 from-40% to-gray-100 text-center text-3xl font-light dark:bg-gradient-to-r dark:bg-clip-text dark:text-transparent md:text-4xl lg:text-5xl">
              Ready to join?
            </div>
            <div className="flex flex-col flex-wrap items-center justify-center text-xl font-medium">
              <span className="font-display text-2xl">Join meeting as</span>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="m-2 h-8 w-48 rounded border text-center text-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-[#202757] dark:ring-gray-500"
              />
            </div>
            <Button
              className="h-12 w-44 rounded-3xl border border-white bg-black text-white ring-1 ring-black dark:bg-[#020817] xl:h-12"
              variant="gooeyLeft"
              onClick={() => setJoin(true)}
            >
              Join now
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
        userId={session.data?.user.id || ""}
        meetingId={"1"}
      />
    </div>
  );
}
