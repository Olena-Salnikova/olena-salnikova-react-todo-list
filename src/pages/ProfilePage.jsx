import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import styles from './TodosPage.module.css';

function ProfilePage() {
  const { token, email } = useAuth();
  const username = email && email.includes('@') ? email.split('@')[0] : (email || 'User');
  const [todoStats, setTodoStats] = useState({ total: 0, completed: 0, active: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTodoStats() {
      if (!token) return;

      try {
        setLoading(true);
        setError('');

        const options = {
          method: 'GET',
          headers: { 'X-CSRF-TOKEN': token },
          credentials: 'include',
        };

        const response = await fetch('/api/tasks', options);

        if (response.status === 401) {
          throw new Error('Unauthorized');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }

        const data = await response.json();
        const todos = data.tasks || []; // Get the array of tasks

        // Calculate statistics
        const total = todos.length;
        const completed = todos.filter((todo) => todo.isCompleted).length;
        const active = total - completed;

        setTodoStats({ total, completed, active });
      } catch {
        setError('Error loading statistics. Please check your connection or try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchTodoStats();
  }, [token]);

  // Calculate completion percentage
  const completionPercentage = todoStats.total > 0 
    ? Math.round((todoStats.completed / todoStats.total) * 100) 
    : 0;

  if (loading) return <div style={{ padding: '1rem' }}>Loading statistics...</div>;
  if (error) return <div style={{ padding: '1rem', color: 'red' }}>{error}</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title} style={{ textAlign: 'left', marginBottom: '20px' }}>
        User Profile
      </h2>
      
      <div style={{ marginBottom: '24px', lineHeight: '1.6' }}>
        <p style={{ margin: '8px 0' }}><strong>Name:</strong> {username}</p>
        <p style={{ margin: '8px 0' }}><strong>Email:</strong> {email || 'Not available'}</p>
        <p style={{ margin: '8px 0' }}><strong>Status:</strong> <span style={{ color: '#38a169', fontWeight: '600' }}>Authenticated Account</span></p>
      </div>

      <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '14px', color: '#2d3748' }}>
        Todo Statistics
      </h3>
      
      <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', background: '#f7fafc' }}>
        <p style={{ margin: '8px 0', display: 'flex', justifyContent: 'space-between' }}>
          <span>Total Tasks:</span> <strong>{todoStats.total}</strong>
        </p>
        <p style={{ margin: '8px 0', display: 'flex', justifyContent: 'space-between' }}>
          <span>Active Tasks:</span> <strong style={{ color: '#dd6b20' }}>{todoStats.active}</strong>
        </p>
        <p style={{ margin: '8px 0', display: 'flex', justifyContent: 'space-between' }}>
          <span>Completed Tasks:</span> <strong style={{ color: '#3182ce' }}>{todoStats.completed}</strong>
        </p>
        
        {todoStats.total > 0 && (
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
            <p style={{ margin: '0 0 8px 0', display: 'flex', justifyContent: 'space-between' }}>
              <span>Completion Rate:</span> <strong>{completionPercentage}%</strong>
            </p>
            
            <div style={{ width: '100%', backgroundColor: '#e2e8f0', borderRadius: '6px', height: '10px', overflow: 'hidden' }}>
              <div style={{ width: `${completionPercentage}%`, backgroundColor: '#3182ce', height: '10px', transition: 'width 0.3s ease' }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;