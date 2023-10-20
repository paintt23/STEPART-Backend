-- CreateTable
CREATE TABLE `customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `Tel` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `customer_Tel_key`(`Tel`),
    UNIQUE INDEX `customer_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `regiterOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `customerName` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `registerdate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `statusPaymentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shortDescription` VARCHAR(191) NOT NULL,
    `longDescription` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `photo` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `dateOpenCours` DATETIME(3) NOT NULL,
    `generation` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `Tel` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `admin_Tel_key`(`Tel`),
    UNIQUE INDEX `admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bank` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accountName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseId` INTEGER NOT NULL,
    `bankId` INTEGER NOT NULL,
    `paymentDate` DATETIME(3) NOT NULL,
    `amount` INTEGER NOT NULL,
    `slipPayment` VARCHAR(191) NOT NULL,
    `statusPaymentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StatusPayment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statusName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `regiterOrder` ADD CONSTRAINT `regiterOrder_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `regiterOrder` ADD CONSTRAINT `regiterOrder_statusPaymentId_fkey` FOREIGN KEY (`statusPaymentId`) REFERENCES `StatusPayment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_bankId_fkey` FOREIGN KEY (`bankId`) REFERENCES `bank`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_statusPaymentId_fkey` FOREIGN KEY (`statusPaymentId`) REFERENCES `StatusPayment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
