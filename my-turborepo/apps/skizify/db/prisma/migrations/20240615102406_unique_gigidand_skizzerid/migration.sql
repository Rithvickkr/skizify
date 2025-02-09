/*
  Warnings:

  - A unique constraint covering the columns `[gigId,skizzerId]` on the table `GigUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gigId,UserId]` on the table `GigUser` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "GigUser_skizzerId_UserId_key";

-- CreateIndex
CREATE UNIQUE INDEX "GigUser_gigId_skizzerId_key" ON "GigUser"("gigId", "skizzerId");

-- CreateIndex
CREATE UNIQUE INDEX "GigUser_gigId_UserId_key" ON "GigUser"("gigId", "UserId");
