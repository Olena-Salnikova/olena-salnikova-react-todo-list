import { NavLink } from 'react-router';
import { useAuth } from '../hooks/useAuth.jsx';
import styles from './Navigation.module.css';

function Navigation() {
  const { isAuthenticated } = useAuth();

  // Define a function to style the active navigation link
  const getNavLinkClass = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ''}`;

  return (
    <nav style={{ marginTop: '0.5rem' }}>
      <ul className={styles.navList}>
    
        {/* "About" link is always visible */}
        <li>
          <NavLink to="/about" className={getNavLinkClass}>
            About
          </NavLink>
        </li>

        {/* Links for authenticated users */}
        {isAuthenticated && (
          <>
            <li>
              <NavLink to="/todos" className={getNavLinkClass}>
                Todos
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className={getNavLinkClass}>
                Profile
              </NavLink>
            </li>
          </>
        )}

        {/* "Login" link is visible only to unauthenticated users */}
        {!isAuthenticated && (
          <li>
            <NavLink to="/login" className={getNavLinkClass}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;