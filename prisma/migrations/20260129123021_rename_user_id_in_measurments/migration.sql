/*
  Warnings:

  - You are about to drop the column `profile_id` on the `body_measurements` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `body_measurements` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `body_measurements` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "body_measurements" DROP CONSTRAINT "body_measurements_profile_id_fkey";

-- DropIndex
DROP INDEX "body_measurements_profile_id_key";

-- AlterTable
ALTER TABLE "body_measurements" DROP COLUMN "profile_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "body_measurements_user_id_key" ON "body_measurements"("user_id");

-- AddForeignKey
ALTER TABLE "body_measurements" ADD CONSTRAINT "body_measurements_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
