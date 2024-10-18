import { z } from "zod";

export const MonthlyConsumptionSchema = z.object({
  monthlyConsumption: z.coerce
    .number({
      invalid_type_error: "Valor inválido",
      message: "Valor inválido",
      required_error: "Valor inválido",
    })
    .positive("O valor deve ser maior que 0"),
});
