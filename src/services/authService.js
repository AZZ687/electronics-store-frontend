const API_BASE_URL = 'https://localhost:7268/api';

/**
 * Authenticates user credentials against the ASP.NET Core backend.
 * @param {Object} credentials - { email, password }
 * @returns {Promise<{ message: string, token: string, userId: number, fullName: string, email: string, role: string }>}
 */
export async function login({ email, password }) {
  try {
    const response = await fetch(`${API_BASE_URL}/Auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      let errorMessage = 'Invalid email or password. Please try again.';

      try {
        const errorData = await response.json();

        errorMessage =
          errorData.message ||
          errorData.title ||
          (errorData.errors
            ? Object.values(errorData.errors).flat().join(', ')
            : null) ||
          errorMessage;
      } catch {
        const text = await response.text();

        if (text) {
          errorMessage = text;
        }
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error(
        'Unable to connect to the backend at https://localhost:7268. Please ensure the backend server is running and its SSL certificate is trusted in your browser.'
      );
    }

    throw error;
  }
}

/**
 * Registers a new customer account.
 * @param {Object} userData - { fullName, email, password }
 * @returns {Promise<Object>}
 */
export async function register({ fullName, email, password }) {
  try {
    const response = await fetch(`${API_BASE_URL}/Auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
      }),
    });

    if (!response.ok) {
      let errorMessage = 'Unable to create the account. Please try again.';

      try {
        const errorData = await response.json();

        errorMessage =
          errorData.message ||
          errorData.title ||
          (errorData.errors
            ? Object.values(errorData.errors).flat().join(', ')
            : null) ||
          errorMessage;
      } catch {
        const text = await response.text();

        if (text) {
          errorMessage = text;
        }
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error(
        'Unable to connect to the backend at https://localhost:7268. Please ensure the backend server is running and its SSL certificate is trusted in your browser.'
      );
    }

    throw error;
  }
}

/**
 * Retrieves the stored JWT token.
 * @returns {string|null}
 */
export function getStoredToken() {
  return localStorage.getItem('token');
}

/**
 * Retrieves the stored user details.
 * @returns {Object|null}
 */
export function getStoredUser() {
  const user = localStorage.getItem('user');

  try {
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

/**
 * Removes auth credentials from local storage.
 */
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}