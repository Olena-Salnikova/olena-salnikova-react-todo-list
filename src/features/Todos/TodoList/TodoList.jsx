import { useMemo } from 'react';
import TodoListItem from './TodoListItem.jsx';

function TodoList({
  todoList,
  onUpdateTodo,
  onCompleteTodo,
  dataVersion,
  statusFilter = 'all', // Add prop with default value 'all'
}) {
  // Filter the todo list based on the statusFilter prop using useMemo for optimization
  const filteredTodoList = useMemo(() => {
    let filteredTodos;
    switch (statusFilter) {
      case 'completed':
        filteredTodos = todoList.filter((todo) => todo.isCompleted);
        break;
      case 'active':
        filteredTodos = todoList.filter((todo) => !todo.isCompleted);
        break;
      case 'all':
      default:
        filteredTodos = todoList;
        break;
    }

    return {
      version: dataVersion,
      todos: filteredTodos,
    };
  }, [todoList, dataVersion, statusFilter]);

  // Display a smart message based on the selected filter
  const getEmptyMessage = () => {
    switch (statusFilter) {
      case 'completed':
        return 'No completed todos yet. Complete some tasks to see them here.';
      case 'active':
        return 'No active todos. Add a todo above to get started.';
      case 'all':
      default:
        return 'Add todo above to get started.';
    }
  };

  return filteredTodoList.todos.length === 0 ? (
    <p>{getEmptyMessage()}</p>
  ) : (
    <ul>
      {filteredTodoList.todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onUpdateTodo={onUpdateTodo}
          onCompleteTodo={onCompleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;