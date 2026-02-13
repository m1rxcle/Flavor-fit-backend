/*
  Warnings:

  - You are about to alter the column `quantity` on the `recipe_ingredients` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - A unique constraint covering the columns `[slug]` on the table `recipes` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `status` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `slug` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "order_status" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELED');

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "status",
ADD COLUMN     "status" "order_status" NOT NULL;

-- AlterTable
ALTER TABLE "recipe_ingredients" ALTER COLUMN "quantity" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "slug" TEXT NOT NULL;

-- DropEnum
DROP TYPE "OrderStatus";

-- CreateIndex
CREATE UNIQUE INDEX "recipes_slug_key" ON "recipes"("slug");
