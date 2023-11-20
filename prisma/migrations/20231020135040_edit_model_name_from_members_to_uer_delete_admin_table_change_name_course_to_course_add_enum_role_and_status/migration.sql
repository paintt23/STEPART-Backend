/*
  Warnings:

  - You are about to drop the column `StatusName` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `order` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `payment` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(20,2)`.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `courseId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_customerId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `StatusName`,
    DROP COLUMN `customerId`,
    DROP COLUMN `customerName`,
    DROP COLUMN `price`,
    ADD COLUMN `courseId` INTEGER NOT NULL,
    ADD COLUMN `status` ENUM('PENDING', 'APPROVE', 'REJECT') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `payment` MODIFY `paymentDate` DATE NOT NULL,
    MODIFY `amount` DECIMAL(20, 2) NOT NULL;

-- DropTable
DROP TABLE `admin`;

-- DropTable
DROP TABLE `customer`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `Tel` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
