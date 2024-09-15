import SetHairScreen from "../../components/Meeting/SetHairScreen";
import VideoPlatform from "../../components/Meeting/StructureCopy";
export default function Meeting() {
  return (
    <div className="h-screen w-full rounded-lg no-scrollbar">
      {/* <Landing /> */}
      <SetHairScreen meetingId={"1"} />
      {/* <VideoPlatform /> */}
    </div>
  );
}
