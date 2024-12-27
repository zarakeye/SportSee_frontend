import { useEffect, useState } from "react";
import { getUserActivity } from "../services/api.service";

export interface UserActivity {
  id: number;
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

/**
 * Custom hook to fetch user activity data from the API.
 *
 * @param {string} id - The ID of the user whose activity data is being fetched.
 * @returns {{ userActivity: UserActivity | null, loading: boolean, error: Error | null }}
 * The userActivity prop contains the activity data for the user, or null if the data has not been loaded yet.
 * The loading prop is true if the data is currently being loaded, and false otherwise.
 * The error prop contains any error that may have occurred while loading the data, or null if no error occurred.
 */
const useFetchUserActivity = (id: string) => {
  const [userActivity, setUserActivity] = useState<UserActivity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

/**
 * Fetches the activity data for a user by their ID and updates the state.
 * Sets loading to true and clears any previous errors before attempting to fetch the data.
 * If successful, updates the userActivity state with the fetched data.
 * If an error occurs, logs the error and sets an error message in the state.
 * Finally, sets loading to false once the operation is complete.
 *
 * @param {string} id - The ID of the user whose activity data is being fetched.
 */
  const fetchUserActivity = async(id: string) => {
    setLoading(true);
    setError(null);

    try {
      const activity = await getUserActivity(Number(id));
      setUserActivity(activity.data);
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