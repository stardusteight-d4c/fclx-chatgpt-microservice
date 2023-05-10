/*
  Warnings:

  - Added the required column `chat_name` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Chat` ADD COLUMN `chat_name` VARCHAR(191) NOT NULL;
