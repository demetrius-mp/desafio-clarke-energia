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

import { TabsForm } from "./tabs-form";
import { NestedForm } from "./types";

export function InternalPagesForm({
  control,
}: {
  control: Control<NestedForm>;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "internalPages",
  });

  function handleAppend() {
    append([["", { title: "", iconUrl: "", tabs: [] }]]);
  }

  return (
    <>
      {fields.map((field, index) => (
        <Card key={field.id}>
          <CardHeader>
            <CardTitle>Internal Page {index + 1}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={control}
              name={`internalPages.${index}.0`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Key</FormLabel>
                    <FormControl>
                      <Input placeholder="Navspot name" {...field} />
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            <FormField
              control={control}
              name={`internalPages.${index}.1.title`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            <FormField
              control={control}
              name={`internalPages.${index}.1.iconUrl`}
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

            <TabsForm control={control} internalPageIndex={index} />
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
        Add Internal Page
      </Button>
    </>
  );
}
