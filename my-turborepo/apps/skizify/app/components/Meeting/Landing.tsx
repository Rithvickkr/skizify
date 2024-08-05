"use client";
import { useEffect, useState, useRef } from "react";
import Room from "./Room";

export default function Landing() {
  //here User cna see the Hair-Setting Screen
  const [name, setName] = useState("");
  const [localAudioTrack, setLocalAudioTrack] =useState<MediaStreamTrack | null>();
  const [localVideoTrack, setlocalVideoTrack] =useState<MediaStreamTrack | null>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [join, setJoin] = useState(false);
  const getCam = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const videotrack = stream.getVideoTracks()[0];
    const audiotrack = stream.getAudioTracks()[0];
    setlocalVideoTrack(videotrack);
    setLocalAudioTrack(audiotrack);

    if (videotrack && videoRef && videoRef.current) {
      //We have to check that wrong values don't pass inside the VideoRef
      videoRef.current.srcObject = new MediaStream([videotrack]);
      videoRef.current.play();
    }
  };
  useEffect(() => {
    console.log("kjewfbw")
  },[])

  useEffect(() => {
    try {
      if (videoRef && videoRef.current) {
        getCam();
      }
    } catch {
      console.log("Error at Calling getCam");
    }
  }, [videoRef]);
  if (!join) {
    return (
      <div>
        <video src="" ref={videoRef} autoPlay></video>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <button onClick={() => setJoin(true)}>Join</button>
      </div>
    );
  }
  
  return (
    <div>
        <Room name={name} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack} />
    </div>
  )
}
