-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('ADMIN', 'CASHIER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('UNPAYMENT', 'IN_PROGRESS', 'SUCCESS', 'FAILED', 'CANCEL');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'CASHIER',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "methodPayment" VARCHAR(255) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'UNPAYMENT',
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "userId" TEXT NOT NULL,
    "cashierId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT DEFAULT '',
    "image" TEXT DEFAULT '',
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductOrder" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ProductOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullName" VARCHAR(255) NOT NULL,
    "table" INTEGER,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyData" (
    "id" TEXT NOT NULL,
    "totalSale" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "mostProductSale" VARCHAR(255) NOT NULL,
    "lessProductSale" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "weeklyDataId" TEXT NOT NULL,

    CONSTRAINT "DailyData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyData" (
    "id" TEXT NOT NULL,
    "totalSale" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "mostProductSale" VARCHAR(255) NOT NULL,
    "lessProductSale" VARCHAR(255) NOT NULL,
    "dayMostSale" VARCHAR(255) NOT NULL,
    "dayLessSale" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "monthlyDataId" TEXT NOT NULL,

    CONSTRAINT "WeeklyData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonthlyData" (
    "id" TEXT NOT NULL,
    "totalSale" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "mostProductSale" VARCHAR(255) NOT NULL,
    "lessProductSale" VARCHAR(255) NOT NULL,
    "dayMostSale" VARCHAR(255) NOT NULL,
    "dayLessSale" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "MonthlyData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductOrder_productId_key" ON "ProductOrder"("productId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_cashierId_fkey" FOREIGN KEY ("cashierId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductOrder" ADD CONSTRAINT "ProductOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductOrder" ADD CONSTRAINT "ProductOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DailyData" ADD CONSTRAINT "DailyData_weeklyDataId_fkey" FOREIGN KEY ("weeklyDataId") REFERENCES "WeeklyData"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "WeeklyData" ADD CONSTRAINT "WeeklyData_monthlyDataId_fkey" FOREIGN KEY ("monthlyDataId") REFERENCES "MonthlyData"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

