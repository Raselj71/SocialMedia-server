-- DropForeignKey
ALTER TABLE `media` DROP FOREIGN KEY `Media_profileUserId_fkey`;

-- DropForeignKey
ALTER TABLE `media` DROP FOREIGN KEY `Media_userId_fkey`;

-- AlterTable
ALTER TABLE `media` MODIFY `userId` INTEGER NULL,
    MODIFY `profileUserId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_profileUserId_fkey` FOREIGN KEY (`profileUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
