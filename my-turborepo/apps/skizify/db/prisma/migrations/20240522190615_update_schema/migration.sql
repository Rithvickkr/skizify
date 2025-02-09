-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('GOOGLE', 'FACEBOOK', 'GITHUB');

-- CreateEnum
CREATE TYPE "GigStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authType" "AuthType",

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gigs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "timeslot" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,
    "acceptedById" TEXT,
    "status" "GigStatus" NOT NULL,

    CONSTRAINT "Gigs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skizzer" (
    "id" TEXT NOT NULL,
    "skizzerId" TEXT NOT NULL,

    CONSTRAINT "Skizzer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Gigs" ADD CONSTRAINT "Gigs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gigs" ADD CONSTRAINT "Gigs_acceptedById_fkey" FOREIGN KEY ("acceptedById") REFERENCES "Skizzer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skizzer" ADD CONSTRAINT "Skizzer_skizzerId_fkey" FOREIGN KEY ("skizzerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
