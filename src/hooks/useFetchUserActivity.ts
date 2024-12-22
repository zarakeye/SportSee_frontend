import { useEffect, useState } from "react";

export interface UserActivity {
  userId: number;
  sessions: {
    day: string;
    kilogram: number;
    calories: number;
  }[];
}

export interface UserActivityApi {
  data: UserActivity
}

export const API_URL = import.meta.env.VITE_API_URL;

const useFetchUserActivity = (id: string) => {
  const [userActivity, setUserActivity] = useState<UserActivity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUserActivity = async(id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/user/${id}/activity`);

      if (!response.ok) {
        throw new Error(`Http Error: ${response.status} - ${response.statusText}`);
      }

      const fetchData: UserActivityApi = await response.json();
      const sessions = fetchData.data;

      setUserActivity(sessions);
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
    fetchUserActivity(id);
  }, [id]);

  return { userActivity, loading, error };
};

export default useFetchUserActivity;