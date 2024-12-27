import { useEffect, useState } from "react";
import { User } from "../services/api.types";
import {getUserData} from '../services/api.service';

export interface UserApi {
  data: User;
}

interface UseFetchUserDataReturn {
  userData: User | null;
  loading: boolean;
  error: Error | null;
}

export const API_URL = import.meta.env.VITE_API_URL;

/**
 * Custom hook to fetch user data from the API.
 *
 * @param {string} id - The ID of the user whose data is being fetched.
 * @returns {{ userData: User | null, loading: boolean, error: Error | null }}
 * The userData prop contains the user data, or null if the data has not been loaded yet.
 * The loading prop is true if the data is currently being loaded, and false otherwise.
 * The error prop contains any error that may have occurred while loading the data, or null if no error occurred.
 */
const useFetchUserData = (id: string): UseFetchUserDataReturn => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

/**
 * Fetches user data by the provided user ID and updates the state.
 * Sets loading to true and clears any previous errors before attempting to fetch the data.
 * If successful, updates the userData state with the fetched data.
 * If an error occurs, logs the error and sets an error message in the state.
 * Finally, sets loading to false once the operation is complete.
 *
 * @param {string} id - The ID of the user whose data is being fetched.
 */
  const fetchUser = async(id: string) => {
    setLoading(true);
    setError(null);

    try {
      const user = await getUserData(Number(id));
      
      console.log(`useFetchUserData: user: ${user}`);
      setUserData(user.data);
    } catch (err) {
      const error = err as Error;
      console.error(`Error while connecting to the API(${API_URL}/user/${id}): ${error.message}`);
      const errorMessage = `Impossible to fetch data. Please check if backend is running on ${API_URL} and if the endpoint is correct.`;
      setError(new Error(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(id);
  }, [id]);

  return { userData, loading, error };
};

export default useFetchUserData;