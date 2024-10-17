import { prisma } from "@/lib/prisma";
import cors from "cors";
import express from "express";
import { z } from "zod";

const app = express();
app.use(cors());

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

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
