import SetHairScreen from "./SetHairScreen"
export function MeetingLanding({meetingId}: {meetingId: string}) {
    return (
        <div>
            <SetHairScreen meetingId={meetingId}/>
        </div>
    )
}