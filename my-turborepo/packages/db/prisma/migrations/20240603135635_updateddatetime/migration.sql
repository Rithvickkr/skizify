/*
  Warnings:

  - You are about to drop the column `enddate` on the `Gigs` table. All the data in the column will be lost.
  - You are about to drop the column `endtime` on the `Gigs` table. All the data in the column will be lost.
  - You are about to drop the column `startdate` on the `Gigs` table. All the data in the column will be lost.
  - You are about to drop the column `starttime` on the `Gigs` table. All the data in the column will be lost.
  - Added the required column `enddatetime` to the `Gigs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startdatetime` to the `Gigs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gigs" DROP COLUMN "enddate",
DROP COLUMN "endtime",
DROP COLUMN "startdate",
DROP COLUMN "starttime",
ADD COLUMN     "enddatetime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startdatetime" TIMESTAMP(3) NOT NULL;
