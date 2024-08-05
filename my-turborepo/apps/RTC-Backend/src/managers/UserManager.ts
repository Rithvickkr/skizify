import { Socket } from "socket.io";
import { RoomManager } from "./RoomManager";

export interface User {
  socket: Socket;
  name: string;
}

export class UserManager {
  private users: User[];
  private queue: string[];
  private roomManager: RoomManager;

  constructor() {
    this.users = [];
    this.queue = [];
    this.roomManager = new RoomManager();
  }

  createRoom(name: string, socket: Socket) {
    console.log("Room is creating");
    const user: User = { name, socket };
    this.users.push(user);
    this.queue.push(user.socket.id);
    this.initHandlers(user.socket);
    this.clearQueue();
  }

  clearQueue() {
    if (this.queue.length < 2) {
      return;
    }
    console.log("I MA IN clear ququeu");
    //we will pass the torch to the RoomManager
    const id1 = this.queue.pop();
    const id2 = this.queue.pop();
    const User1 = this.users.find((x) => x.socket.id === id1);
    const User2 = this.users.find((x) => x.socket.id === id2);
    if (!User1 || !User2) {
      return;
    }

    this.roomManager.createRoom(User1, User2);
    this.clearQueue(); //again recalling the Function
  }

  removeUser(socketId: string) {
    this.users = this.users.filter((x) => x.socket.id !== socketId);
    this.queue = this.queue.filter((x) => x !== socketId);
  }

  initHandlers(UserSocket: Socket) {
    UserSocket.on("offer", ({ roomId, sdp }: { roomId: string; sdp: any }) => {
      this.roomManager.onOffer(roomId, sdp, UserSocket.id);
    });
    UserSocket.on("answer", ({ roomId, sdp }: { roomId: string; sdp: any }) => {
      this.roomManager.onAnswer(roomId, sdp, UserSocket.id);
    });
    UserSocket.on("addIceCandidate" ,({ roomId, candidate , type }: { roomId: string; candidate: any; type : 'sender' | 'receiver' }) => {
      this.roomManager.onAddIceCandidate(roomId, candidate, type, UserSocket.id);
    })
  }
}
