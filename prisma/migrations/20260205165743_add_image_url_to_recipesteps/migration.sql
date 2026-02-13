/*
  Warnings:

  - Added the required column `imageUrl` to the `recipe_steps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "recipe_steps" ADD COLUMN     "imageUrl" TEXT NOT NULL;
