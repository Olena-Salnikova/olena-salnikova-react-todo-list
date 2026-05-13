import './App.css'
import { useState } from 'react';
import TodoForm from './features/TodoForm.jsx';
import TodoList from './features/TodoList/TodoList.jsx';

function App() {
  const [todoList, setTodoList] = useState([]);

  // Adds a new todo to the start of the list
  function addTodo(todoTitle) {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false
    };
    setTodoList(previous => [newTodo, ...previous]);
  }

  function updateTodo(editedTodo) {
    const updatedTodos = todoList.map(todo =>
      todo.id === editedTodo.id ? { ...editedTodo } : todo
    );
    setTodoList(updatedTodos);
  }

  function completeTodo(id) {
    setTodoList(prevList =>
      prevList.map(todo =>
        todo.id === id
          ? { ...todo, isCompleted: true }
          : todo
      )
    );
  }

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList 
        todoList={todoList} 
        onUpdateTodo={updateTodo} 
        onCompleteTodo={completeTodo} 
      />
    </div>  
  )
}

export default App;