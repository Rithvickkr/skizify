/*
  Warnings:

  - You are about to drop the column `Enddate` on the `Gigs` table. All the data in the column will be lost.
  - You are about to drop the column `Startdate` on the `Gigs` table. All the data in the column will be lost.
  - Added the required column `enddate` to the `Gigs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startdate` to the `Gigs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gigs" DROP COLUMN "Enddate",
DROP COLUMN "Startdate",
ADD COLUMN     "enddate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startdate" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Reviews" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "givento" TEXT NOT NULL,
    "givenby" TEXT NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_givento_fkey" FOREIGN KEY ("givento") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_givenby_fkey" FOREIGN KEY ("givenby") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
