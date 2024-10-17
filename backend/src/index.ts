import { prisma } from "@/lib/prisma";
import express from "express";
import { z } from "zod";

const app = express();

const EnergySupplierQueryParamsSchema = z.object({
  monthlyConsumption: z.coerce.number().positive(),
});

app.get("/energy-suppliers", async (req, res) => {
  const parsed = EnergySupplierQueryParamsSchema.safeParse(req.query);

  if (!parsed.success) {
    res.status(400).json(parsed.error);
    return;
  }

  const { monthlyConsumption } = parsed.data;

  const energySuppliers = await prisma.energySupplier.findMany({
    where: {
      minKwhLimit: {
        lte: monthlyConsumption,
      },
    },
  });

  res.json(energySuppliers);
  return;
});

app.listen(3000);
