import {
  Calendar,
  ChevronRight,
  Clock,
  User,
  Users,
  Video
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../@/components/ui/avatar";
import { Button } from "../../../@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../@/components/ui/card";
import { ScrollArea } from "../../../@/components/ui/scroll-area";
import NewMeetingLinkButton from "./NewMeetingLinkButton";

export default function MeetingDashboard() {
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
                Upcoming Meeting
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Your next scheduled meeting
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 rounded-lg bg-neutral-200/40 p-4 dark:bg-gradient-to-r dark:from-neutral-800 dark:to-neutral-900">
                <Calendar className="h-5 w-5 text-black dark:text-white" />
                <div className="space-y-1">
                  <h3 className="font-semibold">Team Standup</h3>
                  <p className="text-muted-foreground text-sm">
                    2024-11-02 at 10:00 AM
                  </p>
                </div>
              </div>
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Users className="h-4 w-4" />
                <span>8 attendees</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Avatar className="h-8 w-8 border p-1 dark:border-white/45">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="Attendee 1"
                  />
                  <AvatarFallback>A1</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 border p-1 dark:border-white/45">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="Attendee 2"
                  />
                  <AvatarFallback>A2</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 border p-1 dark:border-white/45">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="Attendee 3"
                  />
                  <AvatarFallback>A3</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 border p-1 dark:border-white/45">
                  <AvatarFallback>+5</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>

          <Card className="from-card/50 to-card bg-gradient-to-br p-4 shadow-xl backdrop-blur-lg transition-all duration-300 hover:shadow-2xl dark:border dark:border-white/20">
          <CardHeader>
              <CardTitle className="bg-gradient-to-r from-black to-black/60 bg-clip-text text-2xl font-semibold text-transparent dark:from-white dark:to-white/15">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 h-40 gap-4">
              <Button className="flex h-auto flex-col col-span-1 items-center justify-center border border-black/60 bg-transparent text-black opacity-75 hover:bg-black/5 hover:opacity-100 dark:border-white/50 dark:text-white dark:hover:bg-white/10">
                <Video className="mb-2 h-6 w-6 " />
                Join Meeting
              </Button>
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
        </div>

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
            <ScrollArea className="max-h-96 space-y-3 w-full overflow-auto no-scrollbar">
            {[
              {
                title: "Project Review",
                date: "2024-11-02",
                time: "2:00 PM",
                participants: ["Alice", "Bob", "Charlie"],
              },
              {
                title: "Client Meeting",
                date: "2024-11-03",
                time: "11:00 AM",
                participants: ["David", "Eva"],
              },
              {
                title: "Client Meeting",
                date: "2024-11-03",
                time: "11:00 AM",
                participants: ["David", "Eva"],
              },
              {
                title: "Client Meeting",
                date: "2024-11-03",
                time: "11:00 AM",
                participants: ["David", "Eva"],
              },
              {
                title: "Client Meeting",
                date: "2024-11-03",
                time: "11:00 AM",
                participants: ["David", "Eva"],
              },
              {
                title: "Client Meeting",
                date: "2024-11-03",
                time: "11:00 AM",
                participants: ["David", "Eva"],
              },
              {
                title: "Client Meeting",
                date: "2024-11-03",
                time: "11:00 AM",
                participants: ["David", "Eva"],
              },
              {
                title: "Client Meeting",
                date: "2024-11-03",
                time: "11:00 AM",
                participants: ["David", "Eva"],
              },
              {
                title: "Sprint Planning",
                date: "2024-11-04",
                time: "9:00 AM",
                participants: ["Frank", "Grace", "Henry", "Ivy"],
              },
              {
                title: "Design Workshop",
                date: "2024-11-04",
                time: "2:00 PM",
                participants: ["Jack", "Karen", "Liam"],
              },
            ].map((meeting, index) => (
              <div
                key={index}
                className="hover:black-10 my-2 group flex cursor-pointer items-center justify-between rounded-lg bg-neutral-200/40 p-4 transition-all duration-300 dark:bg-gradient-to-r dark:from-neutral-800 dark:to-neutral-900"
              >
                <div className="flex items-center gap-4">
                  <Calendar className="h-5 w-5 text-black dark:text-white" />
                  <div>
                    <h3 className="font-semibold">{meeting.title}</h3>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>{meeting.date}</span>
                      <span>•</span>
                      <span>{meeting.time}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-1">
                      <User className="h-4 w-4 text-black dark:text-white" />
                      <span className="text-muted-foreground text-sm">
                        {meeting.participants.join(", ")}
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
      </div>
    </div>
  );
}
