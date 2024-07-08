import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { Peer } from "peerjs";
export default async function PeerConnect() {
  const session = await getServerSession(authOptions);
  const peer = new Peer(session?.user.id as string);
  console.log(peer);
  return peer;
}
