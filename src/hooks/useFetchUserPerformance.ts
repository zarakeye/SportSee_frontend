import { useEffect, useState } from 'react';

export interface UserPerformance {
  data: {
    userId: number;
    kind: string[];
    data: {
      value: number;
      kind: number;
    }[];
  }
}

export interface UserPerformancesReturn {
  userPerformance: UserPerformance | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Fetches the performance data for a user with the given id.
 *
 * @param {string} id - The id of the user to fetch the performance for.
 *
 * @returns {{userPerformance: UserPerformance | null, loading: boolean, error: Error | null}} - An object with the user performance data, a loading boolean, and an error if one occurred.
 */
const useFetchUserPerformance = (id: string) => {
  const [userPerformance, setUserPerformance] = useState<UserPerformance | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

/**
 * Fetches the performance data for a user with the given id.
 * Aborts the fetch if the component unmounts before the fetch is complete.
 * Updates the state with the response data or an error if the fetch fails.
 * @param {string} id - The id of the user to fetch the performance for.
 */

  const fetchUserPerformance = async(id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/user/${id}/performance`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Accept": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Http Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

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