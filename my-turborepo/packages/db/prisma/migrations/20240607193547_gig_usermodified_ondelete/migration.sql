/*
  Warnings:

  - You are about to drop the column `accepted` on the `GigUser` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `GigUser` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[skizzerId,UserId]` on the table `GigUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `UserId` to the `GigUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skizzerId` to the `GigUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GigUser" DROP CONSTRAINT "GigUser_gigId_fkey";

-- DropForeignKey
ALTER TABLE "GigUser" DROP CONSTRAINT "GigUser_userId_fkey";

-- DropIndex
DROP INDEX "GigUser_gigId_userId_key";

-- AlterTable
ALTER TABLE "GigUser" DROP COLUMN "accepted",
DROP COLUMN "userId",
ADD COLUMN     "UserId" TEXT NOT NULL,
ADD COLUMN     "skizzerId" TEXT NOT NULL,
ADD COLUMN     "status" "GigStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Gigs" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX "GigUser_skizzerId_UserId_key" ON "GigUser"("skizzerId", "UserId");

-- AddForeignKey
ALTER TABLE "GigUser" ADD CONSTRAINT "GigUser_gigId_fkey" FOREIGN KEY ("gigId") REFERENCES "Gigs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GigUser" ADD CONSTRAINT "GigUser_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GigUser" ADD CONSTRAINT "GigUser_skizzerId_fkey" FOREIGN KEY ("skizzerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
