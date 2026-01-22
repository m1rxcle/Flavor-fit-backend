/*
  Warnings:

  - You are about to drop the column `activityLevel` on the `body_measurements` table. All the data in the column will be lost.
  - You are about to drop the column `nutritionalGoal` on the `body_measurements` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "body_measurements" DROP COLUMN "activityLevel",
DROP COLUMN "nutritionalGoal",
ADD COLUMN     "activity_level" "ActivityLevel",
ADD COLUMN     "nutritional_goal" "NutritionalGoals";
