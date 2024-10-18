-- CreateTable
CREATE TABLE "energy_suppliers" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "logo" TEXT NOT NULL,
    "state" VARCHAR(128) NOT NULL,
    "cost_per_kwh" DOUBLE PRECISION NOT NULL,
    "min_kwh_limit" DOUBLE PRECISION NOT NULL,
    "total_clients" INTEGER NOT NULL,
    "average_rating" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "energy_suppliers_pkey" PRIMARY KEY ("id")
);
