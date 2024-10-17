import { MonthlyConsumptionSchema } from "@/lib/schemas";
import { createFormAction } from "@/lib/utils/create-form-action";
import { Entities } from "@/types";

export const fetchSuppliers = createFormAction({
  schema: MonthlyConsumptionSchema,
  async action() {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
      status: "success",
      result: [] as Entities.EnergySupplier[],
    };
  },
});
