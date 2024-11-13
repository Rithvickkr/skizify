import { Server, Socket } from "socket.io";
import { RoomManager } from "./RoomManager";
export interface User {
  socket: Socket;
  userId: string;
  meetingId: string;
}
export interface Chat {
  id : number;
  message: string;
  name: string;
  userId: string;
  userImage?: string;
  messageTime : string;
  seenStatus : boolean;
}

export class UserManager {
  private meeting: Map<string, User[]>;
  // private queue: string[];
  private roomManager: RoomManager;

  constructor() {
    this.meeting = new Map();
    // this.queue = [];
    this.roomManager = new RoomManager();
  }

  createRoom(userId: string, meetingId: string, socket: Socket, io: Server) {
    console.log("Room is creating");
    const user: User = { userId, meetingId, socket };
    if (this.meeting.get(meetingId)) {
      this.meeting.get(meetingId)?.push(user);
    } else {
      this.meeting.set(meetingId, [user]);
    }
    console.log(this.meeting);
    // this.queue.push(user.socket.id);
    this.initHandlers(user.socket, user.meetingId, userId);
    this.clearQueue(user.meetingId);
    this.messageHandler(io, user.meetingId, user.socket);
  }

  clearQueue(meetingId: string) {
    const room = this.meeting.get(meetingId);
    if (!room || room.length < 2) {
      return;
    }
    // if (this.queue.length < 2) {
    //   return;
    // }
    console.log("I am in clear quque");
    //we will pass the torch to the RoomManager
    // const id1 = this.queue.pop();
    // const id2 = this.queue.pop();
    // const User1 = this.meeting.find((x) => x.socket.id === id1);
    // const User2 = this.meeting.find((x) => x.socket.id === id2);
    while (room.length >= 2) {
      const user1 = room.shift(); // Remove the first user
      const user2 = room.shift(); // Remove the second user

      if (user1 && user2 && user1.meetingId === user2.meetingId) {
        user1.socket.join(meetingId); //User1 Joined the Room
        user2.socket.join(meetingId); //User2 Joined the Room
        console.log("Both user Joined the meeting");
        this.roomManager.createRoom(user1, user2, meetingId);
      }
    }
    // this.clearQueue(meetingId); //again recalling the Function
  }

  //user will be removed Surely First from initHandlers & and when User disconnects Check index.ts , there we also have written this
  removeUser(meetingId: string, userId: string) {
    // this.meeting = this.meeting.filter((x) => x.socket.id !== socketId);
    // this.queue = this.queue.filter((x) => x !== socketId);
    console.log(userId);
    const users = this.meeting.get(meetingId);
    if (!users) return;
    //Let's tell the other User

    this.roomManager.onLeaveMeeting(meetingId,userId)
    this.roomManager.stopScreenShare(meetingId, userId);
    // Remove the user from the array
    const updatedUsers = users.filter((user) => user.userId !== userId);

    // Update the Map
    if (updatedUsers.length > 0) {
      this.meeting.set(meetingId, updatedUsers);
    } else {
      this.meeting.delete(meetingId);
    }
  }

  initHandlers(UserSocket: Socket, meetingId: string, userId: string) {
    if (!UserSocket) {
      console.error("Socket instance is not available.");
      return;
    }
    UserSocket.on("offer", ({ roomId, sdp }: { roomId: string; sdp: any }) => {
      this.roomManager.onOffer(roomId, sdp, UserSocket.id);
    });
    UserSocket.on("answer", ({ roomId, sdp }: { roomId: string; sdp: any }) => {
      this.roomManager.onAnswer(roomId, sdp, UserSocket.id);
    });
    UserSocket.on(
      "addIceCandidate",
      ({
        roomId,
        candidate,
        type,
      }: {
        roomId: string;
        candidate: any;
        type: "sender" | "receiver";
      }) => {
        this.roomManager.onAddIceCandidate(
          roomId,
          candidate,
          type,
          UserSocket.id
        );
      }
    );
    // socket?.emit('leave-meeting', { userId, meetingId });
    UserSocket.on(
      "leave-meeting",
      ({ userId, meetingId }: { userId: string; meetingId: string }) => {
        this.removeUser(meetingId, userId);
      }
    );
    UserSocket.on(
      "screen-offer",
      ({ roomId, sdp }: { roomId: string; sdp: any }) => {
        this.roomManager.onScreenOffer(roomId, sdp, UserSocket.id);
      }
    );

    UserSocket.on(
      "screen-answer",
      ({ roomId, sdp }: { roomId: string; sdp: any }) => {
        this.roomManager.onScreenAnswer(roomId, sdp, UserSocket.id);
      }
    );

    UserSocket.on(
      "screen-ice-candidate",
      ({
        roomId,
        candidate,
        type,
      }: {
        roomId: string;
        candidate: any;
        type: "sender" | "receiver";
      }) => {
        this.roomManager.onScreenIceCandidate(
          roomId,
          candidate,
          UserSocket.id,
          type
        );
      }
    );
    UserSocket.on("stop-screen-share", ({ roomId }: { roomId: string }) => {
      this.roomManager.stopScreenShare(roomId, userId);
    });

    // UserSocket.on("onsession", ( session : ClientSessionInterface ) => {
    //   this.roomManager.getSession(session);
    // } )
  }

  messageHandler(UserIO: Server, meetingId: string, UserSocket: Socket) {
    UserSocket.on(
      "send-message",
      ({id , message, name, userId, userImage , messageTime, seenStatus }: Chat) => {
        // console.log("Yeah GOT the message, Sending on Particular Room Id");
        // console.log("Broadcasting to room:", meetingId);
        // console.log("Message is this ====>", message);
        UserIO.to(meetingId).emit("receive-message", {
          id,
          message,
          name,
          userId,
          userImage,
          messageTime,
          seenStatus
        });
      }
    );

    UserSocket.on(
      "update-messages-seen",
      ({ incrementMessageId, userId }: { incrementMessageId: number[], userId: string }) => {
        console.log("these are the message to be updated", incrementMessageId);
        UserIO.to(meetingId).emit("messages-seen-update", {
          messageIds: incrementMessageId,
          userId,
        });
      }
    );
  
  }
}
