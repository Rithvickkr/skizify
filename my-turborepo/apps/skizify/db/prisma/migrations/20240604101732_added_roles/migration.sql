/*
  Warnings:

  - You are about to drop the `Skizzer` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'SKIZZER');

-- DropForeignKey
ALTER TABLE "Gigs" DROP CONSTRAINT "Gigs_acceptedById_fkey";

-- DropForeignKey
ALTER TABLE "Skizzer" DROP CONSTRAINT "Skizzer_skizzerId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Skizzer";

-- AddForeignKey
ALTER TABLE "Gigs" ADD CONSTRAINT "Gigs_acceptedById_fkey" FOREIGN KEY ("acceptedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
