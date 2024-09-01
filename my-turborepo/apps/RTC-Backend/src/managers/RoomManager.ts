import { Socket } from "socket.io";
import { User } from "./UserManager";
import prisma from "@repo/db/index";
export interface Room {
  User1: User;
  User2: User;
}
export class RoomManager {
  private rooms: Map<String, Room>;
  constructor() {
    this.rooms = new Map();
  }

  async createRoom(User1: User, User2: User , meetingId : string) {
    const roomId = meetingId;
    // const RoomId = await prisma.meeting
    this.rooms.set(roomId, {
      User1,
      User2,
    });
    User1.socket.emit("send-offer", { roomId });
    User2.socket.emit("send-offer", { roomId });
  }

  onOffer(roomId: string, sdp: any, UserSocketId: string) {
    const room = this.rooms.get(roomId);
    const User1 = room?.User1;
    const User2 = room?.User2;
    const ReceivingUser = UserSocketId === User1?.socket.id ? User2 : User1;
    ReceivingUser?.socket.emit("offer", { roomId, sdp });
  }
  onAnswer(roomId: string, sdp: any, UserSocketId: string) {
    const room = this.rooms.get(roomId);
    const User1 = room?.User1;
    const User2 = room?.User2;
    const ReceivingUser = UserSocketId === User1?.socket.id ? User2 : User1;
    ReceivingUser?.socket.emit("answer", { roomId, sdp });
  }

  onAddIceCandidate(
    roomId: string,
    candidate: any,
    type: "sender" | "receiver",
    UserSocketId: string
  ) {
    const room = this.rooms.get(roomId);
    const User1 = room?.User1;
    const User2 = room?.User1;
    const ReceivingUser = UserSocketId === User1?.socket.id ? User2 : User1;
    ReceivingUser?.socket.emit("addIceCandidate", { candidate, type });
  }

    //method for handling screen share start
    onScreenShare(roomId: string, UserSocketId: string) {
      const room = this.rooms.get(roomId);
      if (!room) return;
  
      const sharingUser = room.User1.socket.id === UserSocketId ? room.User1 : room.User2;
      const receivingUser = room.User1.socket.id === UserSocketId ? room.User2 : room.User1;
  
      // Notify the receiving user that screen sharing has started
      receivingUser.socket.emit("peer-screen-share-started", { roomId });
    }
  
    //method for handling screen share stop
    onStopScreenShare(roomId: string, UserSocketId: string) {
      const room = this.rooms.get(roomId);
      if (!room) return;
  
      const sharingUser = room.User1.socket.id === UserSocketId ? room.User1 : room.User2;
      const receivingUser = room.User1.socket.id === UserSocketId ? room.User2 : room.User1;
  
      // Notify the receiving user that screen sharing has stopped
      receivingUser.socket.emit("peer-screen-share-stopped", { roomId });
    }
  
    //method for handling screen share track
    onScreenShareTrack(roomId: string, sdp: any, UserSocketId: string) {
      const room = this.rooms.get(roomId);
      if (!room) return;
  
      const receivingUser = room.User1.socket.id === UserSocketId ? room.User2 : room.User1;
  
      // Send the screen share track to the receiving user
      receivingUser.socket.emit("screen-share-track", { roomId, sdp });
    }
  // getSession(session:ClientSessionInterface){
  //   const room = this.rooms.get(session);
  // }

  // generateRoomId() {
  //   return GLOBAL_ROOM_ID++;
  // }
}
