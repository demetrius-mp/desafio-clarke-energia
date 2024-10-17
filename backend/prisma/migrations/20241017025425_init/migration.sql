-- CreateTable
CREATE TABLE "energy_suppliers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "cost_per_kwh" DOUBLE PRECISION NOT NULL,
    "min_kwh_limit" DOUBLE PRECISION NOT NULL,
    "total_clients" INTEGER NOT NULL,
    "average_rating" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "energy_suppliers_pkey" PRIMARY KEY ("id")
);
