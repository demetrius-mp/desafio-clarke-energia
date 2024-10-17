import { MonthlyConsumptionSchema } from "@/lib/schemas";
import { createFormActionWithResult } from "@/lib/utils/create-form-action";
import { Entities } from "@/types";

export const fetchEnergySuppliers = createFormActionWithResult<
  Entities.EnergySupplier[]
>()({
  schema: MonthlyConsumptionSchema,
  action: async ({}) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      status: "success",
      result: [],
    };
  },
});
