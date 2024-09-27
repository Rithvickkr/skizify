"use client";
import { Avatar } from "@repo/ui/avatar";
import { motion } from "framer-motion";
import {
  EllipsisVertical,
  Expand,
  Fullscreen,
  MessageSquare,
  MessageSquareOff,
  MicIcon,
  MicOffIcon,
  Minimize,
  PhoneIcon,
  PictureInPicture,
  PictureInPicture2,
  Pin,
  PinOff,
  ScreenShare,
  ScreenShareOff,
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
  const [sendingscreenSharePC, setSendingScreenSharePC] =
    useState<RTCPeerConnection | null>(null);
  const [remoteScreenSharePC, setRemoteScreenSharePC] =
    useState<RTCPeerConnection | null>(null);

  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [permissionToChat, setPermissionToChat] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Chat[]>([]);
  const [isChatBarVisible, setIsChatBarVisible] = useState(false);
  //my screenShare Tracks
  const [screenTrackVideo, setScreenTrackVideo] = useState<
    MediaStreamTrack | null | undefined
  >(null);
  const [screenTrackAudio, setScreenTrackAudio] = useState<
    MediaStreamTrack | null | undefined
  >(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [remoteMediaStream, setRemoteMediaStream] =
    useState<MediaStream | null>(null);
  const [remoteScreenStream, setRemoteScreenStream] =
    useState<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localscreenShareVideoref = useRef<HTMLVideoElement>(null);
  const remoteScreenVideoRef = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // for Automatic sroll at the bottom od the screen
  const [remoteVideoTrack, setRemoteVideoTrack] =
    useState<MediaStreamTrack | null>(null);
  const [remoteAudioTrack, setRemoteAudioTrack] =
    useState<MediaStreamTrack | null>(null);

  //UNINPORTANT STATES
  const [remoteUserJoined, setRemoteUserJoined] = useState(false);
  const [pinnedVideo, setPinnedVideo] = useState<number | null>(null);
  const [selectPinTabs, setSelectPinTabs] = useState([
    false,
    false,
    false,
    false,
  ]);

  //New Variables
  const [remoteIsScreenSharing, setRemoteIsScreenSharing] =
    useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [pipActiveIndex, setPipActiveIndex] = useState<number | null>(null);

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
        setReceivingPC(pc);
        const stream = new MediaStream();
        console.log("stream: ", stream);

        // Attach stream to video element if reference exists
        console.log("remoteVideoRef.current: ", remoteVideoRef.current);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
          console.log(
            "remoteVideoRef.current: ",
            remoteVideoRef.current.srcObject,
          );
        }

        // Store the remote media stream in the state
        setRemoteMediaStream(stream);

        // Handle incoming tracks
        pc.ontrack = (e) => {
          const { track, streams } = e;
          console.log("Track received:", track.kind, track.label);

          // Handle screen-sharing track
          // if (
          //   track.label.includes("screen") ||
          //   track.label.includes("display")
          // ) {
          //   setRemoteScreenTrack(track);
          // }

          // Handle video and audio tracks
          if (track.kind === "video") {
            setRemoteVideoTrack(track);
            stream.addTrack(track);
          } else if (track.kind === "audio") {
            setRemoteAudioTrack(track);
            stream.addTrack(track);
          }
          console.log("stream: ", stream);
          console.log(remoteMediaStream);
          // Ensure the video plays once a track is added
          console.log("remoteVideoRef.current: ", remoteVideoRef.current);
          remoteVideoRef.current?.play().catch((error) => {
            console.error("Error playing video:", error);
          });

          // Indicate that a remote user has joined
          setRemoteUserJoined(true);
          console.log(remoteUserJoined);
        };

        // Set up ICE candidate handling

        // Save the peer connection in the state

        // Handle SDP exchange

        await pc.setRemoteDescription(remotesdp);
        pc.onicecandidate = async (e) => {
          if (e.candidate) {
            console.log("Sending ICE Candidate...");
            socket.emit("addIceCandidate", {
              roomId,
              candidate: e.candidate,
              type: "receiver",
            });
          }
        };

        const answerSdp = await pc.createAnswer();
        await pc.setLocalDescription(answerSdp);

        console.log("Sending Answer...");
        socket.emit("answer", { roomId, sdp: answerSdp });
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

    socket.on("leave-meeting", async ({ userId }: { userId: string }) => {
      console.log("Other User has left the meeting", userId);

      // Reset remote user states
      setRemoteUserJoined(false); //This will remove the Other User Video from the Screen
      setRemoteVideoTrack(null);
      setRemoteAudioTrack(null);
      setRemoteIsScreenSharing(false);

      // Clean up remote media stream
      setRemoteMediaStream((prevStream) => {
        if (prevStream) {
          prevStream.getTracks().forEach((track) => track.stop());
        }
        return null;
      });

      // Clear the remote video element
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }

      // Reset screen sharing states if applicable
      setRemoteIsScreenSharing(false);

      // Close and reset the receiving peer connection
      setReceivingPC((pc) => {
        if (pc) {
          pc.ontrack = null;
          pc.onicecandidate = null;
          pc.oniceconnectionstatechange = null;
          pc.close();
        }
        return null;
      });
      setRemoteUserJoined(false);
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

      if (screenTrackVideo) {
        screenTrackVideo.stop();
      }
    };
  }, [remoteUserJoined, pinnedVideo]);

  // useEffect(() => {
  //   if (remoteScreenStream && remoteScreenVideoRef.current) {
  //     console.log("Attempting to play remote screen share");
  //     remoteScreenVideoRef.current.srcObject = remoteScreenStream;
  //     remoteScreenVideoRef.current.play()
  //       .then(() => console.log("Remote screen share playing successfully"))
  //       .catch(error => {
  //         console.error("Error playing remote screen:", error);
  //         // Attempt to play without user interaction
  //         if(remoteScreenVideoRef.current){
  //           remoteScreenVideoRef.current.muted = true;
  //           remoteScreenVideoRef.current.play()
  //             .then(() => console.log("Remote screen share playing successfully (muted)"))
  //             .catch(err => console.error("Error playing muted remote screen:", err));
  //         }
  //       });
  //   }
  // }, [remoteScreenStream]);

  useEffect(() => {
    if (socket) {
      socket.on(
        "screen-offer",
        async ({
          roomId,
          sdp,
        }: {
          roomId: string;
          sdp: RTCSessionDescriptionInit;
        }) => {
          try {
            console.log("Received screen-offer");
            const pc = new RTCPeerConnection();
            setRemoteScreenSharePC(pc);

            const stream = new MediaStream();
            setRemoteScreenStream(stream);

            pc.ontrack = (e) => {
              const { track } = e;
              console.log("Received remote screen track", track);

              if (track.kind === "video" || track.kind === "audio") {
                stream.addTrack(track);
                console.log(
                  `Added ${track.kind} track to screen sharing stream`,
                );
              }

              setRemoteScreenStream(stream);
              setRemoteIsScreenSharing(true);

              console.log("setRemoteScreenStream: ", remoteScreenStream);
              console.log("setRemoteIsScreenSharing: ", remoteIsScreenSharing);
              console.log(
                "remoteScreenVideoRef.current: ",
                remoteScreenVideoRef.current,
              );

              if (remoteScreenVideoRef.current) {
                remoteScreenVideoRef.current.srcObject = stream;
                remoteScreenVideoRef.current.play().catch((error) => {
                  console.error("Error playing screen sharing video:", error);
                });
              } else {
                console.error("remoteScreenVideoRef is not available");
              }
            };

            pc.onicecandidate = (e: RTCPeerConnectionIceEvent) => {
              if (e.candidate) {
                socket.emit("screen-ice-candidate", {
                  roomId,
                  candidate: e.candidate,
                  type: "receiver",
                });
              }
            };

            await pc.setRemoteDescription(sdp);
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            socket.emit("screen-answer", { roomId, sdp: answer });
          } catch (error) {
            console.error("Error handling screen offer:", error);
          }
        },
      );

      socket.on("screen-answer", async ({ roomId, sdp }) => {
        try {
          console.log("Got the Answer");
          setSendingScreenSharePC((pc) => {
            pc?.setRemoteDescription(sdp);
            return pc;
          });
          console.log("Screen Share Cycle Completes");
        } catch (error) {
          console.error("Error handling screen answer:", error);
        }
      });

      socket.on(
        "screen-ice-candidate",
        async ({
          candidate,
          type,
        }: {
          candidate: any;
          type: "sender" | "receiver";
        }) => {
          console.log("Received ICE BY", type);
          if (type === "sender") {
            console.log("hello");
            setRemoteScreenSharePC((pc) => {
              if (!pc) {
                console.error("receiving PC not found");
              }
              pc?.addIceCandidate(candidate);
              return pc;
            });
          } else if (type === "receiver") {
            console.log("hello");
            setSendingScreenSharePC((pc) => {
              if (!pc) {
                console.error("sending PC not found");
              }
              pc?.addIceCandidate(candidate);
              return pc;
            });
          }
        },
      );

      socket.on("stop-screen-share", () => {
        console.log("Remote user stopped screen sharing");
        setRemoteIsScreenSharing(false);

        // Close and clean up the remote screen share PC if it exists
        if (remoteScreenSharePC) {
          remoteScreenSharePC.close();
          setRemoteScreenSharePC(null);
        }

        setRemoteScreenStream((prevStream) => {
          if (prevStream) {
            prevStream.getTracks().forEach((track) => track.stop());
          }
          return null;
        });

        // Clear the remote video element
        if (remoteScreenVideoRef.current) {
          remoteScreenVideoRef.current.srcObject = null;
        }

        setRemoteScreenSharePC((pc) => {
          if (pc) {
            pc.ontrack = null;
            pc.onicecandidate = null;
            pc.oniceconnectionstatechange = null;
            pc.close();
          }
          return null;
        });
      });

      // Clean up
      return () => {
        socket.off("screen-offer");
        socket.off("screen-answer");
        socket.off("screen-ice-candidate");
        socket.off("stop-screen-share");
      };
    }
  }, [
    socket,
    meetingId,
    remoteScreenSharePC,
    sendingscreenSharePC,
    isScreenSharing,
    remoteIsScreenSharing,
  ]);

  useEffect(() => {
    console.log("remoteIsScreenSharing:", remoteIsScreenSharing);
    console.log("remoteScreenStream:", remoteScreenStream);
    console.log("remoteScreenVideoRef:", remoteScreenVideoRef.current);
  }, [remoteIsScreenSharing, remoteScreenStream]);

  // useEffect(() => {

  // },[pinnedVideo  ,isScreenSharing ])

  useEffect(() => {
    if (localVideoRef.current && localVideoTrack) {
      localVideoRef.current.srcObject = new MediaStream([localVideoTrack]);
      localVideoRef.current.play();
    }
  }, [localVideoRef, remoteUserJoined, pinnedVideo]);

  useEffect(() => {
    console.log("isScreenSharing: ", isScreenSharing);
    if (
      isScreenSharing &&
      localscreenShareVideoref.current &&
      screenTrackVideo
    ) {
      localscreenShareVideoref.current.srcObject = new MediaStream([
        screenTrackVideo,
      ]);
      localscreenShareVideoref.current
        .play()
        .catch((error) => console.error("Error playing video:", error));
    }
  }, [isScreenSharing, screenTrackVideo, pinnedVideo]);

  // useEffect(() => {
  //   console.log("isScreenSharing:", isScreenSharing);
  //   console.log("screenTrackVideo:", screenTrackVideo);
  //   console.log("localscreenShareVideoref:", localscreenShareVideoref.current);
  // }, [isScreenSharing, screenTrackVideo, remoteUserJoined]);

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  const startScreenShare = async () => {
    if (socket) {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });
        const screenTrackVideo = stream.getVideoTracks()[0];
        const screenTrackAudio = stream.getAudioTracks()[0];

        setScreenTrackVideo(screenTrackVideo);
        setScreenTrackAudio(screenTrackAudio);
        setIsScreenSharing(true);

        // Create a new peer connection for screen sharing
        const screenPC = new RTCPeerConnection();
        setSendingScreenSharePC(screenPC);

        // Add the screen track to the new peer connection
        if (screenTrackVideo) {
          console.log("adding Vide0 Track");
          screenPC.addTrack(screenTrackVideo);
        }
        if (screenTrackAudio) {
          console.log("adding Audi0 Track");
          screenPC.addTrack(screenTrackAudio);
        }
        // Set up ICE candidate handling for the screen share PC

        // Create and send offer for the screen share track

        screenPC.onicecandidate = (e) => {
          console.log("sending Ice from person who SEND offer");
          if (e.candidate) {
            socket.emit("screen-ice-candidate", {
              roomId: meetingId,
              candidate: e.candidate,
              type: "sender",
            });
          }
        };

        screenPC.onnegotiationneeded = async () => {
          //Now we will send Offer to the Other side
          const sdp = await screenPC.createOffer();
          await screenPC.setLocalDescription(sdp);
          socket.emit("screen-offer", { roomId: meetingId, sdp: sdp });
        };
      } catch (error) {
        console.error("Error starting screen sharing:", error);
        setIsScreenSharing(false);
      }
    }
  };
  useEffect(() => {
    if (screenTrackVideo) {
      const handleTrackEnded = () => {
        console.log("Screen sharing track ended");
        stopScreenShare();
      };

      screenTrackVideo.addEventListener("ended", handleTrackEnded);

      return () => {
        screenTrackVideo.removeEventListener("ended", handleTrackEnded);
      };
    }
  }, [screenTrackVideo]);

  // Modify the stopScreenShare function
  const stopScreenShare = () => {
    if (socket && screenTrackVideo) {
      screenTrackVideo.stop();
      setScreenTrackVideo(null);
      setScreenTrackAudio(null);
      setIsScreenSharing(false);

      // Close the screen sharing peer connection
      if (sendingscreenSharePC) {
        sendingscreenSharePC.close();
        setSendingScreenSharePC(null);
      }

      // Notify the server that screen sharing has stopped
      socket.emit("stop-screen-share", { roomId: meetingId });
    }
  };
  const endMeeting = async () => {
    if (socket) {
      socket?.emit("leave-meeting", { userId, meetingId });
      socket?.disconnect();
    }
    setRemoteUserJoined(false);

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
    if (screenTrackVideo) {
      screenTrackVideo.stop();
    }
    router.push("./meeting/end");
  };

  const toggleChat = () => {
    setIsChatBarVisible((prev) => !prev); // Properly toggle the state
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

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      // Example: Detect Ctrl + S (or Command + S on Mac)
      if ((event.ctrlKey || event.metaKey) && event.key === "a") {
        event.preventDefault(); // Prevent the default save action
        // You can trigger your custom logic here
        toggleAudio();
      }
      if ((event.ctrlKey || event.metaKey) && event.key === "v") {
        event.preventDefault(); // Prevent the default save action
        // You can trigger your custom logic here
        toggleVideo();
      }
      if ((event.ctrlKey || event.metaKey) && event.key === "e") {
        event.preventDefault(); // Prevent the default save action
        // You can trigger your custom logic here
        endMeeting();
      }
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault(); // Prevent the default save action
        // You can trigger your custom logic here

        if (isScreenSharing) {
          stopScreenShare();
        }
        startScreenShare();
      }
      if ((event.ctrlKey || event.metaKey) && event.key === "c") {
        event.preventDefault(); // Prevent the default save action
        // You can trigger your custom logic here
        toggleChat();
      }
    };

    // Add event listener for keydown
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);


  const renderVideo = (
    index: number,
    reference: RefObject<HTMLVideoElement>,
    title: string,
  ) => {
    const isPipAvailable = "pictureInPictureEnabled" in document;

    if (title === "Remote Screen Share" && !remoteIsScreenSharing) {
      return null; // Don't render anything if screen sharing has stopped
    } else if (
      title == "Your Screen Share" &&
      !isScreenSharing &&
      !screenTrackVideo
    ) {
      return null;
    } else if (title == "Remote Video" && !remoteUserJoined) {
      return null;
    }

    if (title == "Remote Screen Share") {
      console.log("reference of ", title, reference?.current?.srcObject);
      console.log("remoteScreenStream: ", remoteScreenStream);
      // If srcObject is null, try setting it again
      if (
        reference?.current &&
        !reference.current.srcObject &&
        remoteScreenStream
      ) {
        reference.current.srcObject = remoteScreenStream;
      }
    }
    const toggleFullScreen = (e: React.MouseEvent) => {
      e.stopPropagation();
      const videoElement = reference.current;
      if (!videoElement) return;

      if (!document.fullscreenElement) {
        if (videoElement.requestFullscreen) {
          videoElement.requestFullscreen();
        } else if ((videoElement as any).webkitRequestFullscreen) {
          // Safari
          (videoElement as any).webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          // Safari
          (document as any).webkitExitFullscreen();
        }
      }

      setIsFullScreen(!isFullScreen);
    };
    const getVideoRefByIndex = (
      index: number,
    ): RefObject<HTMLVideoElement> | null => {
      switch (index) {
        case 0:
          return localVideoRef;
        case 1:
          return remoteVideoRef;
        case 2:
          return localscreenShareVideoref;
        case 3:
          return remoteScreenVideoRef;
        default:
          return null;
      }
    };

    const togglePictureInPicture = async (index: number) => {
      const videoElement = getVideoRefByIndex(index)?.current;
      if (!videoElement) return;

      try {
        if (pipActiveIndex !== index) {
          if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
          }
          await videoElement.requestPictureInPicture();
          setPipActiveIndex(index);
        } else {
          if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
          }
          setPipActiveIndex(null);
        }
      } catch (error) {
        console.error("Failed to toggle picture-in-picture mode:", error);
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        key={`video-container-${index}`}
        className={`relative overflow-hidden rounded-lg border border-neutral-400 dark:border-neutral-700 ${
          pinnedVideo === index
            ? "h-1/2 w-full sm:h-full sm:w-4/5" /*For the Pinned Video*/
            : `${
                pinnedVideo == null
                  ? "h-full w-[85%] sm:w-full" /*For the Normal Videos*/
                  : "h-full w-[45%] sm:w-full sm:h-1/3 " /*For the Videos which are not pinned But another Video is Pinned*/
              }`
        }`}
        onClick={() => togglePinTab(index)}
      >
        <video
          ref={reference}
          autoPlay
          playsInline
          controls={false} // Add this line
          className="absolute inset-0 h-full w-full object-cover"
        />
        <motion.div className="absolute bottom-2 left-2 rounded bg-black bg-opacity-50 px-2 py-1 text-sm text-white">
          {title}
        </motion.div>
        {selectPinTabs[index] && (
          <motion.div className="absolute left-1/2 top-1/2 flex min-w-28 -translate-x-1/2 -translate-y-1/2 transform items-center justify-between rounded-e-full rounded-s-full bg-black p-2 opacity-40 transition-opacity duration-700 dark:bg-neutral-500 dark:opacity-50">
            <motion.div
              className="cursor-pointer rounded-full text-white opacity-60 hover:bg-v0dark hover:dark:bg-neutral-400 hover:dark:opacity-95"
              onClick={(e) => {
                e.stopPropagation(); //The above motion.Div has also a On click Event , So it willn't Trigger the Onclick event of Parent Element
                handlePin(index);
              }}
            >
              {pinnedVideo === index ? (
                <PinOff className="m-2 size-5 text-white sm:size-6" />
              ) : (
                <Pin className="m-2 size-5 text-white sm:size-6" />
              )}
            </motion.div>
            <motion.div
              className="cursor-pointer rounded-full text-white opacity-60 hover:bg-v0dark hover:dark:bg-neutral-400 hover:dark:opacity-95"
              onClick={toggleFullScreen}
            >
              <Fullscreen className="m-2 size-5 text-white sm:size-6" />
            </motion.div>
            {isPipAvailable && (
              <motion.div
                className="cursor-pointer rounded-full text-white opacity-60 hover:bg-v0dark hover:dark:bg-neutral-400 hover:dark:opacity-95"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePictureInPicture(index);
                }}
              >
                {pipActiveIndex === index ? (
                  <PictureInPicture className="m-2 size-5 text-white sm:size-6" />
                ) : (
                  <PictureInPicture2 className="m-2 size-5 text-white sm:size-6" />
                )}
              </motion.div>
            )}

            <motion.div className="cursor-pointer rounded-full text-white opacity-60 hover:bg-v0dark hover:dark:bg-neutral-400 hover:dark:opacity-95">
              <EllipsisVertical className="m-2 size-5 text-white sm:size-6" />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="flex h-[85%] w-full rounded-xl from-neutral-900 via-black to-neutral-900 dark:bg-gradient-to-r sm:h-[92%]">
      <div className="flex h-full w-full flex-1 flex-col items-center justify-between p-1 pb-2">
        {/* {remoteUserJoined ? ( */}
        <div className="flex h-full w-full flex-col gap-1 sm:flex-row">
          {pinnedVideo !== null ? (
            <>
              {renderVideo(
                pinnedVideo,
                pinnedVideo === 0
                  ? localVideoRef
                  : pinnedVideo === 1
                    ? remoteVideoRef
                    : pinnedVideo === 2
                      ? localscreenShareVideoref
                      : remoteScreenVideoRef,
                pinnedVideo === 0
                  ? "Your Video"
                  : pinnedVideo === 1
                    ? "Remote Video"
                    : pinnedVideo === 2
                      ? "Your Screen Share"
                      : "Remote Screen Share",
              )}
              <div className="ml-2 flex h-1/2 flex-col items-center gap-1 sm:h-full sm:w-1/5">
                {[0, 1, 2, 3]
                  .filter((i) => i !== pinnedVideo)
                  .map((index) => {
                    {
                      /*Selecting Video Ref*/
                    }
                    const videoRef =
                      index === 0
                        ? localVideoRef
                        : index === 1
                          ? remoteVideoRef
                          : index === 2
                            ? localscreenShareVideoref
                            : remoteScreenVideoRef;

                    {
                      /*Selecting Video title*/
                    }
                    const title =
                      index === 0
                        ? "Your Video"
                        : index === 1
                          ? "Remote Video"
                          : index === 2
                            ? "Your Screen Share"
                            : "Remote Screen Share";
                    return renderVideo(index, videoRef, title);
                  })}
              </div>
            </>
          ) : (
            <div
              className={`flex h-full w-full flex-col items-center gap-3 pt-2 sm:grid ${
                (isScreenSharing && screenTrackVideo) ||
                remoteIsScreenSharing ||
                remoteUserJoined
                  ? "sm:grid-cols-2"
                  : "sm:grid-cols-1"
              } sm:pt-0`}
            >
              {localVideoTrack && renderVideo(0, localVideoRef, "Your Video")}
              {remoteUserJoined &&
                renderVideo(1, remoteVideoRef, "Remote Video")}
              {isScreenSharing &&
                screenTrackVideo &&
                renderVideo(2, localscreenShareVideoref, "Your Screen Share")}
              {remoteIsScreenSharing &&
                renderVideo(3, remoteScreenVideoRef, "Remote Screen Share")}
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
                shortcut="Ctrl A"
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
                shortcut="Ctrl V"
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
                shortcut="Ctrl E"
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
                shortcut="Ctrl S"
                name="ScreenShare"
                onClick={isScreenSharing ? stopScreenShare : startScreenShare}
              >
                {isScreenSharing ? (
                  <ScreenShareOff
                    strokeWidth={1.7}
                    className="size-4 lg:size-5 xl:size-6"
                  />
                ) : (
                  <ScreenShare
                    strokeWidth={1.7}
                    className="size-4 lg:size-5 xl:size-6"
                  />
                )}
              </ButtonsDock>
            </DockIcon>
            <DockIcon>
              <ButtonsDock shortcut="Ctrl C" name="Chat" onClick={toggleChat}>
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
              className={`${!permissionToChat ? "cursor-not-allowed opacity-60" : ""} flex-1 resize-none rounded-lg text-white focus:border-none focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:text-black`}
              onChange={(e) => {
                if (permissionToChat) {
                  setMessage(e.target.value);
                }
              }}
              value={message}
              readOnly={!permissionToChat}
              onKeyDown={(e) => {
                //Like when Clicked on Enter the message will be Sent
                if (e.key === "Enter" && permissionToChat && message.trim()) {
                  e.preventDefault(); // Prevents adding a new line
                  messageHandler(
                    e,
                    session.data?.user.name || "",
                    session.data?.user.id || "",
                    session.data?.user.userImage,
                  );
                }
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-neutral-700 dark:hover:bg-neutral-200"
            >
              <Send
                className="size-5 text-white dark:text-black"
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
const formattedTime = new Date().toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

const ChatStructure: React.FC<{ data: Chat }> = ({ data }) => {
  const session = useSession();
  return (
    <div className="">
      {data.userId === session.data?.user.id ? (
        <div className="flex items-start justify-end gap-2">
          <div className="min-w-32 rounded-lg rounded-br-none bg-white p-4 text-base text-black dark:bg-black dark:text-white">
            <p className="break-words break-all">{data.message}</p>
            <div className="mt-1 text-xs">2:35 PM</div>
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
            classname="size-8 shadow-sm  bg-neutral-200 text-sm  text-black border border-black"
            photo={data.userImage}
          />
          <div className="min-w-32 rounded-lg rounded-bl-none bg-[#272729] p-4 text-base text-[#e2e8f0] dark:bg-[#f4f4f4] dark:text-black">
            <p className="break-words break-all">{data.message}</p>
            <div className="mt-1 text-xs text-white dark:text-black">
              2:36 PM
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
