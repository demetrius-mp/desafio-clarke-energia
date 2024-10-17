import { z } from "zod";

type CreateFormActionOptions<TSchema extends z.ZodTypeAny, TReturn> = {
  schema: TSchema;
  action: (
    data: z.infer<TSchema>
  ) => Promise<FormActionReturnType<TSchema, TReturn>>;
};

type FormActionReturnType<TSchema extends z.ZodTypeAny, TReturn> =
  | {
      status: "success";
      result: TReturn;
      message?: string;
    }
  | {
      status: "error";
      error?: z.ZodError<z.infer<TSchema>>;
      message?: string;
    };

type FormAction<TSchema extends z.ZodTypeAny, TReturn> = (
  data: z.infer<TSchema>
) => Promise<FormActionReturnType<TSchema, TReturn>>;

export function createFormAction<TSchema extends z.ZodTypeAny, TReturn>(
  options: CreateFormActionOptions<TSchema, TReturn>
): FormAction<TSchema, TReturn> {
  const { schema, action } = options;

  return async (data) => {
    const parsed = await schema.safeParseAsync(data);

    if (!parsed.success) {
      return {
        status: "error",
        error: parsed.error,
      };
    }

    return await action(parsed.data);
  };
}
