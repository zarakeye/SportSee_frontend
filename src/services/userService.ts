import { mockUserData, mockUserActivity, mockUserAverageSessions, mockUserPerformance } from "./mockData";
import { config } from "./config";
import type { UserData, ActivityData, AverageSessionsData, PerformanceData } from "./types";
import { fetchData } from "./api";

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