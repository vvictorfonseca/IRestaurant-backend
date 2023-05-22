/*
  Warnings:

  - You are about to drop the column `addressId` on the `users` table. All the data in the column will be lost.
  - Added the required column `adressId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_addressId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "addressId",
ADD COLUMN     "adressId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "adresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
