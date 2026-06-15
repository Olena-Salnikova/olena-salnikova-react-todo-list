import { Link } from 'react-router';
import styles from './TodosPage.module.css';

function NotFoundPage() {
  return (
    <div className={styles.container} style={{ textAlign: 'center', padding: '40px 24px' }}>
      <h2 className={styles.title} style={{ color: '#e53e3e', marginBottom: '16px' }}>
        404: Page Not Found
      </h2>
      <p style={{ color: '#4a5568', fontSize: '1.1rem', marginBottom: '28px', lineHeight: '1.5' }}>
        Oops! The destination you are trying to reach does not exist.
      </p>
      <div>
        <Link 
          to="/" 
          className={styles.errorBtn} 
          style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none', 
            color: '#3182ce', 
            borderColor: '#3182ce',
            padding: '0 24px',
            fontWeight: '600'
          }}
        >
          Back to Home Page
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;