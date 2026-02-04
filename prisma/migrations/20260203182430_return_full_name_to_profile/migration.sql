/*
  Warnings:

  - Made the column `full_name` on table `profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "full_name" SET NOT NULL;
