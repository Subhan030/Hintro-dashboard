import { useState, useEffect, useCallback } from 'react';
import { useUser } from '../context/UserContext';
import { ApiError } from '../api/client';

export function useApi<T>(fetcher: (userId: string) => Promise<T>) {
  const { userId } = useUser();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher(userId);
      setData(result);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [fetcher, userId]);

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refetch: execute };
}
