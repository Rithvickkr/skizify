"use client";
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
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { Dock, DockIcon } from "../../../@/components/magicui/dock";
import { Textarea } from "../../../@/components/ui/textarea";
import { Button } from "../ui/button";
import ButtonsDock from "./Buttons-dock";
import { Avatar } from "../../../@/components/ui/avatar";
import { Chat } from "./Room";

export default function VideoPlatform() {
  const [pinnedVideo, setPinnedVideo] = useState<number | null>(null);
  const [selectPinTabs, setSelectPinTabs] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isChatBarVisible, setIsChatBarVisible] = useState(false);
  const [remoteUserJoined, setRemoteUserJoined] = useState(true);

  // useEffect(() => {
  //   selectPinTabs.forEach((isSelected, index) => {
  //     if (isSelected) {
  //       const timer = setTimeout(() => {
  //         setSelectPinTabs((prev) => {
  //           const newState = [...prev];
  //           newState[index] = false;
  //           return newState;
  //         });
  //       }, 4000);

  //       return () => clearTimeout(timer);
  //     }
  //   });
  // }, [selectPinTabs]);

  function togglePinTab(index: number) {
    setSelectPinTabs((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  }

  function handlePin(index: number) {
    setPinnedVideo((prevPinned) => (prevPinned === index ? null : index));
  }

  const renderVideo = (index: number) => (
    <div
      className={`relative 
        overflow-hidden rounded-lg border border-neutral-400 dark:border-neutral-700
        ${pinnedVideo === index ? 
          "h-1/2 w-full sm:h-full sm:w-4/5"
          : 
          `${pinnedVideo == null ? "h-full w-[65%] sm:w-full" : "h-full w-[45%] sm:w-full"}`} 

      `}
      onClick={() => togglePinTab(index)}
    >
      {/* <video
        autoPlay
        className="absolute inset-0 h-full w-full object-cover"
      /> */}
      <div>{index}</div>
      {selectPinTabs[index] && (
        <div className="absolute left-1/2 top-1/2 flex min-w-28 -translate-x-1/2 -translate-y-1/2 transform items-center justify-between rounded-e-full rounded-s-full bg-black p-2 opacity-40 transition-opacity duration-700 dark:bg-neutral-500 dark:opacity-50">
          {pinnedVideo === index ? (
            <div
              className="cursor-pointer rounded-full text-white opacity-60 hover:bg-v0dark hover:dark:bg-neutral-400 hover:dark:opacity-95"
              onClick={() => handlePin(index)}
            >
              <PinOff className="m-2 size-5 text-white sm:size-6" />
            </div>
          ) : (
            <div
              className="cursor-pointer rounded-full text-white opacity-60 hover:bg-v0dark hover:dark:bg-neutral-400 hover:dark:opacity-95"
              onClick={() => handlePin(index)}
            >
              <Pin className="m-2 size-5 text-white sm:size-6" />
            </div>
          )}
          <div className="cursor-pointer rounded-full text-white opacity-60 hover:bg-v0dark hover:dark:bg-neutral-400 hover:dark:opacity-95">
            <EllipsisVertical className="m-2 size-5 text-white sm:size-6" />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-[85%] w-full rounded-xl from-neutral-900 via-black to-neutral-900 dark:bg-gradient-to-r sm:h-[92%]">
      <div className="flex h-full w-full flex-1 flex-col items-center justify-between p-1 pb-2 sm:p-3">
        {remoteUserJoined ? (
          <div className="flex h-full w-full flex-col gap-2 sm:flex-row">
            {pinnedVideo !== null ? (
              <>
                {renderVideo(pinnedVideo)} {/*  h-1/2 w-full sm:h-full sm:w-4/5 */}
                <div className="ml-2 flex h-1/2 flex-col items-center gap-1 sm:h-full sm:w-1/5">
                  {[0, 1, 2, 3]
                    .filter((i) => i !== pinnedVideo)
                    .map(renderVideo)} {/* h-full w-[50%] sm:w-full */}
                </div>
              </>
            ) : (
              <div className="flex h-full w-full flex-col items-center gap-3 pt-2 sm:grid sm:grid-cols-2 sm:pt-0">
                {renderVideo(0)}
                {renderVideo(1)}
                {renderVideo(2)}
                {renderVideo(3)}
              </div>
            )}
          </div>
        ) : (
          <div className="relative h-full w-full overflow-hidden rounded-xl border border-neutral-400 dark:border-neutral-700">
            <video
              autoPlay
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        )}

        <div className="">
          <Dock
            direction="middle"
            className="gap-7 rounded-md dark:border-neutral-800"
          >
            <DockIcon>
              <ButtonsDock name={isAudioMuted ? "Unmute" : "Mute"}>
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
              <ButtonsDock name={isVideoMuted ? "Start Video" : "Stop Video"}>
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
              >
                <PhoneIcon
                  strokeWidth={1.7}
                  className="size-4 lg:size-5 xl:size-6"
                />
              </ButtonsDock>
            </DockIcon>
            <DockIcon>
              <ButtonsDock name="ScreenShare">
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
        className={`${
          isChatBarVisible ? "block" : "hidden"
        } flex h-full flex-col overflow-hidden rounded-xl border bg-mediumdark transition-all duration-500 ease-in-out dark:border-1 dark:border-neutral-800 dark:bg-white lg:w-3/12`}
      >
        <div className="flex items-center justify-between px-4 py-3 dark:border-neutral-700">
          <div className="text-lg font-medium text-white opacity-70 dark:text-v0dark">
            Chat
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
        <div className="no-scrollbar h-64 flex-1 overflow-y-auto p-2 pt-4">
          <div className="space-y-4">{/* <div ref={messagesEndRef} /> */}</div>
        </div>
        <div className="flex items-center gap-2 border-t p-4 dark:border-neutral-700">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-neutral-700 dark:hover:bg-neutral-500"
          >
            <Send className="size-5 text-white" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------

// export function videoPlatform() {
//   const [SelectPintab, setSelectPintab] = useState<boolean>(false);
//   const [isAudioMuted, setIsAudioMuted] = useState(false);
//   const [isVideoMuted, setIsVideoMuted] = useState(false);
//   const [isChatBarVisible, setIsChatBarVisible] = useState(false);
//   const [remoteUserJoined, setRemoteUserJoined] = useState(true);

//   const [pinnedVideo, setPinnedVideo] = useState<number | null>(null);
//   const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

//   const videos = ["Video 1", "Video 2", "Video 3", "Video 4"];

//   const handlePin = (index: number) => {
//     setPinnedVideo(index === pinnedVideo ? null : index);
//   };

//   const toggleChat = () => {
//     setIsChatOpen(!isChatOpen);
//   };
//   useEffect(() => {
//     if (SelectPintab) {
//       const timer = setTimeout(() => {
//         setSelectPintab(false);
//       }, 4000);

//       // Cleanup to clear the timeout if component unmounts or state changes
//       return () => clearTimeout(timer);
//     }
//   }, [SelectPintab]);

//   function TogglePintab() {
//     setSelectPintab((prevState) => !prevState);
//   }

//   return (
//     <div className="flex h-[85%] w-full rounded-xl from-neutral-900 via-black to-neutral-900 dark:bg-gradient-to-r md:h-[92%]">
//       <div className="flex h-full w-full flex-1 flex-col items-center justify-between p-1 pb-2 md:p-3">
//         {remoteUserJoined ? (
//           <div className="grid h-full w-[65%] grid-cols-1 gap-y-1 md:w-full md:grid-cols-2 md:gap-3">
//             <div
//               className="relative h-full w-full overflow-hidden rounded-xl border border-neutral-400 dark:border-neutral-700"
//               onClick={() => TogglePintab()}
//             >
//               <video
//                 autoPlay
//                 className="absolute inset-0 h-full w-full object-cover"
//               />
//               {SelectPintab && (
//                 <div className="absolute left-1/2 top-1/2 flex min-w-28 -translate-x-1/2 -translate-y-1/2 transform items-center justify-between rounded-e-full rounded-s-full bg-black p-2 opacity-40 transition-opacity duration-700 dark:opacity-50">
//                   <div className="cursor-pointer rounded-full text-white hover:bg-v0dark">
//                     <Pin className="m-2 size-5 md:size-6" />
//                   </div>
//                   <div className="cursor-pointer rounded-full text-white hover:bg-v0dark">
//                     <EllipsisVertical className="m-2 size-5 md:size-6" />
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div
//               className="relative h-full w-full overflow-hidden rounded-xl border border-neutral-400 dark:border-neutral-700"
//               onClick={() => TogglePintab()}
//             >
//               <video
//                 autoPlay
//                 className="absolute inset-0 h-full w-full object-cover"
//               />
//               {SelectPintab && (
//                 <div className="absolute left-1/2 top-1/2 flex min-w-28 -translate-x-1/2 -translate-y-1/2 transform items-center justify-between rounded-e-full rounded-s-full bg-black p-2 opacity-40 transition-opacity duration-700 dark:opacity-50">
//                   <div className="cursor-pointer rounded-full text-white hover:bg-v0dark">
//                     <Pin className="m-2 size-5 md:size-6" />
//                   </div>
//                   <div className="cursor-pointer rounded-full text-white hover:bg-v0dark">
//                     <EllipsisVertical className="m-2 size-5 md:size-6" />
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div
//               className="relative h-full w-full overflow-hidden rounded-xl border border-neutral-400 dark:border-neutral-700"
//               onClick={() => TogglePintab()}
//             >
//               <video
//                 autoPlay
//                 className="absolute inset-0 h-full w-full object-cover"
//               />
//               {SelectPintab && (
//                 <div className="absolute left-1/2 top-1/2 flex min-w-28 -translate-x-1/2 -translate-y-1/2 transform items-center justify-between rounded-e-full rounded-s-full bg-black p-2 opacity-40 transition-opacity duration-700 dark:opacity-50">
//                   <div className="cursor-pointer rounded-full text-white hover:bg-v0dark">
//                     <Pin className="m-2 size-5 md:size-6" />
//                   </div>
//                   <div className="cursor-pointer rounded-full text-white hover:bg-v0dark">
//                     <EllipsisVertical className="m-2 size-5 md:size-6" />
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div
//               className="relative h-full w-full overflow-hidden rounded-xl border border-neutral-400 dark:border-neutral-700"
//               onClick={() => TogglePintab()}
//             >
//               <video
//                 autoPlay
//                 className="absolute inset-0 h-full w-full object-cover"
//               />
//               {SelectPintab && (
//                 <div className="absolute left-1/2 top-1/2 flex min-w-28 -translate-x-1/2 -translate-y-1/2 transform items-center justify-between rounded-e-full rounded-s-full bg-black p-2 opacity-40 transition-opacity duration-700 dark:opacity-50">
//                   <div className="cursor-pointer rounded-full text-white hover:bg-v0dark">
//                     <Pin className="m-2 size-5 md:size-6" />
//                   </div>
//                   <div className="cursor-pointer rounded-full text-white hover:bg-v0dark">
//                     <EllipsisVertical className="m-2 size-5 md:size-6" />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className="relative h-full w-full overflow-hidden rounded-xl border border-neutral-400 dark:border-neutral-700">
//             <video
//               autoPlay
//               className="absolute inset-0 h-full w-full object-cover"
//             />
//           </div>
//         )}

//         <div className="">
//           <Dock
//             direction="middle"
//             className="gap-7 rounded-md dark:border-neutral-800"
//           >
//             <DockIcon>
//               <ButtonsDock name={isAudioMuted ? "Unmute" : "Mute"}>
//                 {isAudioMuted ? (
//                   <MicOffIcon
//                     strokeWidth={1.7}
//                     className="size-4 lg:size-5 xl:size-6"
//                   />
//                 ) : (
//                   <MicIcon
//                     strokeWidth={1.7}
//                     className="size-4 lg:size-5 xl:size-6"
//                   />
//                 )}
//               </ButtonsDock>
//             </DockIcon>
//             <DockIcon>
//               <ButtonsDock name={isVideoMuted ? "Start Video" : "Stop Video"}>
//                 {isVideoMuted ? (
//                   <VideoOff
//                     strokeWidth={1.7}
//                     className="size-4 lg:size-5 xl:size-6"
//                   />
//                 ) : (
//                   <Video
//                     strokeWidth={1.7}
//                     className="size-4 lg:size-5 xl:size-6"
//                   />
//                 )}
//               </ButtonsDock>
//             </DockIcon>
//             <DockIcon>
//               <ButtonsDock
//                 name="Call-End"
//                 className="bg-red-600 text-white hover:bg-red-600 dark:bg-red-600 hover:dark:bg-red-600"
//               >
//                 <PhoneIcon
//                   strokeWidth={1.7}
//                   className="size-4 lg:size-5 xl:size-6"
//                 />
//               </ButtonsDock>
//             </DockIcon>
//             <DockIcon>
//               <ButtonsDock name="ScreenShare">
//                 <ScreenShare
//                   strokeWidth={1.7}
//                   className="size-4 lg:size-5 xl:size-6"
//                 />
//               </ButtonsDock>
//             </DockIcon>
//             <DockIcon>
//               <ButtonsDock
//                 name="Chat"
//                 onClick={() => setIsChatBarVisible(!isChatBarVisible)}
//               >
//                 {isChatBarVisible ? (
//                   <MessageSquareOff
//                     strokeWidth={1.7}
//                     className="size-4 lg:size-5 xl:size-6"
//                   />
//                 ) : (
//                   <MessageSquare
//                     strokeWidth={1.7}
//                     className="size-4 lg:size-5 xl:size-6"
//                   />
//                 )}
//               </ButtonsDock>
//             </DockIcon>
//           </Dock>
//         </div>
//       </div>

//       <div
//         className={`${
//           isChatBarVisible ? "block" : "hidden"
//         } flex h-full flex-col overflow-hidden rounded-xl border bg-mediumdark transition-all duration-500 ease-in-out dark:border-1 dark:border-neutral-800 dark:bg-white lg:w-3/12`}
//       >
//         <div className="flex items-center justify-between px-4 py-3 dark:border-neutral-700">
//           <div className="text-lg font-medium text-white opacity-70 dark:text-v0dark">
//             Chat
//           </div>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="rounded-full text-neutral-200 hover:bg-neutral-500 dark:text-mediumdark dark:hover:bg-neutral-300"
//             onClick={() => setIsChatBarVisible(false)}
//           >
//             <X className="size-5" />
//           </Button>
//         </div>
//         <div className="no-scrollbar h-64 flex-1 overflow-y-auto p-2 pt-4">
//           <div className="space-y-4">{/* <div ref={messagesEndRef} /> */}</div>
//         </div>
//         <div className="flex items-center gap-2 border-t p-4 dark:border-neutral-700">
//           <Button
//             variant="ghost"
//             size="icon"
//             className="hover:bg-neutral-700 dark:hover:bg-neutral-500"
//           >
//             <Send className="size-5 text-white" />
//             <span className="sr-only">Send</span>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const ChatStructure: React.FC<{ data: Chat }> = ({ data }) => {
//   const session = useSession();
//   return (
//     <div className="">
//     {/* {data.userId === session.data?.user.id ? (
//   <div className="flex items-start justify-end gap-3">
//     <div className="min-w-32 rounded-md bg-neutral-200 p-2 text-sm text-black">
//       <p className="break-words break-all">{data.message}</p>
//       <div className="mt-1 text-xs text-[#58595a] dark:text-neutral-400">
//         2:35 PM
//       </div>
//     </div>
//     <Avatar
//       name={data.name}
//       classname="size-8 shadow-sm mr-1 md:mr-2 bg-neutral-200 text-sm  text-black border border-black"
//       photo={data.userImage}
//     />
//   </div>
// ) : (
//   <div className="flex items-start gap-3">
//     <Avatar
//       name={data.name}
//       classname="size-8 shadow-sm bg-neutral-200 text-sm  text-black border border-black"
//       photo={data.userImage}
//     />
//     <div className="min-w-32 rounded-md bg-lightdark p-2 text-sm text-[#e2e8f0]">
//       <p className="break-words break-all">{data.message}</p>
//       <div className="mt-1 text-xs text-neutral-200">2:36 PM</div>
//     </div>
//   </div>
// )} */}
//     </div>
//   );
// };

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Video Area */}
//       <div className={`flex-1 grid ${pinnedVideo !== null ? 'grid-cols-5 grid-rows-1' : 'grid-cols-2 grid-rows-2'} p-4 gap-4`}>
//         {videos.map((video, index) => (
//           <div
//             key={index}
//             className={`flex items-center justify-center text-white font-bold cursor-pointer
//               ${pinnedVideo === index
//                 ? 'col-span-4 row-span-1 h-full bg-blue-500'
//                 : pinnedVideo !== null
//                   ? 'col-span-1 row-span-1 h-full bg-gray-700'
//                   : 'h-48 bg-gray-700'}
//               transition-all duration-700 ease-in-out`}
//             onClick={() => handlePin(index)}
//           >
//             {video}
//           </div>
//         ))}
//       </div>

//       {/* Dock and Chat Toggle */}
//       <div className="bg-gray-800 p-4 flex justify-between items-center fixed bottom-0 w-full">
//         <button className="text-white font-bold" onClick={toggleChat}>
//           Chat
//         </button>
//         <div className="text-white">Dock Options</div>
//       </div>

//       {/* Chat Area */}
//       <div
//         className={`absolute right-0 top-0 h-full bg-gray-900 p-4 transition-transform duration-700 ease-in-out
//           ${isChatOpen ? 'translate-x-0' : 'translate-x-full'}`}
//         style={{ width: '300px' }}
//       >
//         <button className="text-white font-bold" onClick={toggleChat}>
//           Close
//         </button>
//         <div className="text-white mt-4">Chat Content</div>
//       </div>
//     </div>
//   );
// };

// export default VideoPlatform;
