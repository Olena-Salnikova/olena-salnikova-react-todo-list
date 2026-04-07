import './App.css'

function App() {
// Create an array of todoList
const todoList = [
    {id: 1, title: "review resources"},
    {id: 2, title: "take notes"},
    {id: 3, title: "code out app"},
]
// Render the todoList in an unordered list  
  return (
    <div>
      <h1>My Todos</h1>
      <ul>
        {todoList.map(todo => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    </div>
  )
}

export default App
