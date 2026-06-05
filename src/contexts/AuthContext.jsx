import { useState } from 'react';
import { AuthContext } from './authContext.js';

export function AuthProvider({ children }) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const login = async (userEmail, password) => {
    try {
      const response = await fetch('/api/users/logon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: userEmail, password }),
      });

      const data = await response.json();

      if (response.status === 200 && data.name && data.csrfToken) {
        setEmail(data.name);
        setToken(data.csrfToken);

        return { success: true };
      }

      return {
        success: false,
        error: `Authentication failed: ${data?.message || 'Unknown error'}`,
      };
    } catch {
      return {
        success: false,
        error: 'Network error during login',
      };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await fetch('/api/users/logoff', {
          method: 'POST',
          headers: {
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
        });
      }
    } catch {
      // ignore API failure, still clear local auth state
    } finally {
      setEmail('');
      setToken('');
    }

    return { success: true };
  };

  const value = {
    email,
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}