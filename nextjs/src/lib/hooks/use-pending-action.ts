"use client";

import { useState, useTransition } from "react";

export function usePendingAction<State, Payload>(
  action: (
    state: Awaited<State> | null,
    payload: Payload
  ) => State | Promise<State>,
  initialState: Awaited<State> | null
) {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState(initialState);

  function dispatch(payload: Payload): void {
    startTransition(async () => {
      const result = await action(state, payload);

      setState(result);
    });
  }

  return [state, dispatch, isPending] as const;
}
