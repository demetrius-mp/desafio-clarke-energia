"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { useWatchErrors } from "@/lib/hooks/use-watch-errors";

type MonthlyConsumptionFormProps = {
  state: {
    status: "success" | "error";
    error?: z.ZodError<z.infer<typeof MonthlyConsumptionSchema>>;
  } | null;
  onSubmit: (
    data: z.infer<typeof MonthlyConsumptionSchema>
  ) => void | Promise<void>;
};

export function MonthlyConsumptionForm(props: MonthlyConsumptionFormProps) {
  const { state, onSubmit } = props;

  const form = useForm<z.infer<typeof MonthlyConsumptionSchema>>({
    resolver: zodResolver(MonthlyConsumptionSchema),
    defaultValues: {
      monthlyConsumption: 0,
    },
  });

  useWatchErrors({
    form,
    state,
  });

  const { pending } = useFormStatus();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
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

              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </form>
  );
}
