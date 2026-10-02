const API_BASE_URL = 'https://localhost:7268/api';

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Authentication required. Please sign in.');
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (response.status === 401) {
    const error = new Error('Your session has expired. Please sign in again.');
    error.status = 401;
    throw error;
  }

  if (response.status === 403) {
    const error = new Error('Access denied. Admin permissions are required.');
    error.status = 403;
    throw error;
  }

  return response;
}