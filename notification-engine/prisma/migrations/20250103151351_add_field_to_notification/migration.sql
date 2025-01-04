/*
  Warnings:

  - You are about to drop the column `metadata` on the `notifications` table. All the data in the column will be lost.
  - Added the required column `to` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "metadata",
ADD COLUMN     "to" TEXT NOT NULL;
