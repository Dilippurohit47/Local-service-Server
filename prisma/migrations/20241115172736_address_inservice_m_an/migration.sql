/*
  Warnings:

  - Added the required column `city` to the `ServiceMan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `ServiceMan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pincode` to the `ServiceMan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `ServiceMan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServiceMan" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "pincode" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
