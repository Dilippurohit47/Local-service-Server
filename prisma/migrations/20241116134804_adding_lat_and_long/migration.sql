/*
  Warnings:

  - Added the required column `latitude` to the `ServiceMan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `ServiceMan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServiceMan" ADD COLUMN     "latitude" TEXT NOT NULL,
ADD COLUMN     "longitude" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "latitude" TEXT NOT NULL,
ADD COLUMN     "longitude" TEXT NOT NULL;
