/*
  Warnings:

  - Added the required column `category` to the `Gigs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "AuthType" ADD VALUE 'LINKEDIN';

-- AlterTable
ALTER TABLE "Gigs" ADD COLUMN     "category" TEXT NOT NULL;
