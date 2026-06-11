import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';

function ProfilePage() {
  const { token, user, email } = useAuth(); // Get user info and token from auth context
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
      } catch (err) {
        setError(`Error loading statistics: ${err.message}`);
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
    <div style={{ padding: '1rem', maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user?.name || email || 'User'}</p>
      <p><strong>Status:</strong> Authenticated Account</p>

      <h3 style={{ marginTop: '1.5rem' }}>Todo Statistics</h3>
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', background: '#f9f9f9' }}>
        <p>Total Tasks: <strong>{todoStats.total}</strong></p>
        <p>Active Tasks: <strong>{todoStats.active}</strong></p>
        <p>Completed Tasks: <strong>{todoStats.completed}</strong></p>
        
        {todoStats.total > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <p>Completion Rate: <strong>{completionPercentage}%</strong></p>
            <div style={{ width: '100%', backgroundColor: '#eee', borderRadius: '4px', height: '10px' }}>
              <div style={{ width: `${completionPercentage}%`, backgroundColor: '#4caf50', borderRadius: '4px', height: '10px' }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;