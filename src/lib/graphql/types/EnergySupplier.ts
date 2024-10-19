import { builder } from "@/lib/graphql/builder";
import prisma from "@/lib/prisma";

builder.prismaObject("EnergySupplier", {
  fields: (t) => ({
    id: t.exposeID("id", { nullable: false }),
    logo: t.exposeString("logo", { nullable: false }),
    name: t.exposeString("name", { nullable: false }),
    state: t.exposeString("state", { nullable: false }),
    averageRating: t.exposeFloat("averageRating", { nullable: false }),
    costPerKwh: t.exposeFloat("costPerKwh", { nullable: false }),
    minKwhLimit: t.exposeFloat("minKwhLimit", { nullable: false }),
    totalClients: t.exposeInt("totalClients", { nullable: false }),
  }),
});

builder.queryType({
  fields: (t) => ({
    energySuppliers: t.prismaField({
      type: ["EnergySupplier"],
      args: {
        monthlyConsumption: t.arg.int({ required: true }),
      },
      resolve: async (query, _, { monthlyConsumption }) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return await prisma.energySupplier.findMany({
          ...query,
          where: {
            minKwhLimit: {
              lte: monthlyConsumption,
            },
          },
        });
      },
    }),
  }),
});
