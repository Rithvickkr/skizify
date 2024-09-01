"use client";
import { Avatar } from "@repo/ui/avatar";
import {
  EllipsisVertical,
  MessageSquare,
  MessageSquareOff,
  MicIcon,
  MicOffIcon,
  PhoneIcon,
  Pin,
  PinOff,
  ScreenShare,
  Send,
  Video,
  VideoOff,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { RefObject, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { Dock, DockIcon } from "../../../@/components/magicui/dock";
import { Textarea } from "../../../@/components/ui/textarea";
import { Button } from "../ui/button";
import ButtonsDock from "./Buttons-dock";
import { useRouter } from "next/navigation";
const URL = "http://localhost:3003";

export interface Chat {
  message: string;
  name: string;
  userId: string;
  userImage?: string;
}

export default function VideoPlatform({
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
  const router = useRouter();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sendingPC, setSendingPC] = useState<RTCPeerConnection | null>(null);
  const [receivingPC, setReceivingPC] = useState<RTCPeerConnection | null>(
    null,
  );

  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [permissionToChat, setPermissionToChat] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Chat[]>([]);
  const [isChatBarVisible, setIsChatBarVisible] = useState(false);
  const [screenTrack, setScreenTrack] = useState<
    MediaStreamTrack | null | undefined
  >(null);
  const [remoteUserTracks, setremoteUserTracks] = useState<
    //mreote User Tracks
    MediaStreamTrack | null | undefined
  >(null);
  const [remotescreenUserTracks, setremotescreenUserTracks] = useState<
    //remote User Screen Tracks
    MediaStreamTrack | null | undefined
  >(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [remoteMediaStream, setRemoteMediaStream] =
    useState<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localscreenShareVideoref = useRef<HTMLVideoElement>(null);
  const remotescreenShareVideoref = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // for Automatic sroll at the bottom od the screen

  //UNINPORTANT STATES
  const [SelectPintab, setSelectPintab] = useState<boolean>(false);
  const [remoteUserJoined, setRemoteUserJoined] = useState(false);
  const [state, setState] = useState(1);
  const [pinnedVideo, setPinnedVideo] = useState<number | null>(null);
  const [selectPinTabs, setSelectPinTabs] = useState([
    false,
    false,
    false,
    false,
  ]);

  //New Variables
  const [remoteIsScreenSharing, setRemoteIsScreenSharing] = useState(false);
  const [remoteScreenTrack, setRemoteScreenTrack] =
    useState<MediaStreamTrack | null>(null);
  const [screenSender, setScreenSender] = useState<RTCRtpSender | null>(null);
  const remoteScreenVideoRef = useRef<HTMLVideoElement>(null);

  //This is for Re-Establishing the connection under 5Sec IF error came First time
  // useEffect(() => {
  //   console.log("hello");
  //   const timer = setTimeout(() => {
  //     setState((prevState) => prevState + 1);
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, [remoteUserJoined]);

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
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
        }

        setRemoteMediaStream(stream);
        pc.ontrack = (e) => {
          console.log("Track received:", e.track.kind);
          const { track, streams } = e;
          if (track.kind === "video") {
            if (track.label.includes("screen") || track.label.includes("display")) {
              // This is a screen share track
              setRemoteScreenTrack(track);
              setRemoteIsScreenSharing(true);
              if (remoteScreenVideoRef.current) {
                remoteScreenVideoRef.current.srcObject = new MediaStream([track]);
              }
            } else {
              // This is the regular video track
              if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = new MediaStream([track]);
              }
            }
          } else if (track.kind === "audio") {
            if (remoteAudioRef.current) {
              remoteAudioRef.current.srcObject = new MediaStream([track]);
            }
          }
          setRemoteUserJoined(true);
        };
        
        
        setReceivingPC(pc);
        pc.setRemoteDescription(remotesdp);

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

      if (screenTrack) {
        screenTrack.stop();
      }
    };
  }, [remoteUserJoined, state, pinnedVideo]);

  useEffect(() => {
    if (localVideoRef.current && localVideoTrack) {
      localVideoRef.current.srcObject = new MediaStream([localVideoTrack]);
      localVideoRef.current.play();
    }
  }, [localVideoRef, remoteUserJoined, pinnedVideo, state]);

  useEffect(() => {
    console.log("isScreenSharing: ", isScreenSharing);
    if (isScreenSharing && localscreenShareVideoref.current && screenTrack) {
      localscreenShareVideoref.current.srcObject = new MediaStream([
        screenTrack,
      ]);
      localscreenShareVideoref.current
        .play()
        .catch((error) => console.error("Error playing video:", error));
    }
  }, [isScreenSharing, screenTrack, pinnedVideo, state]);

  useEffect(() => {
    console.log("isScreenSharing:", isScreenSharing);
    console.log("screenTrack:", screenTrack);
    console.log("localscreenShareVideoref:", localscreenShareVideoref.current);
  }, [isScreenSharing, screenTrack, remoteUserJoined]);

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  const startScreenShare = async () => {
    if (socket) {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        const screenTrack = stream.getVideoTracks()[0];

        if (!screenTrack) {
          throw new Error("Screen track is undefined");
        }

        setScreenTrack(screenTrack);
        setIsScreenSharing(true);

        // Add the screen track to the sending peer connection
        if (sendingPC) {
          const sender = sendingPC.addTrack(screenTrack, stream);
          setScreenSender(sender);

          // Create and send offer for the screen share track
          const offer = await sendingPC.createOffer();
          await sendingPC.setLocalDescription(offer);
          socket.emit("screen-share-track", { roomId: meetingId, sdp: offer });
        } else {
          console.error("sendingPC is null, cannot add screen share track");
          throw new Error("Peer connection is not established");
        }

        // Notify the server that screen sharing has started
        socket.emit("start-screen-share", { roomId: meetingId });

        // Handle the end of screen sharing
        screenTrack.onended = () => {
          stopScreenShare();
        };
      } catch (error) {
        console.error("Error starting screen sharing:", error);
        setIsScreenSharing(false);
      }
    }
  };
  const stopScreenShare = () => {
    if (socket) {
      if (screenTrack) {
        screenTrack.stop();

        // Remove the screen track from the sending peer connection
        if (sendingPC && screenSender) {
          sendingPC.removeTrack(screenSender);
        } else {
          console.warn(
            "sendingPC or screenSender is null, cannot remove screen share track",
          );
        }

        setScreenTrack(null);
        setScreenSender(null);
        setIsScreenSharing(false);

        // Notify the server that screen sharing has stopped
        socket.emit("stop-screen-share", { roomId: meetingId });
      }
    }
  };
  const endMeeting = () => {
    if (socket) {
      socket?.emit("leave-meeting", { userId, meetingId });
      socket?.disconnect();
    }
    setSendingPC((pc) => {
      if (pc) pc.close();
      return null;
    });

    setReceivingPC((pc) => {
      if (pc) pc.close();
      return null;
    });

    if (localAudioTrack) {
      localAudioTrack.stop();
    }
    if (localVideoTrack) {
      localVideoTrack.stop();
    } 
    if (screenTrack) {
      screenTrack.stop();
    }
    router.push("./meeting/end");
  };

  const toggleAudio = () => {
    if (localAudioTrack) {
      localAudioTrack.enabled = !localAudioTrack.enabled;
      setIsAudioMuted(!localAudioTrack.enabled);
    }
  };

  const toggleVideo = () => {
    if (localVideoTrack) {
      localVideoTrack.enabled = !localVideoTrack.enabled;
      setIsVideoMuted(!localVideoTrack.enabled);

      if (localVideoRef.current) {
        //Is the Now Video Available then we will make a Stream to display to user
        if (localVideoTrack.enabled) {
          localVideoRef.current.srcObject = new MediaStream([localVideoTrack]);
          localVideoRef.current.play();
        } else {
          //if the localVideoTrack.enabled is now set to fasle then we wll remove the the Videotrack
          localVideoRef.current.srcObject = null;
        }
      }
    }
  };

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

  const togglePinTab = (index: number) => {
    setSelectPinTabs((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handlePin = (index: number) => {
    setPinnedVideo((prevPinned) => (prevPinned === index ? null : index));
  };

  const renderVideo = (
    index: number,
    reference: RefObject<HTMLVideoElement>,
  ) => {
    let videoTitle = "";
    console.log("index: ", index);
    console.log("reference: ", reference);
    switch (index) {
      case 0:
        videoTitle = "Your Video";
        break;
      case 1:
        videoTitle = "Remote Video";
        break;
      case 2:
        videoTitle = "Your Screen Share";
        break;
      case 3:
        videoTitle = "Remote Screen Share";
        break;
    }

    return (
      <div
        className={`relative overflow-hidden rounded-lg border border-neutral-400 dark:border-neutral-700 ${
          pinnedVideo === index
            ? "h-1/2 w-full sm:h-full sm:w-4/5"
            : `${pinnedVideo == null ? "h-full w-[65%] sm:w-full" : "h-full w-[45%] sm:w-full"}`
        }`}
        onClick={() => togglePinTab(index)}
      >
        <video
          ref={reference}
          autoPlay
          className="absolute inset-0 h-full w-full object-cover"
        />

        {selectPinTabs[index] && (
          <div className="absolute left-1/2 top-1/2 flex min-w-28 -translate-x-1/2 -translate-y-1/2 transform items-center justify-between rounded-e-full rounded-s-full bg-black p-2 opacity-40 transition-opacity duration-700 dark:bg-neutral-500 dark:opacity-50">
            <div
              className="cursor-pointer rounded-full text-white opacity-60 hover:bg-v0dark hover:dark:bg-neutral-400 hover:dark:opacity-95"
              onClick={(e) => {
                e.stopPropagation();
                handlePin(index);
              }}
            >
              {pinnedVideo === index ? (
                <PinOff className="m-2 size-5 text-white sm:size-6" />
              ) : (
                <Pin className="m-2 size-5 text-white sm:size-6" />
              )}
            </div>
            <div className="cursor-pointer rounded-full text-white opacity-60 hover:bg-v0dark hover:dark:bg-neutral-400 hover:dark:opacity-95">
              <EllipsisVertical className="m-2 size-5 text-white sm:size-6" />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-[85%] w-full rounded-xl from-neutral-900 via-black to-neutral-900 dark:bg-gradient-to-r sm:h-[92%]">
      <div className="flex h-full w-full flex-1 flex-col items-center justify-between p-1 pb-2">
        {/* {remoteUserJoined ? ( */}
        <div className="flex h-full w-full flex-col gap-1 sm:flex-row">
          {pinnedVideo !== null ? (
            <>
              {renderVideo(pinnedVideo, localVideoRef)}
              {/*  h-1/2 w-full sm:h-full sm:w-4/5 */}
              <div className="ml-2 flex h-1/2 flex-col items-center gap-1 sm:h-full sm:w-1/5">
                {[0, 1, 2, 3]
                  .filter((i) => i !== pinnedVideo)
                  .map((x) => {
                    const videoRef =
                      x === 0
                        ? localVideoRef
                        : x === 1
                          ? localscreenShareVideoref
                          : remoteVideoRef;
                    return renderVideo(x, videoRef);
                  })}
              </div>
            </>
          ) : (
            <div
              className={`flex h-full w-full flex-col items-center gap-3 pt-2 sm:grid ${screenTrack || remoteUserJoined ? "sm:grid-cols-2" : "sm:grid-cols-1"} sm:pt-0`}
            >
              {localVideoTrack && renderVideo(0, localVideoRef)}
              {remoteUserJoined && renderVideo(1, remoteVideoRef)}
              {isScreenSharing &&
                screenTrack &&
                renderVideo(2, localscreenShareVideoref)}
              {remoteIsScreenSharing && renderVideo(3, remoteScreenVideoRef)}
            </div>
          )}
        </div>
        {/*) : (
          <div className="relative h-full w-full overflow-hidden rounded-xl border border-neutral-400 dark:border-neutral-700">
            <video
              ref={localVideoRef}
              autoPlay
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        )}*/}

        <div className="">
          <Dock
            direction="middle"
            className="gap-7 rounded-md dark:border-neutral-800"
          >
            <DockIcon>
              <ButtonsDock
                name={isAudioMuted ? "Unmute" : "Mute"}
                onClick={toggleAudio}
              >
                {isAudioMuted ? (
                  <MicOffIcon
                    strokeWidth={1.7}
                    className="size-4 lg:size-5 xl:size-6"
                  />
                ) : (
                  <MicIcon
                    strokeWidth={1.7}
                    className="size-4 lg:size-5 xl:size-6"
                  />
                )}
              </ButtonsDock>
            </DockIcon>
            <DockIcon>
              <ButtonsDock
                name={isVideoMuted ? "Start Video" : "Stop Video"}
                onClick={toggleVideo}
              >
                {isVideoMuted ? (
                  <VideoOff
                    strokeWidth={1.7}
                    className="size-4 lg:size-5 xl:size-6"
                  />
                ) : (
                  <Video
                    strokeWidth={1.7}
                    className="size-4 lg:size-5 xl:size-6"
                  />
                )}
              </ButtonsDock>
            </DockIcon>
            <DockIcon>
              <ButtonsDock
                name="Call-End"
                className="bg-red-600 text-white hover:bg-red-600 dark:bg-red-600 hover:dark:bg-red-600"
                onClick={endMeeting}
              >
                <PhoneIcon
                  strokeWidth={1.7}
                  className="size-4 lg:size-5 xl:size-6"
                />
              </ButtonsDock>
            </DockIcon>
            <DockIcon>
              <ButtonsDock
                name="ScreenShare"
                onClick={isScreenSharing ? stopScreenShare : startScreenShare}
              >
                <ScreenShare
                  strokeWidth={1.7}
                  className="size-4 lg:size-5 xl:size-6"
                />
              </ButtonsDock>
            </DockIcon>
            <DockIcon>
              <ButtonsDock
                name="Chat"
                onClick={() => setIsChatBarVisible(!isChatBarVisible)}
              >
                {isChatBarVisible ? (
                  <MessageSquareOff
                    strokeWidth={1.7}
                    className="size-4 lg:size-5 xl:size-6"
                  />
                ) : (
                  <MessageSquare
                    strokeWidth={1.7}
                    className="size-4 lg:size-5 xl:size-6"
                  />
                )}
              </ButtonsDock>
            </DockIcon>
          </Dock>
        </div>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out lg:relative lg:block ${
          isChatBarVisible
            ? "md:max-w-50% fixed inset-y-0 right-0 z-50 w-[80%] opacity-100 lg:static lg:w-3/12"
            : "fixed -right-full w-0 opacity-0 lg:w-0 lg:opacity-100"
        } `}
      >
        <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-mediumdark dark:border-1 dark:border-neutral-800 dark:bg-white">
          <div className="flex items-center justify-between px-4 py-3 dark:border-neutral-700">
            <div className="text-xl font-medium text-white opacity-70 dark:text-v0dark">
              In-call messages
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-neutral-200 hover:bg-neutral-500 dark:text-mediumdark dark:hover:bg-neutral-300"
              onClick={() => setIsChatBarVisible(false)}
            >
              <X className="size-5" />
            </Button>
          </div>
          <div className="no-scrollbar flex-1 overflow-y-auto p-2 pt-4">
            <div className="space-y-4">
              {messages.map((data: Chat, index: any) => (
                <div key={index}>
                  <ChatStructure data={data} />
                </div>
              ))}
              {/* <div ref={messagesEndRef} /> */}
            </div>
          </div>
          <div className="flex items-center gap-2 border-t p-4 dark:border-neutral-700">
            <Textarea
              placeholder={`${!permissionToChat ? "Chat is diabled, Let the person Join" : "Type your message..."}`}
              className={`${!permissionToChat ? "cursor-not-allowed opacity-60" : ""} flex-1 resize-none rounded-lg text-white focus:border-none focus:outline-none focus:ring-2 focus:ring-neutral-500`}
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
              className="hover:bg-neutral-700 dark:hover:bg-neutral-500"
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
    </div>
  );
}

const ChatStructure: React.FC<{ data: Chat }> = ({ data }) => {
  const session = useSession();
  return (
    <div className="">
      {data.userId === session.data?.user.id ? (
        <div className="flex items-start justify-end gap-3">
          <div className="min-w-32 rounded-md bg-neutral-200 p-2 text-sm text-black">
            <p className="break-words break-all">{data.message}</p>
            <div className="mt-1 text-xs text-[#58595a] dark:text-neutral-400">
              2:35 PM
            </div>
          </div>
          <Avatar
            name={data.name}
            classname="size-8 shadow-sm mr-1 md:mr-2 bg-neutral-200 text-sm  text-black border border-black"
            photo={data.userImage}
          />
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <Avatar
            name={data.name}
            classname="size-8 shadow-sm bg-neutral-200 text-sm  text-black border border-black"
            photo={data.userImage}
          />
          <div className="min-w-32 rounded-md bg-lightdark p-2 text-sm text-[#e2e8f0]">
            <p className="break-words break-all">{data.message}</p>
            <div className="mt-1 text-xs text-neutral-200">2:36 PM</div>
          </div>
        </div>
      )}
    </div>
  );
};
