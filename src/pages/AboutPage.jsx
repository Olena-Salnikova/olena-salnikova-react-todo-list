function AboutPage() {
  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
      <h2>About Todo Application</h2>
      <p>
        Welcome to our modern Todo Application! This platform is designed to help you 
        organize your daily schedule, manage critical tasks, and observe productivity metrics.
      </p>

      <h3>Key Features</h3>
      <ul style={{ lineHeight: '1.6' }}>
        <li><strong>Secure Authentication</strong> — Protect your data with custom user sessions.</li>
        <li><strong>Real-time CRUD Operations</strong> — Create, view, update, and remove tasks instantly.</li>
        <li><strong>URL-Based Filtering</strong> — Bookmark or share custom list states directly via search params.</li>
        <li><strong>Detailed Analytics</strong> — Monitor total, active, and completed task rates.</li>
      </ul>

      <h3>Technologies Used</h3>
      <ul style={{ lineHeight: '1.6' }}>
        <li><strong>React (v18+)</strong> — Component-driven interface development.</li>
        <li><strong>React Router (v7)</strong> — Declarative single-page application navigation.</li>
        <li><strong>Vite</strong> — Fast frontend tooling and building framework.</li>
      </ul>
    </div>
  );
}

export default AboutPage;