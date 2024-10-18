"use client";

import { useEffect } from "react";
import { FieldPath, UseFormReturn } from "react-hook-form";
import { z } from "zod";

type BaseState = {
  status: "success" | "error";
  error?: z.ZodError;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseFieldValues = Record<string, any>;

export function useWatchErrors<
  TState extends BaseState,
  TFieldValues extends BaseFieldValues
>(options: { form: UseFormReturn<TFieldValues>; state: TState | null }) {
  const { form, state } = options;

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.status === "error") {
      state.error?.issues.forEach((issue) => {
        form.setError(issue.path.join(".") as FieldPath<TFieldValues>, {
          message: issue.message,
        });
      });
    }
  }, [state, form]);
}
