/*
  Warnings:

  - Changed the type of `Interval` on the `Gigs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Gigs" DROP COLUMN "Interval",
ADD COLUMN     "Interval" JSONB NOT NULL;
