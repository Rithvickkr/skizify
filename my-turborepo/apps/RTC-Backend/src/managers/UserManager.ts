import { Socket } from "socket.io";
import { RoomManager } from "./RoomManager";
import prisma from "@repo/db/index";
export interface User {
  socket: Socket;
  userId: string;
  meetingId: string;
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

  createRoom(userId: string, meetingId: string, socket: Socket) {
    console.log("Room is creating");
    const user: User = { userId, meetingId, socket };
    if (this.meeting.get(meetingId)) {
      this.meeting.get(meetingId)?.push(user);
    } else {
      this.meeting.set(meetingId, [user]);
    }
    console.log(this.meeting);
    // this.queue.push(user.socket.id);
    this.initHandlers(user.socket, user.meetingId);
    this.clearQueue(user.meetingId);
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
        user1.socket.join(meetingId); //User Joined the Room
        user2.socket.join(meetingId); //User Joined the Room
        console.log("Both user Joined the meeting")
        this.roomManager.createRoom(user1, user2, meetingId);
      }
    }
    // this.clearQueue(meetingId); //again recalling the Function
  }

  removeUser(meetingId: string, userId: string) {
    // this.meeting = this.meeting.filter((x) => x.socket.id !== socketId);
    // this.queue = this.queue.filter((x) => x !== socketId);
    const users = this.meeting.get(meetingId);
    if (!users) return;

    // Remove the user from the array
    const updatedUsers = users.filter((user) => user.userId !== userId);

    // Update the Map
    if (updatedUsers.length > 0) {
      this.meeting.set(meetingId, updatedUsers);
    } else {
      this.meeting.delete(meetingId);
    }
  }

  initHandlers(UserSocket: Socket, meetingId: string) {
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
    
    UserSocket.on("send-message", ({ message }: { message: string }) => {
      console.log("Yeah GOT the message, Sending on Particular Room Id");
      console.log("Broadcasting to room:", meetingId);
      UserSocket.to(meetingId).emit("receive-message", message);
    });
    // UserSocket.on("onsession", ( session : ClientSessionInterface ) => {
    //   this.roomManager.getSession(session);
    // } )
  }
}
