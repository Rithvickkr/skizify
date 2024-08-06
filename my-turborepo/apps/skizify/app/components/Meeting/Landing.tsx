"use client";
import { useEffect, useState, useRef } from "react";
import Room from "./Room";

export default function Landing() {
  // User can see the Hair-Setting Screen
  const [name, setName] = useState("");
  const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>();
  const [localVideoTrack, setlocalVideoTrack] = useState<MediaStreamTrack | null>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [join, setJoin] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

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

      // Reset permission denied state
      setPermissionDenied(false);
    } catch (err) {
      console.error("Permissions Denied:", err);
      setPermissionDenied(true);
      alert("We need access to your camera and microphone. Please enable them in your browser settings.");
    }
  }

  const getCam = async () => {
    try {
      await getPermissionEnableStream();
    } catch (error) {
      console.error("Error accessing media devices:", error);
      alert("We need access to your camera and microphone. Please enable them in your browser settings.");
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

  if (!join) {
    return (
      <div className="">
        <video ref={videoRef} height={500} width={500} autoPlay className="rounded-lg m-1 ring-2 ring-white dark:ring-gray-600 "></video>
        <input type="text" onChange={(e) => setName(e.target.value)} className="rounded h-10" />
        <button onClick={() => setJoin(true)}>Join</button>
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
