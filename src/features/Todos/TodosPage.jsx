import { useEffect, useState } from 'react';
import TodoForm from './TodoForm.jsx';
import TodoList from './TodoList/TodoList.jsx';

function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState('');
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  useEffect(() => {
    // Only fetch todos if token is available
    if (!token) return;

    // Async function to fetch todos from the server
    async function fetchTodos() {
      setIsTodoListLoading(true);
      setError('');
      try {
        const response = await fetch('/api/tasks', {
          method: 'GET',
          headers: {
            'X-CSRF-TOKEN': token
          },
          credentials: 'include'
        });

        if (response.status === 401) {
          throw new Error('unauthorized');
        }
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();
        // Expecting data.tasks — an array of tasks
        setTodoList(data.tasks || []);
      } catch (err) {
        setError(err.message || 'Error fetching todos');
      } finally {
        setIsTodoListLoading(false);
      }
    }

    fetchTodos();
  }, [token]);

  // Async function to add a new todo
  async function addTodo(todoTitle) {
    setError(''); // Clear previous errors
    const tempTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };
    // Optimistically add the new todo
    setTodoList(prev => [tempTodo, ...prev]);
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({ title: todoTitle, isCompleted: false }),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      const data = await response.json();
      const realTodo = data;
      setTodoList(prev =>
        prev.map(todo => (todo.id === tempTodo.id ? realTodo : todo))
      );
    } catch (err) {
      setTodoList(prev => prev.filter(todo => todo.id !== tempTodo.id));
      setError(err.message || 'Failed to add todo');
    }
  }

  // Function to update an existing todo
  async function updateTodo(editedTodo) {
    setError('');
    const originalTodo = todoList.find(todo => todo.id === editedTodo.id);
    if (!originalTodo) return;

    // Optimistic update
    setTodoList(prev =>
      prev.map(todo =>
        todo.id === editedTodo.id ? { ...todo, ...editedTodo } : todo
      )
    );

    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
          createdAt: originalTodo.createdAt
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      // Optionally, you can update the state based on the server response 
      // if it returns the updated todo
    } catch (err) {
      setError(err.message || 'Failed to update todo');
      setTodoList(prev =>
        prev.map(todo => (todo.id === editedTodo.id ? originalTodo : todo))
      );
    }
  }

  // Function to mark a todo as completed
  async function completeTodo(id) {
    setError('');
    const originalTodo = todoList.find(todo => todo.id === id);
    if (!originalTodo) return;

    // Optimistically update the UI
    setTodoList(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          isCompleted: true,
          createdAt: originalTodo.createdAt
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to complete todo');
      }

      // if the server returns a new todo — you can update the state based on the response (optional)
    } catch (err) {
      setError(err.message || 'Failed to complete todo');
      // Rollback: revert to the original
      setTodoList(prev =>
        prev.map(todo => (todo.id === id ? originalTodo : todo))
      );
    }
  }

  // Render the component
  return (
    <div>
      <h1>My Todos</h1>

      {/* Error section */}
      {error && (
        <div style={{ color: 'red', marginBottom: 8 }}>
          {error}
          <button
            style={{ marginLeft: 8 }}
            onClick={() => setError('')}
            type="button"
          >
            Clear Error
          </button>
        </div>
      )}

      {/* Loading indicator */}
      {isTodoListLoading && (
        <div style={{ marginBottom: 8 }}>Loading...</div>
      )}

      {/* Form and todo list */}
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={todoList}
        onUpdateTodo={updateTodo}
        onCompleteTodo={completeTodo}
      />
    </div>
  );
}

export default TodosPage;