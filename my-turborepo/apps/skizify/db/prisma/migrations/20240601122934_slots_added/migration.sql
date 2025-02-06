/*
  Warnings:

  - You are about to drop the column `timeslot` on the `Gigs` table. All the data in the column will be lost.
  - Added the required column `Enddate` to the `Gigs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Startdate` to the `Gigs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gigs" DROP COLUMN "timeslot",
ADD COLUMN     "Enddate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "Startdate" TIMESTAMP(3) NOT NULL;
