"use client";
import { Avatar } from "@repo/ui/avatar";
import { Textarea } from "../../../@/components/ui/textarea";
import { Button } from "../ui/button";
import {
  CameraIcon,
  MicIcon,
  PhoneIcon,
  ScreenShare,
  Send,
  SettingsIcon,
  ShareIcon,
  Smile,
  SmilePlus,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

const URL = "http://localhost:3003";

interface User {
  name: string;
  email: string;
  id: string;
  role: string;
  userImage: string;
}

interface Data {
  user: User;
  expires: string;
}

export interface ClientSessionInterface {
  data: Data;
  status: string;
}

export default function Room({
  name,
  localAudioTrack,
  localVideoTrack,
  meetingId,
  userId,
}: {
  name: string;
  localAudioTrack: MediaStreamTrack | null | undefined;
  localVideoTrack: MediaStreamTrack | null | undefined;
  meetingId: string;
  userId: string;
}) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sendingPC, setSendingPC] = useState<RTCPeerConnection | null>(null);
  const [receivingPC, setReceivingPC] = useState<RTCPeerConnection | null>(
    null,
  );
  const [remoteAudioTrack, setRemoteAudioTrack] =
    useState<MediaStreamTrack | null>();
  const [remoteVideoTrack, setRemoteVideoTrack] =
    useState<MediaStreamTrack | null>();
  const [remoteMediaStream, setRemoteMediaStream] =
    useState<MediaStream | null>(null);
  const localVideoref = useRef<HTMLVideoElement>(null);
  const remoteVideoref = useRef<HTMLVideoElement>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socket = io(URL);
    // socket.emit("getSession",)
    socket.emit("sessiondetails", { userId, meetingId });

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
        const sdp = await pc.createAnswer();
        pc.setLocalDescription(sdp);

        console.log("Wait a Minute Sir Sending Answer ----");

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

    socket.on("receive-message", (data: any) => {
      console.log("Bro I got something from the Backend",data);
      setMessages((messages) => [...messages, data]);
    });

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

  const messageHandler = (e: any) => {
    e.preventDefault();
    console.log(message);
    socket?.emit("send-message", { message });
    setMessage("");
  };

  // return (
  //   <div>
  //     Hello You are in the Room
  //     <div className="text-3xl text-blue-700">{name}</div>
  //     <div className="flex">
  //       <video
  //         autoPlay
  //         width={300}
  //         height={300}
  //         src=""
  //         ref={localVideoref}
  //         className="m-1 rounded-xl bg-themeblue object-cover ring-2 ring-white dark:ring-gray-600"
  //       ></video>
  //       <video
  //         autoPlay
  //         width={300}
  //         height={300}
  //         src=""
  //         ref={remoteVideoref}
  //         className="m-1 rounded-xl bg-themeblue object-cover ring-2 ring-white dark:ring-gray-600"
  //       ></video>
  //     </div>
  //   </div>
  // );
  return (
    <div className="flex h-full w-full">
      <div className="relative flex flex-1 items-center justify-center p-3">
        <div className="grid w-full max-w-4xl grid-cols-2 gap-6">
          <div className="overflow-hidden rounded-xl border border-white ring-2 ring-black dark:border-gray-700">
            <video
              autoPlay
              width={300}
              height={300}
              src=""
              ref={localVideoref}
              className="h-full w-full rounded-lg bg-black object-cover"
              style={{ aspectRatio: "450/600", objectFit: "cover" }}
            />
          </div>
          <div className="overflow-hidden rounded-xl border border-white ring-2 ring-black dark:border-gray-700">
            <video
              autoPlay
              width={300}
              height={300}
              src=""
              ref={remoteVideoref}
              className="h-full w-full rounded-lg bg-black object-cover"
              style={{ aspectRatio: "450/600", objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="absolute bottom-2 flex w-full items-center justify-center gap-2">
          <Button
            variant="ghost"
            className="hover:bg-neutral-700 dark:hover:bg-gray-500"
            size="icon"
          >
            <MicIcon className="size-5" />
            <span className="sr-only">Mute</span>
          </Button>
          <Button
            variant="ghost"
            className="hover:bg-neutral-700 dark:hover:bg-gray-500"
            size="icon"
          >
            <CameraIcon className="size-5" />
            <span className="sr-only">Camera</span>
          </Button>
          <Button
            variant="destructive"
            className="bg-red-600 text-white hover:bg-neutral-700 dark:hover:bg-gray-500"
            size="icon"
          >
            <PhoneIcon className="size-5" />
            <span className="sr-only">End Call</span>
          </Button>
          <Button
            variant="ghost"
            className="hover:bg-neutral-700 dark:hover:bg-gray-500"
            size="icon"
          >
            <ScreenShare className="size-5" />
            <span className="sr-only">Share</span>
          </Button>
          <Button
            variant="ghost"
            className="hover:bg-neutral-700 dark:hover:bg-gray-500"
            size="icon"
          >
            <SettingsIcon className="size-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </div>
      <div className="flex w-[320px] flex-col rounded-md border bg-black ring-2 ring-black dark:border-1 dark:border-gray-800 dark:bg-themeblue dark:ring-0">
        <div className="flex items-center justify-between border-b border-[#334155] px-4 py-3 dark:border-gray-700">
          <div className="text-lg font-medium text-[#e2e8f0]">Chat</div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-md text-[#94a3b8] hover:bg-gray-500"
          >
            <X className="size-5" />
          </Button>
        </div>
        <div className="flex-1 space-y-4 overflow-auto p-4">
          <div className="flex items-start gap-3">
            <Avatar
              name={"SM"}
              classname="size-8 shadow-sm mr-3 bg-gray-200 text-sm  text-black border border-black"
            />
            <div className="rounded-lg bg-[#334155] p-3 text-sm text-[#e2e8f0]">
              <p>Hey, how's the video quality?</p>
              <div className="mt-1 text-xs text-[#94a3b8]">2:34 PM</div>
            </div>
          </div>
          <div className="flex items-start justify-end gap-3">
            <div className="rounded-lg bg-neutral-200 p-3 text-sm text-black dark:bg-[#25306c] dark:text-[#e2e8f0]">
              <p>It's looking great! Can you hear me okay?</p>
              <div className="mt-1 text-xs text-[#58595a] dark:text-gray-400">
                2:35 PM
              </div>
            </div>
            <Avatar
              name={"UP"}
              classname="size-8 shadow-sm mr-3 bg-gray-200 text-sm  text-black border border-black"
            />
          </div>
          <div className="flex items-start gap-3">
            <Avatar
              name={"SM"}
              classname="size-8 shadow-sm mr-3 bg-gray-200 text-sm  text-black border border-black"
            />
            <div className="rounded-lg bg-[#334155] p-3 text-sm text-[#e2e8f0]">
              <p>Yep, the audio is perfect. Let's get started!</p>
              <div className="mt-1 text-xs text-[#94a3b8]">2:36 PM</div>
            </div>
          </div>
          <div className="flex flex-col">
            {messages.map((msg, index) => (
              <div key={index} className="message">
                {msg}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 border-t p-4 dark:border-gray-700">
          <Textarea
            placeholder="Type your message..."
            className="flex-1 resize-none text-white focus:border-none focus:outline-none focus:ring-2 focus:ring-neutral-500"
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-neutral-700 dark:hover:bg-gray-500"
          >
            <Send className="size-5 text-white" onClick={messageHandler} />
            <span className="sr-only">Send</span>
          </Button>
          {/* <Button variant="ghost" size="icon">
            <SmilePlus className="size-5 hover:bg-gray-500" />
            <span className="sr-only">Emoji</span>
          </Button> */}
          {/* <Button variant="ghost" size="icon">
            <PaperclipIcon className="w-5 h-5" />
            <span className="sr-only">Attach</span>
          </Button> */}
        </div>
      </div>
    </div>
  );
}
