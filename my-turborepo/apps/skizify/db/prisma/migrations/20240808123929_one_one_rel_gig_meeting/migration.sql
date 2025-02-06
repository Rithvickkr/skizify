/*
  Warnings:

  - A unique constraint covering the columns `[gigId]` on the table `meeting` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gigId` to the `meeting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "meeting" ADD COLUMN     "gigId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "meeting_gigId_key" ON "meeting"("gigId");

-- AddForeignKey
ALTER TABLE "meeting" ADD CONSTRAINT "meeting_gigId_fkey" FOREIGN KEY ("gigId") REFERENCES "Gigs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
