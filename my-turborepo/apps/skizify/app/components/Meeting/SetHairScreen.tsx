"use client";
import {
  Camera,
  Mic,
  MicOff,
  VideoOff
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import VideoPlatform from "./Structure";
import { JoinMeetingButton } from "./JoinButton";

export default function Component({meetingId} : {meetingId : string}) {
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
      // Do something with the stream
      const videotrack = stream.getVideoTracks()[0];
      const audiotrack = stream.getAudioTracks()[0];
      setlocalVideoTrack(videotrack);
      setLocalAudioTrack(audiotrack);

      console.log("videoRef: ", videoRef);
      console.log("videoRef.current: ", videoRef.current);
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
    console.log("videoRef: ", videoRef);
    console.log("videoRef.current: ", videoRef.current);
    if (videoRef && videoRef.current) {
      getCam();
    }
  }, [videoRef]);

  useEffect(() => {
    if (permissionDenied) {
      const retryInterval = setInterval(() => {
        getCam();
      }, 15000); // Retry every 15 seconds

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
      setIsCameraOn(!isCameraOn);
      setIsVideoEnabled(!isVideoEnabled);
    } else {
      console.log("VideoTracks are not here");
    }
  };

  // if (session.status === "unauthenticated") {
  //   return <div>You are not Signed In</div>;
  // }

  if (!join) {
    return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-50 rounded-md md:rounded-xl   to-neutral-100 dark:from-black dark:to-mediumdark p-4">
      <div className="w-full max-w-7xl rounded-xl bg-black dark:bg-neutral-100/5  bg-opacity-5 p-8 shadow-2xl backdrop-blur-xl">
      <h1 className="mb-8 text-center text-3xl font-bold bg-gradient-to-r from-slate-500 via-white via-30% to-65% to-neutral-500 bg-clip-text text-transparent font-helvetica ">
  ⎯⎯ Ready to join the Meeting ⎯⎯
</h1>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1">
            <div className="relative mb-4 aspect-video overflow-hidden rounded-2xl bg-black">
              {isVideoInitialized ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className={`h-full w-full object-cover ${isBackgroundBlur ? "backdrop-blur-sm" : ""}`}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-v0dark">
                  <VideoOff className="h-16 w-16 text-gray-500" />
                </div>
              )}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="border border-neutral-700 bg-black opacity-70 hover:bg-black hover:opacity-80"
                  onClick={handleToggleVideo}
                  aria-label={
                    isVideoEnabled ? "Turn camera off" : "Turn camera on"
                  }
                >
                  {isVideoEnabled ? (
                    <Camera className="size-4" />
                  ) : (
                    <VideoOff className="size-4" />
                  )}
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="border border-neutral-700 bg-black opacity-70 hover:bg-black hover:opacity-80"
                  onClick={handleToggleAudio}
                  aria-label={
                    isAudioEnabled
                      ? "Turn microphone off"
                      : "Turn microphone on"
                  }
                >
                  {isAudioEnabled ? (
                    <Mic className="size-4" />
                  ) : (
                    <MicOff className="size-4" />
                  )}
                </Button>
              </div>
            </div>
            <JoinMeetingButton SetMeetingTrue={() => setJoin(true)} />
          </div>

          <div className="flex-1 space-y-6">
            {/* <div className="flex items-center justify-between">
              <label
                htmlFor="background-blur"
                className="flex items-center gap-2 text-white"
              >
                <ImageIcon className="h-5 w-5" />
                Background blur
              </label>
              <Switch
                id="background-blur"
                checked={isBackgroundBlur}
                onCheckedChange={setIsBackgroundBlur}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="touch-up"
                className="flex items-center gap-2 text-white"
              >
                <Sparkles className="h-5 w-5" />
                Touch up my appearance
              </label>
              <Slider
                id="touch-up"
                max={100}
                step={1}
                value={[touchUpLevel]}
                onValueChange={(value) => {
                  if (value[0] !== undefined) {
                    setTouchUpLevel(value[0]);
                  }
                }}
                className="w-full"
              />
            </div> */}

            <div className="h-full rounded-xl bg-white bg-opacity-5 p-4">
              <h2 className="mb-2 font-semibold dark:text-white">Meeting Tips</h2>
              <ul className="space-y-1 text-sm md:text-base xl:text-lg dark:text-gray-300">
                <li>• Ensure you're in a well-lit area</li>
                <li>• Use a neutral background if possible</li>
                <li>• Test your audio before joining</li>
                <li>• Keep your microphone muted when not speaking</li>
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
    meetingId = {meetingId}
  />
);
}