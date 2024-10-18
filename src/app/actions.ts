"use server";

import prisma from "@/lib/prisma";
import { MonthlyConsumptionSchema } from "@/lib/schemas";
import { createFormAction } from "@/lib/utils/create-form-action";
import { Entities } from "@/types";

export const fetchSuppliers = createFormAction({
  schema: MonthlyConsumptionSchema,
  async action(data) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const energySuppliers = await prisma.energySupplier.findMany({
      where: {
        minKwhLimit: {
          lte: data.monthlyConsumption,
        },
      },
      select: {
        id: true,
        logo: true,
        name: true,
        state: true,
        averageRating: true,
        costPerKwh: true,
        minKwhLimit: true,
        totalClients: true,
      },
    });

    return {
      status: "success",
      result: energySuppliers as Entities.EnergySupplier[],
    };
  },
});
