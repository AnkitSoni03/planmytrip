/*
  Warnings:

  - You are about to drop the column `days` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `destination` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `pickupAddress` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `vehicle` on the `Booking` table. All the data in the column will be lost.
  - The `status` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[clerkId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dropLoc` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passengers` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentAmt` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupLoc` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tripType` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleType` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Made the column `pickupTime` on table `Booking` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `clerkId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Booking" DROP COLUMN "days",
DROP COLUMN "destination",
DROP COLUMN "mobile",
DROP COLUMN "notes",
DROP COLUMN "pickupAddress",
DROP COLUMN "username",
DROP COLUMN "vehicle",
ADD COLUMN     "dropLoc" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "passengers" INTEGER NOT NULL,
ADD COLUMN     "paymentAmt" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "pickupDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "pickupLoc" TEXT NOT NULL,
ADD COLUMN     "tripType" TEXT NOT NULL,
ADD COLUMN     "vehicleType" TEXT NOT NULL,
ALTER COLUMN "pickupTime" SET NOT NULL,
ALTER COLUMN "pickupTime" SET DATA TYPE TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "createdAt",
DROP COLUMN "emailVerified",
DROP COLUMN "image",
ADD COLUMN     "clerkId" TEXT NOT NULL,
ADD COLUMN     "creaatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "email" SET NOT NULL;

-- DropTable
DROP TABLE "public"."Account";

-- DropTable
DROP TABLE "public"."Payment";

-- DropTable
DROP TABLE "public"."Session";

-- DropTable
DROP TABLE "public"."VerificationToken";

-- DropEnum
DROP TYPE "public"."BookingStatus";

-- DropEnum
DROP TYPE "public"."PaymentStatus";

-- CreateTable
CREATE TABLE "public"."Feedback" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookingId" TEXT,
    "comment" TEXT NOT NULL,
    "rating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "public"."User"("clerkId");

-- AddForeignKey
ALTER TABLE "public"."Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Feedback" ADD CONSTRAINT "Feedback_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "public"."Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
