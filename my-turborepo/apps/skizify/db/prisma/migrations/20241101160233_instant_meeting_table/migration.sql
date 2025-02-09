-- AlterTable
ALTER TABLE "meeting" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "InstantMeeting" (
    "id" TEXT NOT NULL,
    "meetingId" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "guestId" TEXT,
    "status" "MeetingStatus" NOT NULL DEFAULT 'UNBOOKED_PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InstantMeeting_pkey" PRIMARY KEY ("id")
);
