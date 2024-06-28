"use client"
import { useEffect } from "react";
import PeerConnect from "../../lib/actions/peerconnect";

export default function MeetingPage() {
  useEffect(() => {
    async function setupPeer() {
      const peer = await PeerConnect();
      console.log(peer);
    }
    
    setupPeer();
  }, []);
  
  return (
    <div>
      <h1>Meeting Page</h1>
    </div>
  );
}
