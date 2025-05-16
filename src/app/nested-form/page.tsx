"use client";

import { useForm } from "react-hook-form";

import { PromotionsSectionForm } from "@/app/nested-form/promotions-section.form";
import { Container } from "@/components/container";
import { PageHeading } from "@/components/page-heading";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

import { NestedForm } from "./types";

export default function Page() {
  const form = useForm<NestedForm>({
    defaultValues: {
      promotionsSection: {
        title: "",
        subtitle: "",
        iconUrl: "",
        entries: [],
      },
    },
  });

  function onSubmit(data: NestedForm) {
    console.log(data);
  }

  return (
    <Container className="my-4 sm:my-6 lg:my-8">
      <PageHeading title="Igaming home" description="blablablalbal" />

      <Form {...form}>
        <form
          className=" flex gap-8 flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Typography variant="h2">Seção de promoções</Typography>
          <PromotionsSectionForm control={form.control} />

          <Separator />

          <Button type="submit">Salvar</Button>
        </form>
      </Form>
    </Container>
  );
}
