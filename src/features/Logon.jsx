import { useState } from 'react';

function Logon({ onSetEmail, onSetToken }) {
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
      const response = await fetch('/api/users/logon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // important for cookies and proxy
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.status === 200 && data.name && data.csrfToken) {
        onSetEmail(data.name);
        onSetToken(data.csrfToken);
      } else {
        setAuthError(`Authentication failed: ${data?.message || 'Unknown error'}`);
      }
    } catch (error) {
      setAuthError(`Error: ${error.name} | ${error.message}`);
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