/*
  Warnings:

  - You are about to drop the column `heightCm` on the `body_measurements` table. All the data in the column will be lost.
  - Made the column `activity_level` on table `body_measurements` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nutritional_goal` on table `body_measurements` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "body_measurements" DROP COLUMN "heightCm",
ADD COLUMN     "height_cm" TEXT,
ALTER COLUMN "activity_level" SET NOT NULL,
ALTER COLUMN "nutritional_goal" SET NOT NULL;

-- CreateIndex
CREATE INDEX "ingredients_title_idx" ON "ingredients" USING HASH ("title");

-- CreateIndex
CREATE INDEX "recipes_title_idx" ON "recipes" USING HASH ("title");
