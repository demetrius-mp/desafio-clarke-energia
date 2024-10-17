"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const MonthlyConsumptionSchema = z.object({
  monthlyConsumption: z.coerce
    .number({
      invalid_type_error: "Valor inválido",
      message: "Valor inválido",
      required_error: "Valor inválido",
    })
    .positive("O valor deve ser maior que 0"),
});

type MonthlyConsumptionFormProps = {
  onSubmit: (values: z.infer<typeof MonthlyConsumptionSchema>) => Promise<void>;
};

export function MonthlyConsumptionForm(props: MonthlyConsumptionFormProps) {
  const { onSubmit } = props;

  const form = useForm<z.infer<typeof MonthlyConsumptionSchema>>({
    resolver: zodResolver(MonthlyConsumptionSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      monthlyConsumption: 0,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="monthlyConsumption"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Consumo mensal (em kWh)</FormLabel>

              <div className="flex gap-2">
                <FormControl>
                  <Input type="number" placeholder="30000kwh" {...field} />
                </FormControl>

                <Button type="submit">Buscar</Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
