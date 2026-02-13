/*
  Warnings:

  - You are about to drop the column `price` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `recipe_ingredient_id` on the `order_items` table. All the data in the column will be lost.
  - The `order_id` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `ingredient_id` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerUnit` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Made the column `quantity` on table `order_items` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_recipe_ingredient_id_fkey";

-- AlterTable
ALTER TABLE "ingredients" ADD COLUMN     "price" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "price",
DROP COLUMN "recipe_ingredient_id",
ADD COLUMN     "ingredient_id" TEXT NOT NULL,
ADD COLUMN     "pricePerUnit" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "unit" "Unit" NOT NULL,
ALTER COLUMN "quantity" SET NOT NULL,
ALTER COLUMN "quantity" DROP DEFAULT;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
DROP COLUMN "order_id",
ADD COLUMN     "order_id" SERIAL NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "recipe_ingredients" ALTER COLUMN "unit" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "orders_order_id_key" ON "orders"("order_id");

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
