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

import { ChipsForm } from "./chips-form";
import { NestedForm } from "./types";

export function TabsForm({
  control,
  internalPageIndex,
}: {
  control: Control<NestedForm>;
  internalPageIndex: number;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `internalPages.${internalPageIndex}.1.tabs`,
  });

  function handleAppend() {
    append({
      tabName: "",
      chips: [],
    });
  }

  return (
    <>
      {fields.map((field, index) => (
        <Card key={field.id}>
          <CardHeader>
            <CardTitle>Tab {index + 1}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={control}
              name={`internalPages.${internalPageIndex}.1.tabs.${index}.tabName`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Tab Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Tab name" {...field} />
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            <ChipsForm
              control={control}
              internalPageIndex={internalPageIndex}
              tabIndex={index}
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
        Add Tab
      </Button>
    </>
  );
}
