"use client";
import { Avatar } from "@repo/ui/avatar";
import { Textarea } from "../../../@/components/ui/textarea";
import { Button } from "../ui/button";
import {
  CameraIcon,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  MessageSquareOff,
  MicIcon,
  PanelRightOpen,
  PhoneIcon,
  ScreenShare,
  Send,
  SettingsIcon,
  Video,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useSession } from "next-auth/react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const URL = "http://localhost:3003";

export interface Chat {
  message: string;
  name: string;
  userId: string;
  userImage?: string;
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
  const session = useSession();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sendingPC, setSendingPC] = useState<RTCPeerConnection | null>(null);
  const [receivingPC, setReceivingPC] = useState<RTCPeerConnection | null>(
    null,
  );
  const [permissionToChat, setPermissionToChat] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Chat[]>([]);
  const [isChatBarVisible, setIsChatBarVisible] = useState(false);
  const [remoteAudioTrack, setRemoteAudioTrack] =
    useState<MediaStreamTrack | null>();
  const [remoteVideoTrack, setRemoteVideoTrack] =
    useState<MediaStreamTrack | null>();
  const [remoteMediaStream, setRemoteMediaStream] =
    useState<MediaStream | null>(null);
  const localVideoref = useRef<HTMLVideoElement>(null);
  const remoteVideoref = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // for Automatic sroll at the bottom od the screen
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
        //AFTER THE CYCLE COMPLETES THEN ALLOWING USER PERMISSION TO CHAT
        setPermissionToChat(true);
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

    socket.on("receive-message", (data: Chat) => {
      console.log("Bro I got something from the Backend", data);
      setMessages((messages: Chat[]) => [...messages, data]);
      console.log("Data is not become", messages);
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const messageHandler = (
    e: any,
    name: string,
    userId: string,
    userImage?: string,
  ) => {
    e.preventDefault();
    console.log(message);
    //Here we have to implement Zod
    if (message === "") {
      return;
    }
    socket?.emit("send-message", { message, name, userImage, userId });
  };

  // useEffect(() => {
  //   console.log("Messages updated:", messages);
  // }, [messages]);

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
      <div className="relative flex h-full flex-1 flex-col items-center justify-between p-3">
        <div className="grid h-full w-full grid-cols-1 gap-3 md:gap-4 lg:grid-cols-2 lg:gap-6">
          <div className="relative h-full w-full overflow-hidden rounded-xl border border-white ring-2 ring-black dark:border-gray-700 dark:ring-white">
            <video
              autoPlay
              ref={localVideoref}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="relative h-full w-full overflow-hidden rounded-xl border border-white ring-2 ring-black dark:border-gray-700 dark:ring-white">
            <video
              autoPlay
              ref={remoteVideoref}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="m-1 flex w-full items-center justify-center gap-2 space-x-1 rounded-lg p-2 md:space-x-2 xl:space-x-3">
          <Button
            variant="ghost"
            className="size-7 bg-neutral-200 hover:bg-neutral-200 dark:bg-gray-800 dark:hover:bg-gray-500 md:size-8 lg:size-9 xl:size-11"
            size="icon"
          >
            <MicIcon className="size-3 md:size-4 lg:size-5" />
            <span className="sr-only">Mute</span>
          </Button>
          <Button
            variant="ghost"
            className="size-7 bg-neutral-200 hover:bg-neutral-200 dark:bg-gray-800 dark:hover:bg-gray-500 md:size-8 lg:size-9 xl:size-11"
            size="icon"
          >
            <Video className="size-3 md:size-4 lg:size-5" />
            <span className="sr-only">Video</span>
          </Button>
          <Button
            variant="destructive"
            className="size-7 bg-red-600 text-white hover:bg-neutral-200 dark:hover:bg-gray-500 md:size-8 lg:size-9 xl:size-11"
            size="icon"
          >
            <PhoneIcon className="size-3 md:size-4 lg:size-5" />
            <span className="sr-only">End Call</span>
          </Button>
          <Button
            variant="ghost"
            className="size-7 bg-neutral-200 hover:bg-neutral-200 dark:bg-gray-800 dark:hover:bg-gray-500 md:size-8 lg:size-9 xl:size-11"
            size="icon"
          >
            <ScreenShare className="size-3 md:size-4 lg:size-5" />
            <span className="sr-only">Share</span>
          </Button>
          <Button
            variant="ghost"
            className="size-7 bg-neutral-200 hover:bg-neutral-200 dark:bg-gray-800 dark:hover:bg-gray-500 md:size-8 lg:size-9 xl:size-11"
            size="icon"
            onClick={() => setIsChatBarVisible(!isChatBarVisible)}
          >
            {isChatBarVisible ? (
              <MessageSquareOff className="size-3 md:size-4 lg:size-5" />
            ) : (
              <MessageSquare className="size-3 md:size-4 lg:size-5" />
            )}
            <span className="sr-only">Chat</span>
          </Button>
        </div>
      </div>
      <div
        className={`${
          isChatBarVisible ? "block" : "hidden"
        } flex h-full w-5/12 flex-col rounded-md border bg-black ring-2 ring-black dark:border-1 dark:border-gray-800 dark:bg-themeblue dark:ring-0 lg:w-3/12`}
      >
        <div className="flex items-center justify-between border-b border-[#334155] px-4 py-3 dark:border-gray-700">
          <div className="text-lg font-medium text-[#e2e8f0]">Chat</div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-md text-[#94a3b8] hover:bg-gray-500"
            onClick={() => setIsChatBarVisible(false)}
          >
            <X className="size-5" />
          </Button>
        </div>
        <div className="no-scrollbar h-64 flex-1 overflow-y-auto p-2 pt-4">
          <div className="space-y-4">
            {messages.map((data: Chat, index: any) => (
              <div key={index}>
                <ChatStructure data={data} />
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="flex items-center gap-2 border-t p-4 dark:border-gray-700">
          <Textarea
            placeholder={`${!permissionToChat ? "Chat is diabled, Let the person Join" : "Type your message..."}`}
            className={`${!permissionToChat ? "cursor-not-allowed opacity-60" : ""} flex-1 resize-none text-white focus:border-none focus:outline-none focus:ring-2 focus:ring-neutral-500`}
            onChange={(e) => {
              if (permissionToChat) {
                setMessage(e.target.value);
              }
            }}
            value={message}
            readOnly={!permissionToChat}
          />
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-neutral-700 dark:hover:bg-gray-500"
          >
            <Send
              className="size-5 text-white"
              onClick={(e) =>
                messageHandler(
                  e,
                  session.data?.user.name || "",
                  session.data?.user.id || "",
                  session.data?.user.userImage,
                )
              }
            />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

const ChatStructure: React.FC<{ data: Chat }> = ({ data }) => {
  const session = useSession();
  return (
    <div className="">
      {data.userId === session.data?.user.id ? (
        <div className="flex items-start justify-end gap-3">
          <div className="rounded-md bg-neutral-200 p-2 text-sm text-black dark:bg-[#25306c] dark:text-[#e2e8f0]">
            <p className="break-words break-all">{data.message}</p>
            <div className="mt-1 text-xs text-[#58595a] dark:text-gray-400">
              2:35 PM
            </div>
          </div>
          <Avatar
            name={data.name}
            classname="size-8 shadow-sm mr-1 md:mr-2 bg-gray-200 text-sm  text-black border border-black"
            photo={data.userImage}
          />
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <Avatar
            name={data.name}
            classname="size-8 shadow-sm bg-gray-200 text-sm  text-black border border-black"
            photo={data.userImage}
          />
          <div className="rounded-lg bg-[#334155] p-3 text-sm text-[#e2e8f0]">
            <p className="break-words break-all">{data.message}</p>
            <div className="mt-1 text-xs text-[#94a3b8]">2:36 PM</div>
          </div>
        </div>
      )}
    </div>
  );
};
