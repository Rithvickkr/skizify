/*
  Warnings:

  - A unique constraint covering the columns `[skizzerId]` on the table `Skizzer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Interval` to the `Gigs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gigs" ADD COLUMN     "Interval" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Skizzer_skizzerId_key" ON "Skizzer"("skizzerId");
