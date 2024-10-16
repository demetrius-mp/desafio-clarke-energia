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

const formSchema = z.object({
  monthlyConsumption: z.coerce.number().positive(),
});

export function MonthlyConsumptionForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlyConsumption: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="monthlyConsumption"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Consumo mensal (em kWh)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0.01}
                  placeholder="30000kwh"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Button type="submit">Buscar</Button>
        </div>
      </form>
    </Form>
  );
}
