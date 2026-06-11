import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../hooks/useAuth.jsx';

function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  // Get the path from which the user was redirected (e.g., /todos),
  // or use /todos by default
  const from = location.state?.from?.pathname || '/todos';

  // Automatic redirect if the user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  async function handleSubmit(e) {
    e.preventDefault();
    setAuthError('');
    setIsLoggingOn(true);

    try {
      const result = await login(email, password);
      if (!result.success) {
        setAuthError(result.error);
      }
      // If login is successful, the useEffect will handle the redirection
    } catch {
      setAuthError('An unexpected error occurred.');
    } finally {
      setIsLoggingOn(false);
    }
  }

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {authError && (
          <div style={{ color: 'red', marginBottom: 10 }}>
            {authError}
          </div>
        )}

        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoggingOn}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoggingOn}
          />
        </div>

        <button type="submit" disabled={isLoggingOn}>
          {isLoggingOn ? 'Logging in...' : 'Log On'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;