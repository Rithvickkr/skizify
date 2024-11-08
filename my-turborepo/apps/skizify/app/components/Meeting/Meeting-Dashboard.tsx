import { meetingsInfo_interface } from "@repo/store/types";
import { Avatar, AvatarImage, AvatarFallback } from "../../../@/components/ui/avatar";
import { format } from "date-fns";
import { Calendar, ChevronRight, Clock, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../@/components/ui/card";
import { ScrollArea } from "../../../@/components/ui/scroll-area";
// import AvatarUploader from "../AvatarUploader";
import JoinMeetingCredenza from "./JoinMeetingDialog";
import NewMeetingLinkButton from "./NewMeetingLinkButton";
import PushtoExplore from "./PushtoExplore";
import PushtoProfileButton from "./PushtoProfileButton";
export default function MeetingDashboard({
  meetings,
}: {
  meetings: meetingsInfo_interface[];
}) {
  // id: true,
  // gigId: true,
  // skizzerId: true,
  // UserId: true,
  // status: true,
  // budget: true,
  // finalDateTime: true,
  // user: {
  //   select: {
  //     id: true,
  //     name: true,
  //     userImage: true,
  //   },
  // },
  // Skizzer: {
  //   select: {
  //     id: true,
  //     name: true,
  //     userImage: true,
  //   },
  // },
  // gig: {
  //   select: {
  //     title: true,
  //     content: true,
  //     timeneeded: true
  //   },
  // },

  //   const [currentTime, setCurrentTime] = useState(new Date())
  //   const [meetingProgress, setMeetingProgress] = useState(0)

  //   useEffect(() => {
  //     const timer = setInterval(() => setCurrentTime(new Date()), 1000)
  //     return () => clearInterval(timer)
  //   }, [])

  //   useEffect(() => {
  //     const progressTimer = setInterval(() => {
  //       setMeetingProgress((prev) => (prev < 100 ? prev + 1 : 0))
  //     }, 1000)
  //     return () => clearInterval(progressTimer)
  //   }, [])

  // i will get the meetings in a Ascending order
  console.log("meetings: ", meetings);
  return (
    <div className={`min-h-screen p-6 transition-colors duration-300`}>
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="bg-gradient-to-r from-black to-black/60 bg-clip-text text-4xl font-bold text-transparent dark:from-white dark:to-white/15">
            Meeting Dashboard
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="from-card/50 to-card bg-gradient-to-br p-4 shadow-xl backdrop-blur-lg transition-all duration-300 hover:shadow-2xl dark:border dark:border-white/20">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-black to-black/60 bg-clip-text text-2xl font-semibold text-transparent dark:from-white dark:to-white/15">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid h-32 grid-cols-2 gap-4">
              <JoinMeetingCredenza />
              {/* <Button className="flex h-20 flex-col items-center justify-center border border-black/60 bg-transparent text-black opacity-75 hover:bg-black/5 hover:opacity-100 dark:border-white/50 dark:text-white dark:hover:bg-white/10">
                <MessageSquare className="mb-2 h-6 w-6" />
                Send Message
              </Button> */}
              {/* <Button className="flex h-20 flex-col items-center justify-center border border-black/60 bg-transparent text-black opacity-75 hover:bg-black/5 hover:opacity-100 dark:border-white/50 dark:text-white dark:hover:bg-white/10">
                <FileText className="mb-2 h-6 w-6" />
                View Notes
              </Button> */}
              <div className="col-span-1">
                <NewMeetingLinkButton />
              </div>
            </CardContent>
          </Card>
          {meetings.length > 0 ? (
            <Card className="from-card/50 to-card bg-gradient-to-br p-4 shadow-xl backdrop-blur-lg transition-all duration-300 hover:shadow-2xl dark:border dark:border-white/20">
              <CardHeader>
                <CardTitle className="bg-gradient-to-r from-black to-black/60 bg-clip-text text-2xl font-semibold text-transparent dark:from-white dark:to-white/15">
                  Upcoming Meeting
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  Your next scheduled meeting
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-start gap-4 rounded-lg bg-neutral-200/40 p-4 dark:bg-gradient-to-r dark:from-neutral-800 dark:to-neutral-900">
                  <Calendar className="h-5 w-5 text-black dark:text-white" />
                  <div className="space-y-1 text-neutral-700 dark:text-neutral-300">
                    <h3 className="font-semibold"></h3>
                    <p className="text-muted-foreground text-sm">
                      {meetings[0]?.finalDateTime
                        ? format(
                            new Date(meetings[0].finalDateTime),
                            "dd MMM yyyy, hh:mm a",
                          )
                        : "Date not available"}
                    </p>
                  </div>
                </div>
                <div className="group flex cursor-pointer items-center space-x-3 rounded-lg bg-neutral-200/40 p-3 text-neutral-500 hover:bg-black/5 dark:bg-gradient-to-r dark:from-neutral-800 dark:to-neutral-900 dark:text-neutral-400">
                  {/* Attendee Avatars */}
                  <Avatar className="rounded-md border-1 ring-2 ring-neutral-500">
                    <AvatarImage src={meetings[0]?.user.userImage || ""} alt={meetings[0]?.Skizzer.name || "User"} />
                    <AvatarFallback>{(meetings[0]?.Skizzer.name || "User").charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold">
                      {meetings[0]?.Skizzer.name}
                    </span>
                    <PushtoProfileButton meeting={meetings[0]}>
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {meetings[0]?.Skizzer.email}
                      </span>
                      <ChevronRight className="h-5 w-5 text-neutral-500 transition-transform duration-300 group-hover:translate-x-2" />
                    </PushtoProfileButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="w-full rounded-lg border border-zinc-200 bg-white shadow-md dark:border-zinc-800 dark:bg-zinc-900">
              <CardContent className="flex flex-col items-center justify-center px-4 py-16">
                <div className="mb-6 rounded-full bg-zinc-200 p-4 dark:bg-zinc-800">
                  <Calendar className="h-10 w-10 text-zinc-500 dark:text-zinc-400" />
                </div>

                <div className="mb-6 space-y-2 text-center">
                  <h3 className="text-xl font-semibold text-zinc-800 dark:text-white">
                    No Meetings Scheduled
                  </h3>
                  <p className="max-w-sm text-zinc-600 dark:text-zinc-400">
                    You don't have any meetings scheduled yet. Create your first
                    meeting to get started.
                  </p>
                </div>

                <PushtoExplore />
              </CardContent>
            </Card>
          )}
        </div>

        {meetings.length > 0 ? (
          <Card className="from-card/50 to-card bg-gradient-to-br p-4 shadow-xl backdrop-blur-lg transition-all duration-300 hover:shadow-2xl dark:border dark:border-white/20">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-black to-black/60 bg-clip-text text-xl font-semibold text-transparent dark:from-white dark:to-white/15">
                Upcoming Meetings
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Your schedule for the next few days
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="no-scrollbar max-h-96 w-full space-y-3 overflow-auto">
                {meetings.map((meeting, index) => (
                  <div
                    key={index}
                    className="hover:black-10 group my-2 flex cursor-pointer items-center justify-between rounded-lg bg-neutral-200/40 p-4 transition-all duration-300 dark:bg-gradient-to-r dark:from-neutral-800 dark:to-neutral-900"
                  >
                    <div className="flex items-center gap-4">
                      <Calendar className="h-5 w-5 text-black dark:text-white" />
                      <div>
                        <h3 className="font-semibold">{meeting.gig.title}</h3>
                        <div className="text-muted-foreground flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4" />
                          <span>
                            {format(
                              new Date(meeting.finalDateTime),
                              "dd MMM yyyy",
                            )}
                          </span>
                          <span>•</span>
                          <span>
                            {format(new Date(meeting.finalDateTime), "hh:mm a")}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-1">
                          <User className="h-4 w-4 text-black dark:text-white" />
                          <span className="text-muted-foreground text-sm">
                            {meeting.user.name}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-black text-black/50 transition-colors duration-300 dark:text-white group-hover:dark:text-white" />
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        ) : (
          <div>
            <Card className="w-full rounded-lg border border-zinc-200 bg-white shadow-md dark:border-zinc-800 dark:bg-zinc-900">
              <CardContent className="flex flex-col items-center justify-center px-4 py-16">
                <div className="mb-6 rounded-full bg-zinc-200 p-4 dark:bg-zinc-800">
                  <Calendar className="h-10 w-10 text-zinc-500 dark:text-zinc-400" />
                </div>

                <div className="mb-6 space-y-2 text-center">
                  <h3 className="text-xl font-semibold text-zinc-800 dark:text-white">
                    No Meetings Scheduled
                  </h3>
                  <p className="max-w-sm text-zinc-600 dark:text-zinc-400">
                    You don't have any meetings scheduled yet. Create your first
                    meeting to get started.
                  </p>
                </div>

                <PushtoExplore />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
