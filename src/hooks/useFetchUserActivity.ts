import { useEffect, useState } from "react";

export interface UserActivity {
  data: {
    userId: number;
    sessions: {
      day: string;
      kilogram: number;
      calories: number;
    }[];
  }
}

  /**
   * Fetches the user activity data for a user with the given id.
   * @param {string} id - The id of the user to fetch the activity for.
   * @returns {{userActivity: UserActivity | null, loading: boolean, error: Error | null}} - An object with the user activity data, a loading boolean, and an error if one occurred.
   */
const useFetchUserActivity = (id: string) => {
  const [userActivity, setUserActivity] = useState<UserActivity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Fetches the user activity data for a user with the given id.
   * Aborts the fetch if the component unmounts before the fetch is complete.
   * Updates the state with the response data or an error if the fetch fails.
   * @param {string} id - The id of the user to fetch the activity for.
   */
  const fetchUserActivity = async(id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/user/${id}/activity`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Accept": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Http Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      setUserActivity(data);
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