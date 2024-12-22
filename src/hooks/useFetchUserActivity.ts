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
      const response = await fetch(`${API_URL}/user/${id}/activity`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        } 
      });

      if (!response.ok) {
        throw new Error(`Http Error: ${response.status} - ${response.statusText}`);
      }

      const fetchData: UserActivityApi = await response.json();
      const sessions = fetchData.data;

      setUserActivity(sessions);
    } catch (err) {
      const error = err as Error;
      console.error(`Error while connecting to the API(${API_URL}/user/${id}/activity): ${error.message}`);
      const errorMessage = `Impossible to fetch data. Please check if backend is running on ${API_URL} and if the endpoint is correct.`;
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