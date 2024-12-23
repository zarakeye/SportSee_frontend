export const config = {
  API_URL: import.meta.env.VITE_API_URL,
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA === 'true',
} as const;