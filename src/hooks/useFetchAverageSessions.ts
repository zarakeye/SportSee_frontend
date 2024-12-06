import { useEffect, useState } from 'react';

export interface UserAverageSessions {
  data: {
    userId: number;
    sessions: {
      day: number;
      sessionLength: number;
    }[];
  }
}

const useFetchAverageSessions = (id: string) => {
  const [userAverageSessions, setUserAverageSessions] = useState<UserAverageSessions | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUserAverageSessions = async(id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/user/${id}/average-sessions`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Accept": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Http Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      setUserAverageSessions(data);
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