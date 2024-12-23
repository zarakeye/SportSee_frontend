import { config } from "./config";

const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const fetchData = async <T>(endpoint: string): Promise<T> => {
  if (config.USE_MOCK_DATA) {
    await delay(1000);
    throw new Error(`Mock data not found for endpoint ${endpoint}`);
  }

  console.log(`Fetching data from ${config.API_URL}${endpoint}`);
  const response = await fetch(`${config.API_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Http Error: ${response.status} - ${response.statusText}`);
  }

  return response.json();
};

