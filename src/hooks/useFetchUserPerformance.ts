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

export const API_URL = import.meta.env.VITE_API_URL;

const useFetchUserPerformance = (id: string) => {
  const [userPerformance, setUserPerformance] = useState<UserPerformance | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUserPerformance = async(id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/user/${id}/performance`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        } 
      });

      if (!response.ok) {
        throw new Error(`Http Error: ${response.status} - ${response.statusText}`);
      }

      const fetchData: UserPerformanceApi = await response.json();
      const data = fetchData.data;

      setUserPerformance(data);
    } catch (err) {
      const error = err as Error;
      console.error(`Error while connecting to the API(${API_URL}/user/${id}/performance): ${error.message}`);
      const errorMessage = `Impossible to fetch data. Please check if backend is running on ${API_URL} and if the endpoint is correct.`;
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