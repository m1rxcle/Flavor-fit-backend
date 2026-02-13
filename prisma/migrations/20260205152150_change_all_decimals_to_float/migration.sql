/*
  Warnings:

  - You are about to alter the column `proteins` on the `nutrition_facts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `fats` on the `nutrition_facts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `carbohydrates` on the `nutrition_facts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `fiber` on the `nutrition_facts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `quantity` on the `order_items` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `price` on the `order_items` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `quantity` on the `recipe_ingredients` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "nutrition_facts" ALTER COLUMN "proteins" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "fats" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "carbohydrates" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "fiber" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "order_items" ALTER COLUMN "quantity" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "recipe_ingredients" ALTER COLUMN "quantity" SET DATA TYPE DOUBLE PRECISION;
