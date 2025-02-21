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

export function ChipsForm({
  control,
  internalPageIndex,
  tabIndex,
}: {
  control: Control<NestedForm>;
  internalPageIndex: number;
  tabIndex: number;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `internalPages.${internalPageIndex}.1.tabs.${tabIndex}.chips`,
  });

  function handleAppend() {
    append({
      chipName: "",
      sections: [],
    });
  }

  return (
    <>
      {fields.map((field, index) => (
        <Card key={field.id}>
          <CardHeader>
            <CardTitle>Chip {index + 1}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={control}
              name={`internalPages.${internalPageIndex}.1.tabs.${tabIndex}.chips.${index}.chipName`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Chip Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Chip name" {...field} />
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

      <Button type="button" onClick={handleAppend}>
        Add Chip
      </Button>
    </>
  );
}
