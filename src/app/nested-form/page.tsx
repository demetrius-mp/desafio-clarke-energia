"use client";

import { useForm } from "react-hook-form";

import { Container } from "@/components/container";
import { PageHeading } from "@/components/page-heading";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

import { InternalPagesForm } from "./internal-pages.form";
import { NavspotsForm } from "./navspots-form";
import { NestedForm } from "./types";

export default function Page() {
  const form = useForm<NestedForm>({
    defaultValues: {
      navspot: [],
      internalPages: [],
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
          <Typography variant="h2">Navspots</Typography>
          <NavspotsForm control={form.control} />

          <Separator />

          <Typography variant="h2">Internal Pages</Typography>
          <InternalPagesForm control={form.control} />

          <Separator />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Container>
  );
}
