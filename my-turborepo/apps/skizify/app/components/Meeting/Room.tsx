"use client";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

const URL = "http://localhost:3003";

export default function Room({
  name,
  localAudioTrack,
  localVideoTrack,
}: {
  name: string;
  localAudioTrack: MediaStreamTrack | null | undefined;
  localVideoTrack: MediaStreamTrack | null | undefined;
}) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sendingPC, setSendingPC] = useState<RTCPeerConnection | null>(null);
  const [receivingPC, setReceivingPC] = useState<RTCPeerConnection | null>(
    null,
  );
  const [remoteAudioTrack, setRemoteAudioTrack] = useState<MediaStreamTrack | null>();
  const [remoteVideoTrack, setRemoteVideoTrack] = useState<MediaStreamTrack | null>();
  const [remoteMediaStream, setRemoteMediaStream] = useState<MediaStream | null>(null);
  const localVideoref = useRef<HTMLVideoElement>(null);
  const remoteVideoref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const socket = io(URL);
    socket.on("send-offer", async ({ roomId }: { roomId: string }) => {
      console.log("Send-offer Sir wait Sir");
      //Now we will make Peer Connection
      const pc = new RTCPeerConnection();
      setSendingPC(pc);

      if (localAudioTrack) {
        console.log("adding Audi0 Track");
        pc.addTrack(localAudioTrack);
      }
      if (localVideoTrack) {
        console.log("adding Vide0 Track");
        pc.addTrack(localVideoTrack);
      }
      //Now we have to create Offer;
      pc.onicecandidate = async (e) => {
        console.log("sending Ice from person who SEND offer");
        //we will send these Ice Candidates to the other User
        if (e.candidate) {
          socket.emit("addIceCandidate", {
            roomId,
            candidate: e.candidate,
            type: "sender",
          });
        }
      };

      pc.onnegotiationneeded = async () => {
        //Now we will send Offer to the Other side
        const sdp = await pc.createOffer();
        await pc.setLocalDescription(sdp);
        socket.emit("offer", { roomId, sdp });
      };
    });
    socket.on(
      "offer",
      async ({ roomId, sdp: remotesdp }: { roomId: string; sdp: any }) => {
        console.log("Offer Received Sir ----");
        const pc = new RTCPeerConnection();
        const stream = new MediaStream();
        if (remoteVideoref.current) {
            remoteVideoref.current.srcObject = stream;
        }

        setRemoteMediaStream(stream);

        setReceivingPC(pc);
        pc.setRemoteDescription(remotesdp);
        pc.ontrack = (e) => {
          console.log(e);
          const { track } = e;
          if (track.kind === "video") {
            setRemoteVideoTrack(track);
            stream.addTrack(track);
          } else if (track.kind === "audio") {
            setRemoteAudioTrack(track);
            stream.addTrack(track);
          }
          remoteVideoref.current?.play();
        };

        // pc.ontrack()
        const sdp = await pc.createAnswer();
        pc.setLocalDescription(sdp);

        console.log("Wait a Minute Sir Sending Answer ----");

        pc.onicecandidate = async (e) => {
          console.log("sending Ice from person who GET offer ----");
          //we will send these Ice Candidates to the other User
          if (e.candidate) {
            socket.emit("addIceCandidate", {
              roomId,
              candidate: e.candidate,
              type: "receiver",
            });
          }
        };

        socket.emit("answer", { roomId, sdp });
      },
    );

    socket.on(
      "answer",
      async ({ roomId, sdp: remotesdp }: { roomId: string; sdp: any }) => {
        console.log("Received answer Sir");
        //we are Directly changing the sdp in the Function THIS IS GOOD
        //this tells
        setSendingPC((pc) => {
          pc?.setRemoteDescription(remotesdp);
          return pc;
        });
        console.log("Cycle Completes");
      },
    );

    socket.on(
      "addIceCandidate",
      ({
        candidate,
        type,
      }: {
        candidate: any;
        type: "sender" | "receiver";
      }) => {
        console.log("Received ICE BY", type);
        if (type === "sender") {
          setReceivingPC((pc) => {
            if (!pc) {
              console.error("receiveing PC not found");
            }
            pc?.addIceCandidate(candidate);
            return pc;
          });
        } else if (type === "receiver") {
          setSendingPC((pc) => {
            if (!pc) {
              console.error("sending PC not found");
            }
            pc?.addIceCandidate(candidate);
            return pc;
          });
        }
      },
    );

    setSocket(socket);

    return () => {
      // Closing Connection when the component Unmounts
      socket.close();
      setSendingPC((pc) => {
        if (pc) pc.close();
        return null;
      });
      setReceivingPC((pc) => {
        if (pc) pc.close();
        return null;
      });
    };
  }, [name]);

  useEffect(() => {
    if (localVideoref.current && localVideoTrack) {
      localVideoref.current.srcObject = new MediaStream([localVideoTrack]);
      localVideoref.current.play();
    }
  }, [localVideoref]);

  return (
    <div>
      Hello You are in the Room
      <div className="text-3xl text-blue-700">{name}</div>
      <div className="flex">
      <video
        autoPlay
        width={300}
        height={300}
        src=""
        ref={localVideoref}
        className="m-1 rounded-xl bg-themeblue object-cover ring-2 ring-white dark:ring-gray-600"
      ></video>
      <video
        autoPlay
        width={300}
        height={300}
        src=""
        ref={remoteVideoref}
        className="m-1 rounded-xl bg-themeblue object-cover ring-2 ring-white dark:ring-gray-600"
      ></video>
      </div>
    </div>
  );
}
