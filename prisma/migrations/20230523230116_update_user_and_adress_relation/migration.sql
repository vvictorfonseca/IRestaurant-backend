/*
  Warnings:

  - You are about to drop the column `adressId` on the `users` table. All the data in the column will be lost.
  - Added the required column `userId` to the `adresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_adressId_fkey";

-- AlterTable
ALTER TABLE "adresses" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "adressId";

-- AddForeignKey
ALTER TABLE "adresses" ADD CONSTRAINT "adresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
