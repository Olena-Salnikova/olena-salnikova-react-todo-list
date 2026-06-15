import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.jsx';
import styles from '../pages/TodosPage.module.css';

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // If not authenticated, redirect to login page and save the current location in state
      navigate('/login', { replace: true, state: { from: location } });
    }
  }, [isAuthenticated, navigate, location]);

  // While redirecting, show a loading placeholder
  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingBox}>
          <div className={styles.spinner}></div>
          <span>Loading / Redirecting...</span>
        </div>
      </div>
    );
  }

  // If everything is fine, render the protected page
  return children;
}

export default RequireAuth;