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

  /**
   * Fetches the average session lengths for a user from the API.
   *
   * @param {string} id The id of the user to fetch the average session lengths for.
   * @returns {{ userAverageSessions: UserAverageSessions | null, loading: boolean, error: Error | null }}
   * The userAverageSessions prop contains the average sessions data for the user, or null if the data has not been loaded yet.
   * The loading prop is true if the data is currently being loaded, and false otherwise.
   * The error prop contains any error that may have occurred while loading the data, or null if no error occurred.
   */
const useFetchAverageSessions = (id: string) => {
  const [userAverageSessions, setUserAverageSessions] = useState<UserAverageSessions | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

/**
 * Fetches the average session lengths for a user by their ID and updates the state.
 * Sets loading to true and clears any previous errors before attempting to fetch the data.
 * If successful, updates the userAverageSessions state with the fetched data.
 * If an error occurs, logs the error and sets an error message in the state.
 * Finally, sets loading to false once the operation is complete.
 *
 * @param {string} id - The ID of the user whose average session data is being fetched.
 */

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