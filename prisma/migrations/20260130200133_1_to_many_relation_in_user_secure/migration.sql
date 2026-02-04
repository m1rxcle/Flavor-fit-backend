/*
  Warnings:

  - You are about to drop the `userSecurityEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "userSecurityEvent" DROP CONSTRAINT "userSecurityEvent_user_id_fkey";

-- DropTable
DROP TABLE "userSecurityEvent";

-- CreateTable
CREATE TABLE "user_security_events" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "security_event_type" "SecurityEventType" NOT NULL,
    "ip" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "lat" DECIMAL(65,30),
    "lon" DECIMAL(65,30),
    "country" TEXT,
    "city" TEXT,
    "device_type" TEXT,
    "os" TEXT,
    "browser" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_security_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_security_events_user_id_created_at_idx" ON "user_security_events"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "user_security_events_security_event_type_idx" ON "user_security_events"("security_event_type");

-- AddForeignKey
ALTER TABLE "user_security_events" ADD CONSTRAINT "user_security_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
