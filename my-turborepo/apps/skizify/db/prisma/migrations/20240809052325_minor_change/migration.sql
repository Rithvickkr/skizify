/*
  Warnings:

  - You are about to drop the column `gigUser` on the `meeting` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[gigUserId]` on the table `meeting` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gigUserId` to the `meeting` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "meeting" DROP CONSTRAINT "meeting_gigUser_fkey";

-- DropIndex
DROP INDEX "meeting_gigUser_idx";

-- DropIndex
DROP INDEX "meeting_gigUser_key";

-- AlterTable
ALTER TABLE "meeting" DROP COLUMN "gigUser",
ADD COLUMN     "gigUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "meeting_gigUserId_key" ON "meeting"("gigUserId");

-- CreateIndex
CREATE INDEX "meeting_gigUserId_idx" ON "meeting"("gigUserId");

-- AddForeignKey
ALTER TABLE "meeting" ADD CONSTRAINT "meeting_gigUserId_fkey" FOREIGN KEY ("gigUserId") REFERENCES "GigUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
