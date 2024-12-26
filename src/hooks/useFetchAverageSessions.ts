import { useEffect, useState } from 'react';
import { getUserAverageSessions } from '../services/userService';

export interface UserAverageSessions {
  id: number;
  sessions: {
    day: number;
    sessionLength: number;
  }[];
}

export interface UserAverageSessionsApi {
  data: UserAverageSessions
}

export const API_URL = import.meta.env.VITE_API_URL;

const useFetchAverageSessions = (id: string) => {
  const [userAverageSessions, setUserAverageSessions] = useState<UserAverageSessions | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUserAverageSessions = async(id: string) => {
    setLoading(true);
    setError(null);

    try {
      const averageSessions = await getUserAverageSessions(Number(id));
      setUserAverageSessions(averageSessions.data);
    } catch (err) {
      const error = err as Error;
      console.error(`Error while connecting to the API(${API_URL}/user/${id}/average-sessions): ${error.message}`);
      const errorMessage = `Impossible to fetch data. Please check if backend is running on ${API_URL} and if the endpoint is correct.`;
      setError(new Error(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAverageSessions(id);
  }, [id]);

  return { userAverageSessions, loading, error };
};

export default useFetchAverageSessions;