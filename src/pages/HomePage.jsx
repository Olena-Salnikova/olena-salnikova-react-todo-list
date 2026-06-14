import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.jsx'; // Use the correct path to useAuth hook

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
    <div>
      <p>Redirecting...</p>
    </div>
  );
}

export default HomePage;