// utils/api.ts
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.NEXT_PUBLIC_VERCEL_URL 
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : '/'
  : 'http://localhost:3000';

export const apiFetch = (path: string, options?: RequestInit) => {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? API_BASE_URL
    : '';

  return fetch(`${baseUrl}${path}`, options);
};