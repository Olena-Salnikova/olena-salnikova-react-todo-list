import { NavLink } from 'react-router';
import { useAuth } from '../hooks/useAuth.jsx';

function Navigation() {
  const { isAuthenticated } = useAuth();

  // Define a function to style the active navigation link
  const navLinkStyle = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
    textDecoration: isActive ? 'underline' : 'none',
    color: '#0066cc',
  });

  return (
    <nav style={{ marginTop: '0.5rem' }}>
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          gap: '1rem',
          padding: 0,
          margin: 0,
        }}
      >
        {/* "About" link is always visible */}
        <li>
          <NavLink to="/about" style={navLinkStyle}>
            About
          </NavLink>
        </li>

        {/* Links for authenticated users */}
        {isAuthenticated && (
          <>
            <li>
              <NavLink to="/todos" style={navLinkStyle}>
                Todos
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" style={navLinkStyle}>
                Profile
              </NavLink>
            </li>
          </>
        )}

        {/* "Login" link is visible only to unauthenticated users */}
        {!isAuthenticated && (
          <li>
            <NavLink to="/login" style={navLinkStyle}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;