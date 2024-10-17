import { z } from "zod";

type IsNever<T> = [T] extends [never] ? true : false;

type CustomFormState<
  TSchema extends z.ZodTypeAny,
  TResult,
  ResultMayBeUndefined extends boolean = false
> =
  | {
      status: "error";
      errors?: Partial<z.typeToFlattenedError<z.infer<TSchema>>>;
      message?: string;
    }
  | ({
      status: "success";
      message?: string;
    } & (IsNever<TResult> extends true
      ? { result?: never }
      : {
          result: ResultMayBeUndefined extends true
            ? TResult | undefined
            : TResult;
        }))
  | null;

type FormActionOptions<
  TSchema extends z.ZodTypeAny,
  TResult,
  TParams,
  THasParams extends boolean
> = {
  schema: TSchema;
  hasParams?: THasParams;
  formDataConverter?: (formData: FormData) => unknown;
  action: THasParams extends true
    ? (args: {
        params: TParams;
        state: CustomFormState<TSchema, TResult, true>;
        data: z.infer<TSchema>;
      }) => Promise<CustomFormState<TSchema, TResult>>
    : (args: {
        state: CustomFormState<TSchema, TResult, true>;
        data: z.infer<TSchema>;
      }) => Promise<CustomFormState<TSchema, TResult>>;
};

type FormActionWithParams<TSchema extends z.ZodTypeAny, TResult, TParams> = (
  params: TParams,
  state: CustomFormState<TSchema, TResult>,
  formData: FormData
) => Promise<CustomFormState<TSchema, TResult>>;

type FormActionWithoutParams<TSchema extends z.ZodTypeAny, TResult> = (
  state: CustomFormState<TSchema, TResult>,
  formData: FormData
) => Promise<CustomFormState<TSchema, TResult>>;

type FormAction<
  TSchema extends z.ZodTypeAny,
  TResult,
  TParams,
  THasParams extends boolean
> = THasParams extends true
  ? FormActionWithParams<TSchema, TResult, TParams>
  : FormActionWithoutParams<TSchema, TResult>;

/**
 * @description
 * Creates a form action that validates the form data.
 * If you want to create a form action that returns a result, use {@link createFormActionWithResult}.
 * @example
 * // Action without additional parameters
 * const signInAction = createFormAction({
 *   schema: z.object({ email: z.string().email(), password: z.string().min(8) }),
 *   action: async (state, data) => {
 *     // data is already validated and is a POJO.
 *     return {
 *       status: 'success',
 *       message: `User ${data.email} signed in successfully`
 *     }
 *   }
 * })
 *
 * // using it with React's `useForm` hook:
 * const [state, action] = useForm(signInAction, null)
 *
 * @example
 * // Action with additional parameters
 * const updateUserEmailAction = createFormAction({
 *   schema: z.object({ email: z.string().email() }),
 *   hasParams: true,
 *   action: async (params: {userId: int}, state, data) => {
 *     // data is already validated and is a POJO.
 *     // sign user in...
 *     return {
 *       status: 'success',
 *       message: `User ${params.userId} updated their email to ${data.email}`
 *     }
 *   }
 * })
 *
 * // using it with React's `useForm` hook:
 * const [state, action] = useForm(updateUserEmailAction.bind(null, {userId: 1}), null)
 * @param options Options to create the action
 * @returns A server action
 */
export function createFormAction<
  TSchema extends z.ZodTypeAny,
  TParams,
  THasParams extends boolean = false
>(
  options: FormActionOptions<TSchema, never, TParams, THasParams>
): FormAction<TSchema, never, TParams, THasParams> {
  const {
    schema,
    hasParams,
    action,
    formDataConverter = Object.fromEntries,
  } = options;

  // @ts-expect-error - DANGEROUS: This is a hack to make the function signature work
  return async (
    ...args: Parameters<FormAction<TSchema, never, TParams, THasParams>>
  ) => {
    // we know that we have either 2 or 3 arguments
    // 2 arguments: [state, formData]
    // 3 arguments: [params, state, formData]
    if (args.length === 2) {
      // if we only have 2 arguments, we prepend null so we can destructure the arguments later
      args.unshift(null);
    }

    // now we are sure that we have 3 arguments
    const [params, state, formData] = args as [
      TParams | null,
      CustomFormState<TSchema, never>,
      FormData
    ];

    const values = formDataConverter(formData);

    const parsed = await schema.safeParseAsync(values);

    if (!parsed.success) {
      return {
        status: "error",
        errors: parsed.error.flatten(),
      };
    }

    if (hasParams) {
      return action({
        params: params as TParams,
        state,
        data: parsed.data,
      });
    }

    // @ts-expect-error - DANGEROUS: This is a hack to make the function signature work
    return action({
      state,
      data: parsed.data,
    });
  };
}

/**
 * Creates a form action that validates the form data. Supports a result type.
 * @example
 * // notice the extra parenthesis when calling the function                             \/
 * const myAction = createFormActionWithResult<{id: number; text: string; done: boolean}>()({
 *   schema: z.object({ text: z.string(), done: z.boolean() }),
 *   action: async (state, data) => {
 *     // data is already validated and is a POJO.
 *     console.log(data.email);
 *     // state.result is typed
 *     console.log(state.result?.id)
 *   }
 * })
 * @param options Options to create the action
 * @returns A server action
 */
export function createFormActionWithResult<TResult>() {
  return createFormAction as <
    TSchema extends z.ZodTypeAny,
    TParams,
    THasParams extends boolean = false
  >(
    options: FormActionOptions<TSchema, TResult, TParams, THasParams>
  ) => FormAction<TSchema, TResult, TParams, THasParams>;
}
