import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import TextInputWithLabel from './TextInputWithLabel.jsx';
import styles from '../pages/TodosPage.module.css';
import formStyles from '../features/Todos/TodoForm.module.css';

function Logon() {
  const { login } = useAuth();
  // email and password — input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // authError — error message if login fails
  const [authError, setAuthError] = useState('');
  // isLoggingOn — true when the login process is ongoing 
  // (for loader or disabling the button)
  const [isLoggingOn, setIsLoggingOn] = useState(false);
  
  // Async function to handle form submission
  async function handleSubmit(e) {
    e.preventDefault(); // to prevent page reload on form submit
    setAuthError('');
    setIsLoggingOn(true);

    try {
      const result = await login(email, password);

      if (!result.success) {
        setAuthError(result.error);
      }
    } catch {
      setAuthError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoggingOn(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      {/* Error message, if any */}
      {authError && (
        <div className={styles.errorBox} style={{ marginBottom: '4px' }}>
          <span>{authError}</span>
        </div>
      )}

      {/* Email field */}
      <TextInputWithLabel
        elementId="email"
        labelText="Email:"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={isLoggingOn}
      />

      {/* Password field */}
      <TextInputWithLabel
        elementId="password"
        labelText="Password:"
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
        disabled={isLoggingOn}
      />

      {/* Button — disables during login, changes text */}
      <button 
        type="submit" 
        className={formStyles.submitBtn}
        style={{ width: '100%', marginTop: '8px' }}
        disabled={isLoggingOn}
      >
        {isLoggingOn ? "Logging in..." : "Log On"}
      </button>
    </form>
  );
}

export default Logon;