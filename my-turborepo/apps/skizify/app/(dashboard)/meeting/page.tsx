import MeetingDashboard from "../../components/Meeting/Meeting-Dashboard";
// import SetHairScreen from "../../components/Meeting/SetHairScreen";
export default function Meeting() {
  return (
    <div className="h-screen w-full rounded-lg no-scrollbar">
      {/* <Landing /> */}
      {/* <SetHairScreen meetingId={"1"} /> */}
      <MeetingDashboard />
      {/* <VideoPlatform /> */}
    </div>
  );
}
