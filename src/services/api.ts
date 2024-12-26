import { config } from "./config";

  /**
   * Fetches data from the specified endpoint.
   * @param endpoint The endpoint to fetch from (should not include the domain)
   * @returns The response body as JSON
   * @throws If the response status is not 200 or if the data is not JSON
   */
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

