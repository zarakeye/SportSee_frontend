import { config } from "./config";

export const fetchData = async <T>(endpoint: string): Promise<T> => {
  if (config.USE_MOCK_DATA) {
    throw new Error(`Mock data not found for endpoint ${endpoint}`);
  }

  console.log(`Fetching data from ${config.API_URL}${endpoint}`);
  const response = await fetch(`${config.API_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Http Error: ${response.status} - ${response.statusText}`);
  }

  return response.json();
};

