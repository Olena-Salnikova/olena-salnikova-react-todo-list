import styles from './TodosPage.module.css'; // Импортируем готовые премиум-стили контейнера!

function AboutPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title} style={{ textAlign: 'left', marginBottom: '20px' }}>
        About Todo Application
      </h2>
      <p style={{ color: '#4a5568', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '24px' }}>
        Welcome to our modern Todo Application! This platform is designed to help you 
        organize your daily schedule, manage critical tasks, and observe productivity metrics.
      </p>

      <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', color: '#2d3748' }}>
        Key Features
      </h3>
      <ul style={{ 
        lineHeight: '1.8', 
        paddingLeft: '20px', 
        color: '#4a5568', 
        marginBottom: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <li><strong>Secure Authentication</strong> — Protect your data with custom user sessions.</li>
        <li><strong>Real-time CRUD Operations</strong> — Create, view, update, and remove tasks instantly.</li>
        <li><strong>URL-Based Filtering</strong> — Bookmark or share custom list states directly via search params.</li>
        <li><strong>Detailed Analytics</strong> — Monitor total, active, and completed task rates.</li>
      </ul>

      <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', color: '#2d3748' }}>
        Technologies Used
      </h3>
      <ul style={{ 
        lineHeight: '1.8', 
        paddingLeft: '20px', 
        color: '#4a5568',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <li><strong>React (v18+)</strong> — Component-driven interface development.</li>
        <li><strong>React Router (v7)</strong> — Declarative single-page application navigation.</li>
        <li><strong>Vite</strong> — Fast frontend tooling and building framework.</li>
      </ul>
    </div>
  );
}

export default AboutPage;