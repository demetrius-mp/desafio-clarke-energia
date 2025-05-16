import { ChevronsUpDownIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import {
  Control,
  FieldArrayWithId,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/shadcn-utils";

import { NestedForm } from "./types";

function PromotionEntryTitle({
  control,
  index,
}: {
  control: Control<NestedForm>;
  index: number;
}) {
  const a = useWatch<NestedForm>({
    control,
    name: `promotionsSection.entries.${index}.title`,
    exact: true,
  });

  return a?.toString() ?? "Item";
}

function PromotionEntryButtonForm({
  control,
  index,
  buttonType,
  onRemove,
  onAdd,
  cardTitle,
}: {
  control: Control<NestedForm>;
  index: number;
  buttonType: "button" | "secondaryButton";
  onRemove: () => void;
  onAdd: () => void;
  cardTitle: string;
}) {
  return (
    <FormField
      control={control}
      name={`promotionsSection.entries.${index}.${buttonType}`}
      render={({ field }) => {
        const hasButton = field.value !== null;

        return (
          <Card>
            <CardHeader className="p-4">
              <div className="flex gap-2 w-full justify-between items-center">
                <CardTitle>{cardTitle}</CardTitle>

                <Button
                  type="button"
                  onClick={() => {
                    if (hasButton) {
                      onRemove();
                    } else {
                      onAdd();
                    }
                  }}
                  size="sm"
                >
                  {hasButton ? (
                    <Trash2Icon className="w-4 h-4" />
                  ) : (
                    <PlusIcon className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardHeader>

            {hasButton && (
              <CardContent className="space-y-4 p-4">
                <FormField
                  control={control}
                  name={`promotionsSection.entries.${index}.${buttonType}.label`}
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                          <Input placeholder="Label" {...field} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={control}
                  name={`promotionsSection.entries.${index}.${buttonType}.link`}
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>Link</FormLabel>
                        <FormControl>
                          <Input placeholder="Link" {...field} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </CardContent>
            )}
          </Card>
        );
      }}
    />
  );
}

function PromotionEntryForm({
  control,
  index,
  field,
  onRemove,
}: {
  control: Control<NestedForm>;
  index: number;
  field: FieldArrayWithId<NestedForm, "promotionsSection.entries", "id">;
  onRemove: () => void;
}) {
  const { setValue } = useFormContext<NestedForm>();

  function handleAddButton(
    index: number,
    buttonType: "button" | "secondaryButton",
  ) {
    setValue(`promotionsSection.entries.${index}.${buttonType}`, {
      label: "",
      link: "",
    });
  }

  function handleRemoveButton(
    index: number,
    buttonType: "button" | "secondaryButton",
    confirmMessage: string,
  ) {
    if (!confirm(confirmMessage)) return;

    setValue(`promotionsSection.entries.${index}.${buttonType}`, null);
  }

  return (
    <Card key={field.id}>
      <Collapsible defaultOpen>
        <CardHeader>
          <div className="flex gap-2 w-full justify-between items-center">
            <CardTitle>
              <PromotionEntryTitle control={control} index={index} />
            </CardTitle>

            <div className="flex gap-2 items-center">
              <CollapsibleTrigger asChild>
                <Button variant="secondary" size="sm">
                  <ChevronsUpDownIcon className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>

              <Button type="button" size="sm" onClick={onRemove}>
                <Trash2Icon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="space-y-4">
            <FormField
              control={control}
              name={`promotionsSection.entries.${index}.id`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <Input placeholder="item-1" {...field} />
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            <FormField
              control={control}
              name={`promotionsSection.entries.${index}.title`}
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
              name={`promotionsSection.entries.${index}.subtitle`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Subtitle</FormLabel>
                    <FormControl>
                      <Input placeholder="Subtitle" {...field} />
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            <FormField
              control={control}
              name={`promotionsSection.entries.${index}.imageUrl`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Image URL" {...field} />
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            <PromotionEntryButtonForm
              control={control}
              index={index}
              buttonType="button"
              onRemove={() =>
                handleRemoveButton(
                  index,
                  "button",
                  "Tem certeza que deseja remover este botão?",
                )
              }
              onAdd={() => handleAddButton(index, "button")}
              cardTitle="Button"
            />

            <PromotionEntryButtonForm
              control={control}
              index={index}
              buttonType="secondaryButton"
              onRemove={() =>
                handleRemoveButton(
                  index,
                  "secondaryButton",
                  "Tem certeza que deseja remover este botão secundário?",
                )
              }
              onAdd={() => handleAddButton(index, "secondaryButton")}
              cardTitle="Secondary Button"
            />
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

export function PromotionsSectionForm({
  control,
}: {
  control: Control<NestedForm>;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "promotionsSection.entries",
  });

  function handleAppend() {
    if (!collapsibleIsOpen) {
      setCollapsibleIsOpen(true);
    }

    append([
      {
        id: "",
        title: "Item 1",
        imageUrl: "",
        subtitle: "",
        button: null,
        secondaryButton: null,
      },
    ]);
  }

  function handleRemoveItem(index: number) {
    if (!confirm("Tem certeza que deseja remover este item?")) return;

    remove(index);
  }

  const [collapsibleIsOpen, setCollapsibleIsOpen] = useState(true);

  return (
    <>
      <FormField
        control={control}
        name={`promotionsSection.title`}
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
        name={`promotionsSection.subtitle`}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Subtitle</FormLabel>
              <FormControl>
                <Input placeholder="Subtitle" {...field} />
              </FormControl>
            </FormItem>
          );
        }}
      />

      <FormField
        control={control}
        name={`promotionsSection.iconUrl`}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Icon URL</FormLabel>
              <FormControl>
                <Input placeholder="Icon URL" {...field} />
              </FormControl>
            </FormItem>
          );
        }}
      />

      <Collapsible open={collapsibleIsOpen} onOpenChange={setCollapsibleIsOpen}>
        <div className="flex gap-2 items-center justify-between">
          <h2 className="text-2xl font-bold">Itens ({fields.length})</h2>

          <div className="flex gap-2 items-center">
            <CollapsibleTrigger asChild>
              <Button variant="secondary" size="sm">
                <ChevronsUpDownIcon className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>

            <Button type="button" size="sm" onClick={handleAppend}>
              <PlusIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <CollapsibleContent
          className={cn(fields.length > 0 && "mt-4", "space-y-4")}
        >
          {fields.map((field, index) => (
            <PromotionEntryForm
              key={field.id}
              control={control}
              index={index}
              field={field}
              onRemove={() => handleRemoveItem(index)}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
