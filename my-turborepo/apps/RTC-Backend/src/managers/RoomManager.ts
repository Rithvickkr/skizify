import { Socket } from "socket.io";
import { User } from "./UserManager";
export interface Room {
  User1: User;
  User2: User;
}
let GLOBAL_ROOM_ID = 1;

export class RoomManager {
  private rooms: Map<String, Room>;

  constructor() {
    this.rooms = new Map();
  }

  createRoom(User1: User, User2: User) {
    const roomId = this.generateRoomId().toString();
    this.rooms.set(roomId.toString(), {
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
    const ReceivingUser = (UserSocketId === User1?.socket.id) ? User2 : User1;
    ReceivingUser?.socket.emit("offer", { roomId, sdp });
  }
  onAnswer(roomId: string, sdp: any, UserSocketId: string) {
    const room = this.rooms.get(roomId);
    const User1 = room?.User1;
    const User2 = room?.User2;
    const ReceivingUser = (UserSocketId === User1?.socket.id) ? User2 : User1;
    ReceivingUser?.socket.emit("answer", { roomId, sdp });
  }

  onAddIceCandidate(roomId: string, candidate: any, type : 'sender' | 'receiver', UserSocketId: string ) {
    const room = this.rooms.get(roomId);
    const User1 = room?.User1;
    const User2 = room?.User1;
    const ReceivingUser = (UserSocketId === User1?.socket.id) ? User2 : User1;
    ReceivingUser?.socket.emit("addIceCandidate", { candidate, type});

  }

  generateRoomId() {
    return GLOBAL_ROOM_ID++;
  }
}
