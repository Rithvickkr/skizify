"use client";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

import Peer from "peerjs";

export default function MeetingPage() {
    const { data: session } = useSession();
const currentUserVideoRef = useRef<HTMLVideoElement>(null);
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerInstance = useRef<Peer | null>(null);
 

  useEffect(() => {
    // Generate a unique peer ID when the component mounts
    const newPeerId = session?.user.id as string;
    setPeerId(newPeerId);

    // Initialize PeerJS with the generated peer ID
    const newPeer = new Peer(newPeerId);

    newPeer.on('open', (id) => {
      console.log("Peer connected with ID:", id);
    });

    newPeer.on('error', (err) => {
      console.error("Peer connection error:", err);
    });

    newPeer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((mediaStream: MediaStream | null | undefined) => {
          if (currentUserVideoRef.current) {
            currentUserVideoRef.current.srcObject = mediaStream || null;
            currentUserVideoRef.current.play();
          }
          call.answer(mediaStream!);
          call.on('stream', function(remoteStream) {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
              remoteVideoRef.current.play();
            }
          });
        })
        .catch((err) => {
          console.error("Error accessing media devices:", err);
        });
    })
    peerInstance.current = newPeer;
    return () => {
      newPeer.destroy();
    };
  }, []);
  const call = (remotePeerId: string) => {
    if (!peerInstance.current) {
      console.error("PeerJS instance not initialized");
      return;
    }
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream: MediaStream | null | undefined) => {
        if (currentUserVideoRef.current) {
          currentUserVideoRef.current.srcObject = mediaStream || null;
          currentUserVideoRef.current.play();
        }
        const call = peerInstance.current?.call(remotePeerId, mediaStream!);
        if (!call) {
          console.error("Call instance not initialized");
          return;
        }
        call.on('stream', function(remoteStream) {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          }
        });
      })
      .catch((err) => {
        console.error("Error accessing media devices:", err);
      });
  }

  return (
    <div className="App">
    <h1>Current user id is {peerId}</h1>
    <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
    <button onClick={() => call(remotePeerIdValue)}>Call</button>
    <div>
      <video ref={currentUserVideoRef} />
    </div>
    <div>
      <video ref={remoteVideoRef} />
    </div>
  </div>
);
}

