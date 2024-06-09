-- AlterTable
ALTER TABLE "GigUser" ADD COLUMN     "budget" INTEGER,
ADD COLUMN     "finalDateTime" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Gigs" ADD COLUMN     "Budgetfinalised" INTEGER;
