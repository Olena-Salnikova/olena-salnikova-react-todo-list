import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.jsx';

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
    return <div style={{ padding: '2rem' }}>Loading / Redirecting...</div>;
  }

  // If everything is fine, render the protected page
  return children;
}

export default RequireAuth;