import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.jsx';
import styles from '../pages/TodosPage.module.css';

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
      <button 
        type="button" 
        onClick={handleLogoff} 
        disabled={isLoggingOff}
        style={{
          minHeight: '44px',
          padding: '0 16px',
          backgroundColor: '#3182ce',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '0.9rem',
          fontWeight: '600',
          cursor: isLoggingOff ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          whiteSpace: 'nowrap'
        }}
        onMouseEnter={(e) => {
          if (!isLoggingOff) e.target.style.backgroundColor = '#2b6cb0';
        }}
        onMouseLeave={(e) => {
          if (!isLoggingOff) e.target.style.backgroundColor = '#3182ce';
        }}
      >
        {isLoggingOff ? 'Logging out...' : 'Log Off'}
      </button>

      {/* Error message */}
      {logoffError && (
        <div className={styles.errorBox} style={{ marginTop: 8, padding: '8px 12px' }}>
          <span>{logoffError}</span>
        </div>
      )}
    </>
  );
}

export default Logoff;