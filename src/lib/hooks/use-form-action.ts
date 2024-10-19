import { useState, useTransition } from "react";

export function useFormAction<TPayload, TReturn>(
  action: (payload: TPayload) => TReturn | Promise<TReturn>,
) {
  const [isPending, startTransition] = useTransition();
  const [returned, setReturned] = useState<TReturn | null>(null);

  async function handleSubmit(payload: TPayload) {
    startTransition(async () => {
      const result = await action(payload);

      setReturned(result);
    });
  }

  return [returned, handleSubmit, isPending] as const;
}
