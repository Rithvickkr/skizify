/*
  Warnings:

  - You are about to drop the column `enDateTime` on the `Gigs` table. All the data in the column will be lost.
  - Added the required column `endDateTime` to the `Gigs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gigs" DROP COLUMN "enDateTime",
ADD COLUMN     "endDateTime" TIMESTAMP(3) NOT NULL;
