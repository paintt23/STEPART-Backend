/*
  Warnings:

  - Added the required column `courseName` to the `course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `course` ADD COLUMN `courseName` VARCHAR(191) NOT NULL;
