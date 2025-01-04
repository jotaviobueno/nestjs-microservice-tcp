/*
  Warnings:

  - You are about to drop the column `provider` on the `notifications` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "notification_provider_index";

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "provider";

-- DropEnum
DROP TYPE "Provider";
