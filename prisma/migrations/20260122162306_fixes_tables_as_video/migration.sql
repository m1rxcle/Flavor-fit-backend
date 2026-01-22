/*
  Warnings:

  - You are about to drop the column `activity_level` on the `body_measurements` table. All the data in the column will be lost.
  - You are about to drop the column `arm_circumference` on the `body_measurements` table. All the data in the column will be lost.
  - You are about to drop the column `chest_weight` on the `body_measurements` table. All the data in the column will be lost.
  - You are about to drop the column `current_weight` on the `body_measurements` table. All the data in the column will be lost.
  - You are about to drop the column `desired_weight` on the `body_measurements` table. All the data in the column will be lost.
  - You are about to drop the column `goals` on the `body_measurements` table. All the data in the column will be lost.
  - You are about to drop the column `growth` on the `body_measurements` table. All the data in the column will be lost.
  - You are about to drop the column `thigh_circumference` on the `body_measurements` table. All the data in the column will be lost.
  - You are about to drop the column `waist_circumference` on the `body_measurements` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `cart_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `_CartToIngredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_IngredientToRecipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `carts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id,recipe_id]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `default_unit` to the `ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulty` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NutritionalGoals" AS ENUM ('WEIGHT_LOSS', 'MAINTENANCE', 'MUSCLE_GAIN');

-- CreateEnum
CREATE TYPE "ActivityLevel" AS ENUM ('SEDENTARY', 'LIGHT', 'MODERATE', 'ACTIVE', 'VERY_ACTIVE');

-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('GRAM', 'MILLILITER', 'PIECE', 'TEASPOON', 'TABLESPOON', 'CLOVES', 'CUP');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- DropForeignKey
ALTER TABLE "_CartToIngredient" DROP CONSTRAINT "_CartToIngredient_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartToIngredient" DROP CONSTRAINT "_CartToIngredient_B_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToRecipe" DROP CONSTRAINT "_IngredientToRecipe_A_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToRecipe" DROP CONSTRAINT "_IngredientToRecipe_B_fkey";

-- DropForeignKey
ALTER TABLE "body_measurements" DROP CONSTRAINT "body_measurements_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_cart_id_fkey";

-- DropIndex
DROP INDEX "orders_cart_id_key";

-- AlterTable
ALTER TABLE "body_measurements" DROP COLUMN "activity_level",
DROP COLUMN "arm_circumference",
DROP COLUMN "chest_weight",
DROP COLUMN "current_weight",
DROP COLUMN "desired_weight",
DROP COLUMN "goals",
DROP COLUMN "growth",
DROP COLUMN "thigh_circumference",
DROP COLUMN "waist_circumference",
ADD COLUMN     "activityLevel" "ActivityLevel",
ADD COLUMN     "arm_cm" TEXT,
ADD COLUMN     "chest_cm" TEXT,
ADD COLUMN     "goal_weight_kg" TEXT,
ADD COLUMN     "heightCm" TEXT,
ADD COLUMN     "nutritionalGoal" "NutritionalGoals",
ADD COLUMN     "thigh_cm" TEXT,
ADD COLUMN     "waist_cm" TEXT,
ADD COLUMN     "weight_kg" TEXT;

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "description",
DROP COLUMN "image_url",
DROP COLUMN "quantity",
ADD COLUMN     "default_unit" "Unit" NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "cart_id",
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "status" "OrderStatus" NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "full_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "author_id" TEXT NOT NULL,
ADD COLUMN     "difficulty" "Difficulty" NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "full_name";

-- DropTable
DROP TABLE "_CartToIngredient";

-- DropTable
DROP TABLE "_IngredientToRecipe";

-- DropTable
DROP TABLE "carts";

-- CreateTable
CREATE TABLE "couriers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "couriers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER DEFAULT 1,
    "recipe_ingredient_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_ingredients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon_url" TEXT,
    "quantity" DECIMAL(65,30) NOT NULL,
    "unit" "Unit" NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "recipe_id" TEXT,
    "ingredient_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipe_ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_steps" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipe_steps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recipe_ingredients_recipe_id_ingredient_id_key" ON "recipe_ingredients"("recipe_id", "ingredient_id");

-- CreateIndex
CREATE UNIQUE INDEX "likes_user_id_recipe_id_key" ON "likes"("user_id", "recipe_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_order_id_key" ON "orders"("order_id");

-- AddForeignKey
ALTER TABLE "body_measurements" ADD CONSTRAINT "body_measurements_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_recipe_ingredient_id_fkey" FOREIGN KEY ("recipe_ingredient_id") REFERENCES "recipe_ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_steps" ADD CONSTRAINT "recipe_steps_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
