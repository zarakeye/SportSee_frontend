import { useEffect, useState } from 'react';
import { getUserPerformance } from '../services/api.service';

export interface UserPerformance {
  id: number;
  kind: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
  };
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

/**
 * Fetches the performance data for a user by their ID and updates the state.
 * Sets loading to true and clears any previous errors before attempting to fetch the data.
 * If successful, updates the userPerformance state with the fetched data.
 * If an error occurs, logs the error and sets an error message in the state.
 * Finally, sets loading to false once the operation is complete.
 *
 * @param {string} id - The ID of the user whose performance data is being fetched.
 */
  const fetchUserPerformance = async(id: string) => {
    setLoading(true);
    setError(null);

    try {
      const performance = await getUserPerformance(Number(id));
      setUserPerformance(performance.data);
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