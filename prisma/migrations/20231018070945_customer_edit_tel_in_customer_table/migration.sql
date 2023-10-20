-- DropIndex
DROP INDEX `customer_Tel_key` ON `customer`;

-- AlterTable
ALTER TABLE `customer` MODIFY `Tel` VARCHAR(191) NOT NULL;
