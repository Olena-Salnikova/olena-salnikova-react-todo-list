import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../hooks/useAuth.jsx';
import TextInputWithLabel from '../shared/TextInputWithLabel.jsx';
import styles from './TodosPage.module.css';
import formStyles from '../features/Todos/TodoForm.module.css';

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
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {authError && (
          <div className={styles.errorBox} style={{ marginBottom: '4px' }}>
            <span>{authError}</span>
          </div>
        )}

        <TextInputWithLabel
          elementId="email"
          labelText="Email:"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoggingOn}
        />

        <TextInputWithLabel
          elementId="password"
          labelText="Password:"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoggingOn}
        />

        <button 
          type="submit" 
          className={formStyles.submitBtn}
          style={{ width: '100%', marginTop: '8px' }}
          disabled={isLoggingOn}
        >
          {isLoggingOn ? 'Logging in...' : 'Log On'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;