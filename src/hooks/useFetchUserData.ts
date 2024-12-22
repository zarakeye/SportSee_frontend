import { useEffect, useState } from "react";

interface User {
  id: number;
  userInfos: {
    firstName: string;
    lastName: string;
    age: number;
  };
  todayScore?: number;
  score?: number;
  keyData: {
    calorieCount: number;
    proteinCount: number;
    carbohydrateCount: number;
    lipidCount: number;
  };
}

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
      const response = await fetch(`${API_URL}/user/${id}`);

      if (!response.ok) {
        throw new Error(`Http Error: ${response.status} - ${response.statusText}`);
      }

      const fetchData: UserApi = await response.json();


      setUserData(fetchData.data);
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
    fetchUser(id);
  }, [id]);

  return { userData, loading, error };
};

export default useFetchUserData;