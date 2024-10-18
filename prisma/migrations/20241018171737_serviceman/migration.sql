/*
  Warnings:

  - You are about to drop the `serviceMan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "serviceMan";

-- CreateTable
CREATE TABLE "ServiceMan" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(191) NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profileUrl" TEXT NOT NULL,
    "services" JSONB[],
    "workingPhoneNo" TEXT NOT NULL,

    CONSTRAINT "ServiceMan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServiceMan_email_key" ON "ServiceMan"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceMan_phoneNo_key" ON "ServiceMan"("phoneNo");
