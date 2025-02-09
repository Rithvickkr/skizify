/*
  Warnings:

  - You are about to drop the column `enddatetime` on the `Gigs` table. All the data in the column will be lost.
  - You are about to drop the column `startdatetime` on the `Gigs` table. All the data in the column will be lost.
  - Added the required column `enDateTime` to the `Gigs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDateTime` to the `Gigs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gigs" DROP COLUMN "enddatetime",
DROP COLUMN "startdatetime",
ADD COLUMN     "enDateTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDateTime" TIMESTAMP(3) NOT NULL;
