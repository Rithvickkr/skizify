/*
  Warnings:

  - Added the required column `timeneeded` to the `Gigs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gigs" ADD COLUMN "timeneeded" INTEGER DEFAULT 30 NOT NULL;
