/*
  Warnings:

  - Added the required column `endtime` to the `Gigs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starttime` to the `Gigs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gigs" ADD COLUMN     "endtime" TEXT NOT NULL,
ADD COLUMN     "starttime" TEXT NOT NULL;
