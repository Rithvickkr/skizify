"use client";
import { Camera, Mic, MicOff, VideoOff } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import VideoPlatform from "./Structure";
import { JoinMeetingButton } from "./JoinButton";

export default function SetHairScreen({ meetingId }: { meetingId: string }) {
  const session = useSession();
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isBackgroundBlur, setIsBackgroundBlur] = useState(false);
  const [touchUpLevel, setTouchUpLevel] = useState(0);
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
      const videotrack = stream.getVideoTracks()[0];
      const audiotrack = stream.getAudioTracks()[0];
      setlocalVideoTrack(videotrack);
      setLocalAudioTrack(audiotrack);

      if (videotrack && videoRef && videoRef.current) {
        videoRef.current.srcObject = new MediaStream([videotrack]);
        videoRef.current.play();
      }
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
      }, 15000);
      return () => clearInterval(retryInterval);
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
      setIsCameraOn(!isCameraOn);
      setIsVideoEnabled(!isVideoEnabled);
    } else {
      console.log("VideoTracks are not here");
    }
  };

  if (!join) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-neutral-100 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-black p-4 flex items-center justify-center transition-colors duration-300">
        <div className="w-full max-w-7xl rounded-2xl bg-white/80 dark:bg-neutral-800/50 p-8 shadow-2xl backdrop-blur-xl border border-neutral-200 dark:border-neutral-700 transition-all duration-300">
          <h1 className="mb-8 text-center font-helvetica text-4xl font-bold text-neutral-800 dark:text-white animate-pulse">
            Ready to Join the Meeting
          </h1>

          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="flex-1">
              <div className="relative mb-4 aspect-video overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 shadow-lg">
                {isVideoInitialized ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className={`h-full w-full object-cover transition-all duration-300 ${
                      isBackgroundBlur ? "backdrop-blur-sm" : ""
                    } `}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-neutral-200 dark:bg-neutral-900">
                    <VideoOff className="h-16 w-16 text-neutral-400 dark:text-neutral-500 animate-pulse" />
                  </div>
                )}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white/70 dark:bg-neutral-900/80 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                    onClick={handleToggleVideo}
                    aria-label={isVideoEnabled ? "Turn camera off" : "Turn camera on"}
                  >
                    {isVideoEnabled ? (
                      <Camera className="size-4 text-neutral-700 dark:text-white" />
                    ) : (
                      <VideoOff className="size-4 text-neutral-700 dark:text-white" />
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white/70 dark:bg-neutral-900/80 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                    onClick={handleToggleAudio}
                    aria-label={isAudioEnabled ? "Turn microphone off" : "Turn microphone on"}
                  >
                    {isAudioEnabled ? (
                      <Mic className="size-4 text-neutral-700 dark:text-white" />
                    ) : (
                      <MicOff className="size-4 text-neutral-700 dark:text-white" />
                    )}
                  </Button>
                </div>
              </div>
              <JoinMeetingButton SetMeetingTrue={() => setJoin(true)} />
            </div>

            <div className="flex-1 space-y-6">
              <div className="h-full rounded-xl bg-neutral-50/80 dark:bg-neutral-800/30 p-6 border border-neutral-200 dark:border-neutral-700/50 shadow-lg backdrop-blur-sm">
                <h2 className="mb-4 font-semibold text-neutral-800 dark:text-white text-xl">
                  Meeting Tips
                </h2>
                <ul className="space-y-3 text-base">
                  <li className="flex items-center text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white transition-colors">
                    <span className="mr-2 text-neutral-400 dark:text-neutral-500">•</span>
                    Ensure you're in a well-lit area
                  </li>
                  <li className="flex items-center text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white transition-colors">
                    <span className="mr-2 text-neutral-400 dark:text-neutral-500">•</span>
                    Use a neutral background if possible
                  </li>
                  <li className="flex items-center text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white transition-colors">
                    <span className="mr-2 text-neutral-400 dark:text-neutral-500">•</span>
                    Test your audio before joining
                  </li>
                  <li className="flex items-center text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white transition-colors">
                    <span className="mr-2 text-neutral-400 dark:text-neutral-500">•</span>
                    Keep your microphone muted when not speaking
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <VideoPlatform
      name={session.data?.user.name || "User"}
      localAudioTrack={localAudioTrack}
      localVideoTrack={localVideoTrack}
      userId={session.data?.user.id || ""}
      meetingId={meetingId}
    />
  );
}
