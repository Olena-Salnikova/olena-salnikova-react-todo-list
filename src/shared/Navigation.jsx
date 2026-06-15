import { NavLink } from 'react-router';
import { useAuth } from '../hooks/useAuth.jsx';
import styles from './Navigation.module.css';

function Navigation() {
  const { isAuthenticated } = useAuth();

  // Define a function to style the active navigation link
  const navLinkStyle = ({ isActive }) => ({
    fontWeight: isActive ? '700' : '500',
    color: isActive ? '#3182ce' : '#4a5568',
    borderBottom: isActive ? '2px solid #3182ce' : '2px solid transparent',
  });

  return (
    <nav style={{ marginTop: '0.5rem' }}>
      <ul className={styles.navList}>
    
        {/* "About" link is always visible */}
        <li>
          <NavLink to="/about" style={navLinkStyle} className={styles.link}>
            About
          </NavLink>
        </li>

        {/* Links for authenticated users */}
        {isAuthenticated && (
          <>
            <li>
              <NavLink to="/todos" style={navLinkStyle} className={styles.link}>
                Todos
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" style={navLinkStyle} className={styles.link}>
                Profile
              </NavLink>
            </li>
          </>
        )}

        {/* "Login" link is visible only to unauthenticated users */}
        {!isAuthenticated && (
          <li>
            <NavLink to="/login" style={navLinkStyle} className={styles.link}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;