import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UseFetcherOptions<TFetcher extends (...args: any[]) => any> = {
  fetcher: TFetcher;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UseFetcherReturn<TFetcher extends (...args: any[]) => any> =
  | {
      refetch: (...args: Parameters<TFetcher>) => Promise<void>;
      error: null;
      data: null;
      isPending: true;
    }
  | {
      refetch: (...args: Parameters<TFetcher>) => Promise<void>;
      error: unknown;
      data: Awaited<ReturnType<TFetcher>>;
      isPending: false;
    };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFetcher<TFetcher extends (...args: any[]) => any>(
  options: UseFetcherOptions<TFetcher>
): UseFetcherReturn<TFetcher> {
  const { fetcher } = options;

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const [data, setData] = useState<Awaited<ReturnType<TFetcher>> | null>(null);

  async function refetch(...args: Parameters<TFetcher>) {
    setIsPending(true);

    try {
      const data = await fetcher(...args);
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsPending(false);
    }
  }

  // @ts-expect-error - typing hack
  return { isPending, error, data, refetch };
}
