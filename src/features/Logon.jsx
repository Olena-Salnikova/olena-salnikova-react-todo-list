import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';

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
    } finally {
      setIsLoggingOn(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Error message, if any */}
      {authError && (
        <div style={{ color: 'red', marginBottom: 10 }}>
          {authError}
        </div>
      )}

      {/* Email field */}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={isLoggingOn}
        />
      </div>

      {/* Password field */}
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={isLoggingOn}
        />
      </div>

      {/* Button — disables during login, changes text */}
      <button type="submit" disabled={isLoggingOn}>
        {isLoggingOn ? "Logging in..." : "Log On"}
      </button>
    </form>
  );
}

export default Logon;