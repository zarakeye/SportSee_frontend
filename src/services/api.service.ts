import { API_CONFIG } from "./api.config";
import type { UserData, ActivityData, AverageSessionsData, PerformanceData } from "./api.types";

const URL_BACKEND = import.meta.env.VITE_API_URL;
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';


/**
 * Fetches data from the API or mock server based on the provided endpoint.
 * Attempts to fetch data from the API using the given endpoint. If the request fails and
 * mock data is enabled, it falls back to fetching data from the mock server.
 * 
 * @template T The expected type of the data returned by the API.
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @returns {Promise<T>} A promise that resolves to the data of type T.
 * @throws Will throw an error if both the API and mock requests fail, or if the endpoint is invalid.
 */
export const fetchData = async <T>(endpoint: string): Promise<T> => {
  const splitedEndpoint = endpoint.trim().split('/');
  const userId = splitedEndpoint[2];
  let endpointName = '';

  if (splitedEndpoint.length === 4) {
    endpointName = `/${splitedEndpoint[3]}`;
  }

  try {
    const response = await fetch(`${URL_BACKEND}${endpoint}`);

    if (!response.ok) {
      throw new Error(`API request failed for ${endpointName} of user ${userId} with status: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    const error = err as Error;
    console.error(`Error while connecting to the API(${URL_BACKEND}${endpoint}): ${error.message}`);
    if (USE_MOCK_DATA) {
      console.log(`${err}:Fallback to mock data for ${endpointName} of user ${userId}`);
      const mockResponse = await fetch(`${API_CONFIG.mockBaseUrl}/${userId}${endpointName}.json`);
      if (!mockResponse.ok) {
        throw new Error(`Mock request failed for ${endpointName} of user ${userId} with status: ${mockResponse.status} - ${mockResponse.statusText}`);
      }

      return await mockResponse.json(); 
    }
  }
  throw new Error(`Failed to fetch data for ${endpointName} of user ${userId}`);
};

/**
 * Fetches user data by the provided user ID.
 * If mock data is enabled via configuration, it returns the mock data.
 * Otherwise, it fetches data from the API endpoint.
 *
 * @param {number} id - The ID of the user whose data is being fetched.
 * @returns {Promise<UserData>} A promise that resolves to the user data.
 * @throws Will throw an error if mock data is enabled and no mock data is found for the given ID.
 */
export const getUserData = async (id: number): Promise<UserData> => {
  const data = await fetchData<UserData>(`/user/${id}`);
  return data;
}

/**
 * Fetches the activity data for a user by their ID.
 * If mock data is enabled via configuration, it returns the mock data.
 * Otherwise, it fetches data from the API endpoint.
 *
 * @param {number} id - The ID of the user whose activity data is being fetched.
 * @returns {Promise<ActivityData>} A promise that resolves to the user's activity data.
 * @throws Will throw an error if mock data is enabled and no mock data is found for the given ID.
 */
export const getUserActivity = async (id: number): Promise<ActivityData> => {
  return fetchData<ActivityData>(`/user/${id}/activity`);
};

/**
 * Fetches average session data for a user by their ID.
 * If mock data is enabled via configuration, it returns the mock data.
 * Otherwise, it fetches data from the API endpoint.
 *
 * @param {number} id - The ID of the user whose average session data is being fetched.
 * @returns {Promise<AverageSessionsData>} A promise that resolves to the user's average session data.
 * @throws Will throw an error if mock data is enabled and no mock data is found for the given ID.
 */
export const getUserAverageSessions = async (id: number): Promise<AverageSessionsData> => {
  return fetchData<AverageSessionsData>(`/user/${id}/average-sessions`);
};

/**
 * Fetches the performance data for a user by their ID.
 * If mock data is enabled via configuration, it returns the mock data.
 * Otherwise, it fetches data from the API endpoint.
 *
 * @param {number} id - The ID of the user whose performance data is being fetched.
 * @returns {Promise<PerformanceData>} A promise that resolves to the user's performance data.
 * @throws Will throw an error if mock data is enabled and no mock data is found for the given ID.
 */
export const getUserPerformance = async (id: number): Promise<PerformanceData> => {
  return fetchData<PerformanceData>(`/user/${id}/performance`);
};
