// import { API_CONFIG } from "../services/api.config";
// import { useEffect, useState } from "react";

// const useFetchData = <T>(endpoint: string) => {
//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);

//   const splitedEndpoint = endpoint.split('/');
//   const userId = splitedEndpoint[2];
//   let endpointName = '';

//   if (splitedEndpoint.length === 4) {
//     endpointName = `/${splitedEndpoint[3]}`;
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => {
//         controller.abort();
//       }, API_CONFIG.timeoutDelay);

//       try {
//         const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
//           signal: controller.signal
//         });

//         if (!response.ok) {
//           throw new Error(`API request failed for ${endpointName} of user ${userId} with status: ${response.status} - ${response.statusText}`);
//         }

//         clearTimeout(timeoutId);
//         const data = await response.json();
//         setData(data);
//       } catch (err) {
//         const error = err as Error;
//         console.warn(`Fallback to mock data for ${endpointName} of user ${userId}`);
//         console.error(`Error while connecting to the API(${API_CONFIG.baseUrl}${endpoint}): ${error.message}`);
//         const errorMessage = `Impossible to fetch data. Please check if backend is running on ${API_CONFIG.baseUrl} and if the endpoint is correct.`;
//         setError(new Error(errorMessage));

//         try {
//           const mockResponse = await fetch(`${API_CONFIG.mockBaseUrl}/${userId}${endpoint}`);
//           const data = await mockResponse.json();
//           setData(data);
//         } catch (mockErr) {
//           const error = mockErr as Error;
//           console.error(`Error while connecting to the mock API(${API_CONFIG.mockBaseUrl}${endpoint}): ${error.message}`);
//           setError(new Error(errorMessage));
//         }
//       }

//       setLoading(false);
//     };

//     fetchData();
//   }, [endpoint, userId, endpointName]);

//   return { data, loading, error };
// };

// export default useFetchData;