-- CreateEnum
CREATE TYPE "SecurityEventType" AS ENUM ('LOGIN', 'PASSWORD_CHANGE');

-- CreateTable
CREATE TABLE "userSecurityEvent" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "SecurityEventType" NOT NULL,
    "ip" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "country" TEXT,
    "region" TEXT,
    "city" TEXT,
    "deviceType" TEXT,
    "os" TEXT,
    "browser" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userSecurityEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userSecurityEvent_user_id_key" ON "userSecurityEvent"("user_id");

-- AddForeignKey
ALTER TABLE "userSecurityEvent" ADD CONSTRAINT "userSecurityEvent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
