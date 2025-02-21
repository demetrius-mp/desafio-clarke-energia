import { Control, useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { NestedForm } from "./types";

export function NavspotsForm({ control }: { control: Control<NestedForm> }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "navspot",
  });

  return (
    <>
      {fields.map((field, index) => (
        <Card key={field.id}>
          <CardHeader>
            <CardTitle>Navspot {index + 1}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={control}
              name={`navspot.${index}.name`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Navspot name" {...field} />
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            <FormField
              control={control}
              name={`navspot.${index}.iconUrl`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Icon URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </CardContent>

          <CardFooter>
            <Button
              variant="destructive"
              type="button"
              onClick={() => remove(index)}
            >
              Remove
            </Button>
          </CardFooter>
        </Card>
      ))}

      <Button type="button" onClick={() => append({ name: "", iconUrl: "" })}>
        Add Navspot
      </Button>
    </>
  );
}
