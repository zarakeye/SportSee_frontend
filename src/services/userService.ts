import { mockUserData, mockUserActivity, mockUserAverageSessions, mockUserPerformance } from "./mockData";
import { config } from "./config";
import type { UserData, ActivityData, AverageSessionsData, PerformanceData } from "./types";
import { fetchData } from "./api";

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
  if (config.USE_MOCK_DATA) {
    const userData = mockUserData[id];
    if (!userData) {
      throw new Error(`Mock data not found for id ${id}`);
    }
    
    console.log('userData = mockUserData');
    return userData;
  }

  console.log('userData = fetchData');
  return fetchData<UserData>(`/user/${id}`);
};

/**
 * Fetches activity data for a user by their ID.
 * If mock data is enabled via configuration, it returns the mock data.
 * Otherwise, it fetches data from the API endpoint.
 * 
 * @param {number} id - The ID of the user whose activity data is being fetched.
 * @returns {Promise<ActivityData>} A promise that resolves to the user's activity data.
 * @throws Will throw an error if mock data is enabled and no mock data is found for the given ID.
 */
export const getUserActivity = async (id: number): Promise<ActivityData> => {
  if (config.USE_MOCK_DATA) {
    const userActivity = mockUserActivity[id];
    if (!userActivity) {
      throw new Error(`Mock data not found for id ${id}`);
    }

    console.log('userActivity = mockUserActivity');
    return userActivity;
  }

  console.log('userActivity = fetchData');
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
  if (config.USE_MOCK_DATA) {
    const userAverageSessions = mockUserAverageSessions[id];
    if (!userAverageSessions) {
      throw new Error(`Mock data not found for id ${id}`);
    }

    console.log('userAverageSessions = mockUserAverageSessions');
    return userAverageSessions;
  }

  console.log('userAverageSessions = fetchData');
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
  if (config.USE_MOCK_DATA) {
    const userPerformance = mockUserPerformance[id];
    if (!userPerformance) {
      throw new Error(`Mock data not found for id ${id}`);
    }

    console.log('userPerformance = mockUserPerformance');
    return userPerformance;
  }

  console.log('userPerformance = fetchData');
  return fetchData<PerformanceData>(`/user/${id}/performance`);
};