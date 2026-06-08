import { useAuth } from '../hooks/useAuth.jsx';
import Logoff from '../features/Logoff.jsx';

function Header() {
  const { isAuthenticated, email } = useAuth();

  return (
    <header>
      <h1>Todo List</h1>

      {isAuthenticated && (
        <div style={{ marginBottom: 12 }}>
          {email && <span style={{ marginRight: 8 }}>Welcome, {email}</span>}
          <Logoff />
        </div>
      )}
    </header>
  );
}

export default Header;