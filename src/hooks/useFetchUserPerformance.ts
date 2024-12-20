import { useEffect, useState } from 'react';

export interface UserPerformance {
  userId: number;
  kind: string[];
  data: {
    value: number;
    kind: number;
  }[];
}

export interface UserPerformanceApi {
  data: UserPerformance
}

export interface UserPerformancesReturn {
  userPerformance: UserPerformance | null;
  loading: boolean;
  error: Error | null;
}

const useFetchUserPerformance = (id: string) => {
  const [userPerformance, setUserPerformance] = useState<UserPerformance | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUserPerformance = async(id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/user/${id}/performance`);

      if (!response.ok) {
        throw new Error(`Http Error: ${response.status} - ${response.statusText}`);
      }

      const fetchData: UserPerformanceApi = await response.json();
      const data = fetchData.data;

      setUserPerformance(data);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        console.log('Fetch aborted');
        return;
      }

      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error("Fetch error:", errorMessage);
      setError(new Error(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPerformance(id);
  }, [id]);

  return { userPerformance, loading, error};
};

export default useFetchUserPerformance;