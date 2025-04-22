"use client";
import { motion } from "framer-motion";
import {
  Check,
  CheckCheck,
  EllipsisVertical,
  Fullscreen,
  MessageSquare,
  MessageSquareOff,
  MicIcon,
  MicOffIcon,
  PhoneIcon,
  PictureInPicture,
  PictureInPicture2,
  Pin,
  PinOff,
  ScreenShare,
  ScreenShareOff,
  Send,
  UserCircle,
  Video,
  VideoOff,
  X
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RefObject, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { Dock, DockIcon } from "../../../@/components/magicui/dock";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../@/components/ui/avatar";
import { Textarea } from "../../../@/components/ui/textarea";
import { Button } from "../ui/button";
import ButtonsDock from "./Buttons-dock";
// const URL = "http://localhost:3003";
const URL = "wss://skizifywsserver-production.up.railway.app";


export interface Chat {
  id : number;
  message: string;
  name: string;
  userId: string;
  userImage?: string;
  messageTime : string;
  seenStatus : boolean;
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
  // console.log("localVideoTrack: ", localVideoTrack);
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


  // const [videoLayouts, setVideoLayouts] = useState<{
  //   refs: {
  //     [key: number]: React.RefObject<HTMLVideoElement>;
  //   };
  //   streams: {
  //     [key: number]: MediaStream | null;
  //   };
  // }>({
  //   refs: {
  //     0: localVideoRef,
  //     1: remoteVideoRef,
  //     2: localscreenShareVideoref,
  //     3: remoteScreenVideoRef
  //   },
  //   streams: {
  //     0: localVideoTrack ? new MediaStream([localVideoTrack]) : null,
  //     1: remoteMediaStream,
  //     2: screenTrackVideo ? new MediaStream([screenTrackVideo]) : null,
  //     3: remoteScreenStream
  //   }
  // });
  

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
        // console.log("stream: ", stream);

        // Attach stream to video element if reference exists
        // console.log("remoteVideoRef.current: ", remoteVideoRef.current);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
          // console.log(
          //   "remoteVideoRef.current: ",
          //   remoteVideoRef.current.srcObject,
          // );
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
          // console.log("stream: ", stream);
          // console.log(remoteMediaStream);
          // Ensure the video plays once a track is added
          // console.log("remoteVideoRef.current: ", remoteVideoRef.current);
          remoteVideoRef.current?.play().catch((error) => {
            console.error("Error playing video:", error);
          });

          // Indicate that a remote user has joined
          setRemoteUserJoined(true);
          // console.log(remoteUserJoined);
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

        // console.log("Sending Answer...");
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
        // console.log("Received ICE BY", type);
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

    //Socket When a Message Comes to the Backend
    socket.on("receive-message", (data: Chat) => {
      console.log("Bro I got something from the Backend", data);
      console.log("isChatBarVisible: ", isChatBarVisible);
      if(!isChatBarVisible){ // Jugaad Lagaya hai bhai yaha pe
        console.log("Bro I am calling the updateMessagesSeen");
          updateMessagesSeen();
          console.log("I have called the function ");
      }
      setMessages((messages: Chat[]) => [...messages, data]);
      // If chat bar is visible, mark message as seen immediately
    });

    socket.on("messages-seen-update", ({ seenStatus } : {seenStatus : boolean}) => {
      // Update all messages sent by current user to seen
      setMessages(prevMessages => 
        prevMessages.map(message => ({
          ...message,
          seenStatus: true
        }))
      );
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
  }, [remoteUserJoined]);

  // useEffect(() => {
  //   if (remoteScreenStream && remoteScreenVideoRef.current) {
      // console.log("Attempting to play remote screen share");
  //     remoteScreenVideoRef.current.srcObject = remoteScreenStream;
  //     remoteScreenVideoRef.current.play()
        // .then(() => console.log("Remote screen share playing successfully"))
  //       .catch(error => {
  //         console.error("Error playing remote screen:", error);
  //         // Attempt to play without user interaction
  //         if(remoteScreenVideoRef.current){
  //           remoteScreenVideoRef.current.muted = true;
  //           remoteScreenVideoRef.current.play()
              // .then(() => console.log("Remote screen share playing successfully (muted)"))
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
            // console.log("Received screen-offer");
            const pc = new RTCPeerConnection();
            setRemoteScreenSharePC(pc);

            const stream = new MediaStream();
            setRemoteScreenStream(stream);

            pc.ontrack = (e) => {
              const { track } = e;
              // console.log("Received remote screen track", track);

              if (track.kind === "video" || track.kind === "audio") {
                stream.addTrack(track);
                // console.log(
                //   `Added ${track.kind} track to screen sharing stream`,
                // );
              }

              setRemoteScreenStream(stream);
              setRemoteIsScreenSharing(true);

              // console.log("setRemoteScreenStream: ", remoteScreenStream);
              // console.log("setRemoteIsScreenSharing: ", remoteIsScreenSharing);
              // console.log(
              //   "remoteScreenVideoRef.current: ",
              //   remoteScreenVideoRef.current,
              // );

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

  // useEffect(() => {
  //   console.log("remoteIsScreenSharing:", remoteIsScreenSharing);
  //   console.log("remoteScreenStream:", remoteScreenStream);
  //   console.log("remoteScreenVideoRef:", remoteScreenVideoRef.current);
  // }, [remoteIsScreenSharing, remoteScreenStream]);

  // useEffect(() => {

  // },[pinnedVideo  ,isScreenSharing ])

  useEffect(() => {
    if (localVideoRef.current && localVideoTrack) {
      localVideoRef.current.srcObject = new MediaStream([localVideoTrack]);
      localVideoRef.current.play();
    }
  }, [localVideoRef, remoteUserJoined]);

  useEffect(() => {
    // console.log("isScreenSharing: ", isScreenSharing);
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
  }, [isScreenSharing, screenTrackVideo]);

  // useEffect(() => {
    // console.log("isScreenSharing:", isScreenSharing);
    // console.log("screenTrackVideo:", screenTrackVideo);
    // console.log("localscreenShareVideoref:", localscreenShareVideoref.current);
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
          // console.log("adding Vide0 Track");
          screenPC.addTrack(screenTrackVideo);
        }
        if (screenTrackAudio) {
          // console.log("adding Audi0 Track");
          screenPC.addTrack(screenTrackAudio);
        }
        // Set up ICE candidate handling for the screen share PC

        // Create and send offer for the screen share track

        screenPC.onicecandidate = (e) => {
          // console.log("sending Ice from person who SEND offer");
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
        // console.log("Screen sharing track ended");
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

    // Get current path
    const currentPath = window.location.pathname;
    
    // Check if path starts with instant-meeting or meeting
    if (currentPath.startsWith('/instant-meeting/')) {
      router.push('./instant-meeting/end');
    } else if (currentPath.startsWith('/meeting/')) {
      router.push('./meeting/end');
    }
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
  //This will send the message to the backend
  const messageHandler = (
    e: any,
    name: string,
    userId: string,
    seenStatus: boolean,
    userImage?: string
  ) => {
    e.preventDefault();
    console.log(message);
    //Here we have to implement Zod
    if (message === "") {
      return;
    }
    let incrementMessageId = 0;
    if (messages && messages.length > 0) {
      incrementMessageId = messages[messages.length - 1]?.id ?? 0;
    }
    incrementMessageId++;
    //I also have to send the Time of Message
    const messageTime = new Date().toISOString();
    // Set initial seenStatus based on whether receiver's chat is open
    socket?.emit("send-message", {incrementMessageId , message, name, userImage, userId, messageTime , seenStatus: false });
    // Clear the message input after sending
    setMessage("");
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

  const toggleVideo = () => {
    if (localVideoTrack) {
      // The logic for toggling the video track's enabled state is correct
      localVideoTrack.enabled = !localVideoTrack.enabled;
      setIsVideoMuted(!localVideoTrack.enabled); //Video Muted Nahi hai

      if (localVideoRef.current) {
        // This part could be simplified since MediaStream tracks are live
        // When enabled=false, the track will automatically show black frames
        // No need to create new MediaStream or set srcObject to null
        if (!localVideoRef.current.srcObject) {
          localVideoRef.current.srcObject = new MediaStream([localVideoTrack]);
          localVideoRef.current.play();
        }
      }
    }
  };

  

  // const handlePin = (index: number) => {
  //   // Only update the layout state without affecting the connections
  //   console.log("I ahave been CLICKED");
  //   setPinnedVideo((prevPinned) => {
  //     const newPinnedState = prevPinned === index ? null : index;
      
  //     // Ensure all existing connections and streams remain intact
  //     Object.entries(videoLayouts.streams).forEach(([streamIndex, stream]) => {
  //       if (stream) {
  //         const ref = videoLayouts.refs[parseInt(streamIndex)]?.current;
  //         if (ref && !ref.srcObject) {
  //           ref.srcObject = stream;
  //           ref.play().catch(err => console.error("Error playing video:", err));
  //         }
  //       }
  //     });
      
  //     return newPinnedState;
  //   });
  // };

  const renderVideo = (
    index: number,
    reference: RefObject<HTMLVideoElement>,
    title: string,
  ) => {
    const isPipAvailable = "pictureInPictureEnabled" in document;
    // console.log("reference: ", index);

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
      // console.log("reference of ", title, reference?.current?.srcObject);
      // console.log("remoteScreenStream: ", remoteScreenStream);
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
                  : "h-full w-[45%] sm:h-1/3 sm:w-full" /*For the Videos which are not pinned But another Video is Pinned*/
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

  const updateMessagesSeen = () => {
    // Get all messages that are not seen and not from current user
      // Emit socket event to update seen status on other clients
      console.log("Hallo I have been Called");
      socket?.emit("update-messages-seen", {
        seenStatus: true,
      });

      // Update all unseen messages to seen in local state
      setMessages(prevMessages => 
        prevMessages.map(message => ({
          ...message,
          seenStatus: message.userId !== session.data?.user.id ? true : message.seenStatus
        }))
      );
  };

  
  return (
    <div className="flex h-[calc(100vh-120px)] w-full rounded-xl from-neutral-900 via-black to-neutral-900 dark:bg-gradient-to-r">
      <div className="flex h-full w-full flex-1 flex-col items-center justify-between p-1 pb-2">
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
              <div className="ml-2 flex h-full flex-col items-center gap-1 sm:w-1/5">
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
              <ButtonsDock 
                shortcut="Ctrl C" 
                name="Chat" 
                onClick={() => {
                  toggleChat();
                  // Mark messages as seen when chat is opened
                  if (!isChatBarVisible && messages.some(m => !m.seenStatus && m.userId !== session.data?.user.id)) {
                    updateMessagesSeen();
                  }
                }}
              >
                <div className="relative">
                  {!isChatBarVisible && messages.some(m => !m.seenStatus && m.userId !== session.data?.user.id) && (
                    <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-black animate-pulse dark:bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.7)]" />
                  )}
                  {isChatBarVisible ? (
                    <MessageSquareOff
                      strokeWidth={1.7}
                      className="size-4 lg:size-5 xl:size-6 dark:text-white/90"
                    />
                  ) : (
                    <MessageSquare
                      strokeWidth={1.7} 
                      className="size-4 lg:size-5 xl:size-6 dark:text-white/90"
                    />
                  )}
                </div>
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
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 dark:border-white/70 bg-black shadow-[0_0_30px_rgba(255,255,255,0.1)] backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-white/60 dark:border-white/10 px-6 py-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="size-5 text-white/70" />
              <div className="text-lg font-semibold text-white/90">
                Chat Room
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-white/10"
              onClick={() => setIsChatBarVisible(false)}
            >
              <X className="size-5 text-white/70" />
            </Button>
          </div>
          <div 
            className="no-scrollbar flex-1 overflow-y-auto p-4 pt-6 max-h-[calc(100vh-300px)]"
            style={{
              overflowY: messages.length > 4 ? 'auto' : 'visible',
              minHeight: '200px'
            }}
            onScroll={(e) => {
              console.log("Yeah i AM CALLED , ON SCROLL");
              if (messages.some(m => !m.seenStatus && m.userId !== session.data?.user.id)) {
                updateMessagesSeen();
              }
            }}
          >
            <div className="space-y-6">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center space-y-3 py-10 text-center">
                  <MessageSquareOff className="size-12 text-white" />
                  <p className="text-white/50">No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((data: Chat, index: any) => (
                  <div key={index}>
                    <ChatStructure data={data} />
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="border-t border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Textarea
                placeholder={`${!permissionToChat ? "Chat is disabled, waiting for others to join..." : "Type a message..."}`}
                className={`${
                  !permissionToChat ? "cursor-not-allowed opacity-60" : ""
                } flex-1 resize-none rounded-xl border-white/20 bg-black/50 text-white placeholder:text-white/40 focus:border-white/30 focus:ring-1 focus:ring-white/30 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]`}
                onChange={(e) => {
                  if (permissionToChat) {
                    setMessage(e.target.value);
                  }
                }}
                value={message}
                readOnly={!permissionToChat}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && permissionToChat && message.trim()) {
                    e.preventDefault();
                    messageHandler(
                      e,
                      session.data?.user.name || "",
                      session.data?.user.id || "",
                      false,
                      session.data?.user.userImage,
                    );
                  }
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                disabled={!message.trim() || !permissionToChat}
                className={`rounded-xl ${
                  message.trim() && permissionToChat
                    ? "bg-white/90 hover:bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    : "bg-white/20"
                }`}
                onClick={(e) =>
                  messageHandler(
                    e,
                    session.data?.user.name || "",
                    session.data?.user.id || "",
                    false,
                    session.data?.user.userImage,
                  )
                }
              >
                <Send className="size-5 text-black" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


const ChatStructure: React.FC<{ data: Chat }> = ({ data }) => {
  const session = useSession();

  return (
    <div>
      {data.userId === session.data?.user.id ? (
        <div className="flex items-end justify-end gap-3">
          <div className="group relative max-w-[85%] space-y-1">
            <div className="rounded-2xl rounded-br-sm bg-white/90 p-4 text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-white transition-all">
              <p className="break-words text-[15px] leading-relaxed">{data.message}</p>
            </div>
            <div className="flex items-center justify-end gap-2">
              <span className="text-xs text-white/50">{new Date(data.messageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span className="text-xs text-white/70">
                {data.seenStatus ? (
                  <div className="flex items-center">
                    <CheckCheck className="size-4 text-blue-400" />
                  </div>
                ) : (
                  <Check className="size-4 text-gray-400" />
                )}
              </span>
            </div>
          </div>
          <Avatar className="h-8 w-8 ring-2 ring-white/30 transition-transform hover:scale-110 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            <AvatarImage
              src={data.userImage}
              alt={data.name}
              className="rounded-full object-cover"
            />
            <AvatarFallback className="bg-white/10 text-sm font-medium text-white">
              {data.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <div className="flex items-end gap-3">
          <Avatar className="h-8 w-8 ring-2 ring-white/30 transition-transform hover:scale-110 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            <AvatarImage
              src={data.userImage}
              alt={data.name}
              className="rounded-full object-cover"
            />
            <AvatarFallback className="bg-white/10 text-sm font-medium text-white">
              {data.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="group relative max-w-[85%] space-y-1">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-white/50">{data.name}</span>
              <div className="rounded-2xl rounded-bl-sm bg-white/20 p-4 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-white/30 transition-all">
                <p className="break-words text-[15px] leading-relaxed">{data.message}</p>
              </div>
            </div>
            <div className="flex justify-start">
              <span className="text-xs text-white/50">{new Date(data.messageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
