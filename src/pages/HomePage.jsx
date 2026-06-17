import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.jsx'; // Use the correct path to useAuth hook
import styles from './TodosPage.module.css';

function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todos', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.container}>
      {/* Centered loading state during redirect */}
      <div className={styles.loadingBox}>
        <div className={styles.spinner}></div>
        <span>Redirecting...</span>
      </div>
    </div>
  );
}

export default HomePage;