/*
  Warnings:

  - A unique constraint covering the columns `[gigId]` on the table `GigUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GigUser_gigId_key" ON "GigUser"("gigId");
