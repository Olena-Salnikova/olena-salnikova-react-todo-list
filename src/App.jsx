import './App.css'
import { useState } from 'react';
import TodoList from './TodoList.jsx';
import TodoForm from './TodoForm.jsx';

function App() {
  const [todoList, setTodoList] = useState([]);

  // Adds a new todo to the start of the list
  function addTodo(todoTitle) {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
    };
    setTodoList(previous => [newTodo, ...previous]);
  }
  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  )
}

export default App;