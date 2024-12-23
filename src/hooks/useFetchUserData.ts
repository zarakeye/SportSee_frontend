import { useEffect, useState } from "react";
import { User } from "../services/types";
import {getUserData} from '../services/userService';

export interface UserApi {
  data: User;
}

interface UseFetchUserDataReturn {
  userData: User | null;
  loading: boolean;
  error: Error | null;
}

export const API_URL = import.meta.env.VITE_API_URL;

const useFetchUserData = (id: string): UseFetchUserDataReturn => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = async(id: string) => {
    setLoading(true);
    setError(null);

    try {
      const user = await getUserData(Number(id));
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