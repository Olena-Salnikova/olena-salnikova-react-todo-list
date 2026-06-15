import { useAuth } from '../hooks/useAuth.jsx';
import Logoff from '../features/Logoff.jsx';
import Navigation from './Navigation.jsx';
import styles from './Header.module.css';

function Header() {
  const { isAuthenticated, email } = useAuth();
  const username = email && email.includes('@') ? email.split('@')[0] : (email || 'User');

  return (
    <header className={styles.headerBar}>
      {/* Left section: Logo and navigation */}
      <div className={styles.navSection}>
        <h1 className={styles.logo}>Todo List</h1>
        {/* Render navigation links */}
        <Navigation /> 
      </div>

      {/* Right section: Capsule with logout button */}
      {isAuthenticated && (
        <div className={styles.userSection}>
          {email && (
            <span className={styles.welcomeText}>
              Welcome, <strong>{username}</strong>
            </span>
          )}
          <Logoff />
        </div>
      )}
    </header>
  );
}

export default Header;