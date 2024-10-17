"use client";

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
import { MonthlyConsumptionSchema } from "@/lib/schemas";
import { useFormStatus } from "react-dom";

type MonthlyConsumptionFormProps = {
  state: {
    status: "success" | "error";
    errors?: Partial<
      z.typeToFlattenedError<z.infer<typeof MonthlyConsumptionSchema>>
    >;
  } | null;
};

export function MonthlyConsumptionForm(props: MonthlyConsumptionFormProps) {
  const { state } = props;

  const form = useForm<z.infer<typeof MonthlyConsumptionSchema>>({
    reValidateMode: "onSubmit",
    defaultValues: {
      monthlyConsumption: 0,
    },
  });

  const { pending } = useFormStatus();

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="monthlyConsumption"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Consumo mensal (em kWh)</FormLabel>

            <div className="flex gap-2">
              <FormControl>
                <Input type="number" placeholder="30000" {...field} />
              </FormControl>

              <Button type="submit" disabled={pending}>
                Buscar
              </Button>
            </div>
            <FormMessage>
              {state?.errors?.fieldErrors?.monthlyConsumption?.at(0)}
            </FormMessage>
          </FormItem>
        )}
      />
    </Form>
  );
}
