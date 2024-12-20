import { useEffect, useState } from 'react';

export interface UserAverageSessions {
  userId: number;
  sessions: {
    day: number;
    sessionLength: number;
  }[];
}

export interface UserAverageSessionsApi {
  data: UserAverageSessions
}

const useFetchAverageSessions = (id: string) => {
  const [userAverageSessions, setUserAverageSessions] = useState<UserAverageSessions | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUserAverageSessions = async(id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/user/${id}/average-sessions`);

      if (!response.ok) {
        throw new Error(`Http Error: ${response.status} - ${response.statusText}`);
      }

      const fetchData: UserAverageSessionsApi = await response.json();
      const sessions = fetchData.data;

      setUserAverageSessions(sessions);
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
    fetchUserAverageSessions(id);
  }, [id]);

  return { userAverageSessions, loading, error };
};

export default useFetchAverageSessions;