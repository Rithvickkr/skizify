-- CreateTable
CREATE TABLE "meeting" (
    "id" TEXT NOT NULL,
    "skizzerId" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "meeting_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "meeting" ADD CONSTRAINT "meeting_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meeting" ADD CONSTRAINT "meeting_skizzerId_fkey" FOREIGN KEY ("skizzerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
