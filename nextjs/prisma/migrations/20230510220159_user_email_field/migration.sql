/*
  Warnings:

  - A unique constraint covering the columns `[user_email]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_email` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Chat` ADD COLUMN `user_email` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Chat_user_email_key` ON `Chat`(`user_email`);
