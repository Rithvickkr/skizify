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

  async createRoom(User1: User, User2: User, meetingId: string) {
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
    const User2 = room?.User2;
    const ReceivingUser = UserSocketId === User1?.socket.id ? User2 : User1;
    ReceivingUser?.socket.emit("addIceCandidate", { candidate, type });
  }

  //method for handling screen share start
  onScreenOffer(roomId: string, sdp: any, UserSocketId: string) {
    const room = this.rooms.get(roomId);
    const User1 = room?.User1;
    const User2 = room?.User2;
    const ReceivingUser = UserSocketId === User1?.socket.id ? User2 : User1;
    ReceivingUser?.socket.emit("screen-offer", { roomId, sdp });
  }

  onScreenAnswer(roomId: string, sdp: any, UserSocketId: string) {
    const room = this.rooms.get(roomId);
    const User1 = room?.User1;
    const User2 = room?.User2;
    const ReceivingUser = UserSocketId === User1?.socket.id ? User2 : User1;
    ReceivingUser?.socket.emit("screen-answer", { roomId, sdp });
  }

  onScreenIceCandidate(
    roomId: string,
    candidate: any,
    UserSocketId: string,
    type: "sender" | "receiver"
  ) {
    const room = this.rooms.get(roomId);
    const User1 = room?.User1;
    const User2 = room?.User2;
    const ReceivingUser = UserSocketId === User1?.socket.id ? User2 : User1;
    ReceivingUser?.socket.emit("screen-ice-candidate", { candidate, type });
  }

  stopScreenShare(roomId: string, UserSocketId: string) {
    const room = this.rooms.get(roomId);
    const User1 = room?.User1;
    const User2 = room?.User2;
    const ReceivingUser = UserSocketId === User1?.socket.id ? User2 : User1;
    ReceivingUser?.socket.emit("stop-screen-share", { roomId });
  }
  // getSession(session:ClientSessionInterface){
  //   const room = this.rooms.get(session);
  // }

  // generateRoomId() {
  //   return GLOBAL_ROOM_ID++;
  // }
}
