-- CreateEnum
CREATE TYPE "MeetingStatus" AS ENUM ('PENDING', 'ONGOING', 'ENDED');

-- AlterTable
ALTER TABLE "meeting" ADD COLUMN     "status" "MeetingStatus" NOT NULL DEFAULT 'PENDING';
