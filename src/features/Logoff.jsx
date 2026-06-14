import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.jsx';

function Logoff() {
  const { logout } = useAuth();
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [isLoggingOff, setIsLoggingOff] = useState(false);
  const [logoffError, setLogoffError] = useState('');

  async function handleLogoff() {
    setLogoffError('');
    setIsLoggingOff(true);

    try {
      const result = await logout();

      if (result.success) {
        navigate('/login'); // Redirect to the login page on successful logout
      } else {
        setLogoffError(result.error || 'Logout failed');
        setIsLoggingOff(false); // Reset the loading flag only on error
      }
    } catch {
      setLogoffError('An unexpected error occurred during logout.');
      setIsLoggingOff(false);
    }
  }

  return (
    <>
      <button type="button" onClick={handleLogoff} disabled={isLoggingOff}>
        {isLoggingOff ? 'Logging out...' : 'Log Off'}
      </button>

      {logoffError && (
        <div style={{ color: 'red', marginTop: 8 }}>
          {logoffError}
        </div>
      )}
    </>
  );
}

export default Logoff;