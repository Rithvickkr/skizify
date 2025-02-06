/*
  Warnings:

  - Made the column `budget` on table `GigUser` required. This step will fail if there are existing NULL values in that column.
  - Made the column `finalDateTime` on table `GigUser` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "GigUser" ALTER COLUMN "budget" SET NOT NULL,
ALTER COLUMN "finalDateTime" SET NOT NULL;
