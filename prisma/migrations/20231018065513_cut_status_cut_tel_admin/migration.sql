/*
  Warnings:

  - You are about to drop the column `Tel` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `bankId` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `statusPaymentId` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the `bank` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `regiterorder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `statuspayment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bankName` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `payment_bankId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `payment_statusPaymentId_fkey`;

-- DropForeignKey
ALTER TABLE `regiterorder` DROP FOREIGN KEY `regiterOrder_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `regiterorder` DROP FOREIGN KEY `regiterOrder_statusPaymentId_fkey`;

-- DropIndex
DROP INDEX `admin_Tel_key` ON `admin`;

-- AlterTable
ALTER TABLE `admin` DROP COLUMN `Tel`;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `bankId`,
    DROP COLUMN `statusPaymentId`,
    ADD COLUMN `bankName` INTEGER NOT NULL;

-- DropTable
DROP TABLE `bank`;

-- DropTable
DROP TABLE `regiterorder`;

-- DropTable
DROP TABLE `statuspayment`;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `customerName` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `registerdate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `StatusName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
