import { useAuth } from '../hooks/useAuth.jsx';
import Logoff from '../features/Logoff.jsx';
import Navigation from './Navigation.jsx';

function Header() {
  const { isAuthenticated, email } = useAuth();

  return (
    <header style={{ paddingBottom: '1rem', borderBottom: '1px solid #eee', marginBottom: '1rem' }}>
      <h1>Todo List</h1>

      {/* Render navigation links */}
      <Navigation />

      {isAuthenticated && (
        <div style={{ marginTop: 12 }}>
          {email && <span style={{ marginRight: 8 }}>Welcome, {email}</span>}
          <Logoff />
        </div>
      )}
    </header>
  );
}

export default Header;