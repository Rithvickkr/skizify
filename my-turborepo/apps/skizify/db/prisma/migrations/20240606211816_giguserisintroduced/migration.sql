/*
  Warnings:

  - You are about to drop the column `acceptedById` on the `Gigs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Gigs" DROP CONSTRAINT "Gigs_acceptedById_fkey";

-- AlterTable
ALTER TABLE "Gigs" DROP COLUMN "acceptedById",
ADD COLUMN     "confirmUserId" TEXT;

-- CreateTable
CREATE TABLE "GigUser" (
    "id" TEXT NOT NULL,
    "gigId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL,

    CONSTRAINT "GigUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GigUser_gigId_userId_key" ON "GigUser"("gigId", "userId");

-- AddForeignKey
ALTER TABLE "Gigs" ADD CONSTRAINT "Gigs_confirmUserId_fkey" FOREIGN KEY ("confirmUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GigUser" ADD CONSTRAINT "GigUser_gigId_fkey" FOREIGN KEY ("gigId") REFERENCES "Gigs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GigUser" ADD CONSTRAINT "GigUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
