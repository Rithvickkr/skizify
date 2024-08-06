"use client";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Peer ,{MediaConnection} from "peerjs";

export default function MeetingPage({ params }: { params: any }) {
  const { data: session } = useSession();
  const router = useRouter();
  const currentUserVideoRef = useRef<HTMLVideoElement>(null);
  const [peerId, setPeerId] = useState("");
  const remotePeerIdValue = params.MeetingID as string;
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerInstance = useRef<Peer | null>(null);
const currentCall = useRef<MediaConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);

  useEffect(() => {
    console.log(remotePeerIdValue);
    if (!session?.user?.id) {
      console.error("No user id found in session");
      return;
    }

    setPeerId(session.user.id);

    const newPeer = new Peer(session.user.id);

    newPeer.on("open", (id) => {
      console.log("Peer connected with ID:", id);
    });

    newPeer.on("error", (err) => {
      console.error("Peer connection error:", err);
    });

    newPeer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          localStream.current = mediaStream;
          if (currentUserVideoRef.current) {
            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.play();
          }
          call.answer(mediaStream);
          call.on("stream", (remoteStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
              remoteVideoRef.current.play();
            }
          });
        })
        .catch((err) => {
          console.error("Error accessing media devices:", err);
        });
      currentCall.current = call;
    });

    peerInstance.current = newPeer;
    return () => {
      newPeer.destroy();
    };
  }, [session?.user?.id]);

  const call = (remotePeerId: string) => {
    if (!peerInstance.current) {
      console.error("PeerJS instance not initialized");
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        localStream.current = mediaStream;
        if (currentUserVideoRef.current) {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
        }
        const call = peerInstance.current?.call(remotePeerId, mediaStream);
        if (!call) {
          console.error("Call instance not initialized");
          return;
        }
        call.on("stream", (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          }
        });
        currentCall.current = call;
      })
      .catch((err) => {
        console.error("Error accessing media devices:", err);
      });
  };

  const shareScreen = () => {
    if (!peerInstance.current) {
      console.error("PeerJS instance not initialized");
      return;
    }
    navigator.mediaDevices
      .getDisplayMedia({ video: true, audio: true })
      .then((mediaStream) => {
        localStream.current = mediaStream;
        if (currentUserVideoRef.current) {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
        }
        const call = peerInstance.current?.call(remotePeerIdValue, mediaStream);
        if (!call) {
          console.error("Call instance not initialized");
          return;
        }
        call.on("stream", (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          }
        });
        currentCall.current = call;
      })
      .catch((err) => {
        console.error("Error accessing screen share devices:", err);
      });
  };

  const disconnect = () => {
    if (currentCall.current) {
      currentCall.current.close();
    }
    if (localStream.current) {
      localStream.current.getTracks().forEach(track => track.stop());
      localStream.current = null;
    }
    router.push("/explore");
  };

  return (
    <div className="">
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl mb-4">Current user id is {peerId}</h1>
      <div className="flex-col items-center justify-center">
        <div className="w-100">
          <video ref={remoteVideoRef} autoPlay className="w-full rounded-lg border-2 border-gray-700" />
        </div>
        <div className="w-40">
          <video ref={currentUserVideoRef} autoPlay className="w-full rounded-lg border-2 border-gray-700" />
        </div>
      </div>
      <div className="flex space-x-4 mb-4">
        <button onClick={() => call(remotePeerIdValue)} className="bg-blue-500 px-4 py-2 rounded">Call</button>
        <button onClick={shareScreen} className="bg-green-500 px-4 py-2 rounded">Share Screen</button>
        <button onClick={disconnect} className="bg-red-500 px-4 py-2 rounded">Disconnect</button>
      </div>
    </div>
    </div>
  );
}
