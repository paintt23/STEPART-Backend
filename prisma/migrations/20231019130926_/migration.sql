/*
  Warnings:

  - You are about to drop the column `generation` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `longDescription` on the `course` table. All the data in the column will be lost.
  - Added the required column `description` to the `course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `course` DROP COLUMN `generation`,
    DROP COLUMN `location`,
    DROP COLUMN `longDescription`,
    ADD COLUMN `description` VARCHAR(255) NOT NULL,
    ADD COLUMN `numberOfPeople` INTEGER NOT NULL DEFAULT 0,
    MODIFY `price` INTEGER NOT NULL DEFAULT 0;
