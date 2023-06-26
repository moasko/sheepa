/*
  Warnings:

  - Added the required column `id` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `email_verified` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `verificationtoken` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
