/*
  Warnings:

  - The values [PENDING] on the enum `MeetingStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `UserId` on the `meeting` table. All the data in the column will be lost.
  - You are about to drop the column `gigId` on the `meeting` table. All the data in the column will be lost.
  - You are about to drop the column `skizzerId` on the `meeting` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[gigUser]` on the table `meeting` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gigUser` to the `meeting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MeetingStatus_new" AS ENUM ('UNBOOKED_PENDING', 'BOOKED_PENDING', 'ONGOING', 'ENDED');
ALTER TABLE "meeting" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "meeting" ALTER COLUMN "status" TYPE "MeetingStatus_new" USING ("status"::text::"MeetingStatus_new");
ALTER TYPE "MeetingStatus" RENAME TO "MeetingStatus_old";
ALTER TYPE "MeetingStatus_new" RENAME TO "MeetingStatus";
DROP TYPE "MeetingStatus_old";
ALTER TABLE "meeting" ALTER COLUMN "status" SET DEFAULT 'UNBOOKED_PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "meeting" DROP CONSTRAINT "meeting_UserId_fkey";

-- DropForeignKey
ALTER TABLE "meeting" DROP CONSTRAINT "meeting_gigId_fkey";

-- DropForeignKey
ALTER TABLE "meeting" DROP CONSTRAINT "meeting_skizzerId_fkey";

-- DropIndex
DROP INDEX "meeting_gigId_key";

-- AlterTable
ALTER TABLE "meeting" DROP COLUMN "UserId",
DROP COLUMN "gigId",
DROP COLUMN "skizzerId",
ADD COLUMN     "gigUser" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'UNBOOKED_PENDING';

-- CreateIndex
CREATE UNIQUE INDEX "meeting_gigUser_key" ON "meeting"("gigUser");

-- CreateIndex
CREATE INDEX "meeting_gigUser_idx" ON "meeting"("gigUser");

-- AddForeignKey
ALTER TABLE "meeting" ADD CONSTRAINT "meeting_gigUser_fkey" FOREIGN KEY ("gigUser") REFERENCES "GigUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
