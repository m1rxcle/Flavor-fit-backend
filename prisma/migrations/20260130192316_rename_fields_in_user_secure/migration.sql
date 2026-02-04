/*
  Warnings:

  - You are about to drop the column `deviceType` on the `userSecurityEvent` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `userSecurityEvent` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `userSecurityEvent` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `userSecurityEvent` table. All the data in the column will be lost.
  - Added the required column `security_event_type` to the `userSecurityEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_agent` to the `userSecurityEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userSecurityEvent" DROP COLUMN "deviceType",
DROP COLUMN "region",
DROP COLUMN "type",
DROP COLUMN "userAgent",
ADD COLUMN     "device_type" TEXT,
ADD COLUMN     "lat" DECIMAL(65,30),
ADD COLUMN     "lon" DECIMAL(65,30),
ADD COLUMN     "security_event_type" "SecurityEventType" NOT NULL,
ADD COLUMN     "user_agent" TEXT NOT NULL;
