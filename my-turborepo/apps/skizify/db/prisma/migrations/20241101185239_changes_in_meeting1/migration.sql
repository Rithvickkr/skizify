/*
  Warnings:

  - A unique constraint covering the columns `[meetingId]` on the table `InstantMeeting` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "InstantMeeting_meetingId_key" ON "InstantMeeting"("meetingId");
