-- AlterTable
ALTER TABLE "notifications" ALTER COLUMN "title" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "notification_channel_index" ON "notifications"("channel");

-- CreateIndex
CREATE INDEX "notification_provider_index" ON "notifications"("provider");

-- CreateIndex
CREATE INDEX "notification_template_index" ON "notifications"("template");

-- CreateIndex
CREATE INDEX "notification_to_index" ON "notifications"("to");

-- RenameIndex
ALTER INDEX "notifications_recipient_id_idx" RENAME TO "notification_recipient_id_index";

-- RenameIndex
ALTER INDEX "notifications_status_idx" RENAME TO "notification_status_index";
