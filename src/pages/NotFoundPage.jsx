import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>404: Page Not Found</h2>
      <p>Oops! The destination you are trying to reach does not exist.</p>
      <div style={{ marginTop: '1.5rem' }}>
        <Link to="/" style={{ color: '#0066cc', fontWeight: 'bold' }}>
          Back to Home Page
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;