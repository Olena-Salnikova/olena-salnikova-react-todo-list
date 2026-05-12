import { useRef,  useState } from 'react';

function TodoForm({ onAddTodo }) {
  const inputRef = useRef();
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();

    const trimmedTitle = workingTodoTitle.trim();
    if (trimmedTitle) {
      onAddTodo(trimmedTitle);
      setWorkingTodoTitle(""); // Clear the input field
      inputRef.current.focus(); // Focus the input field after adding a todo
    }
  };
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo</label>
                <input
                    ref={inputRef}
                    type="text"
                    id="todoTitle"
                    name="todoTitle"
                    placeholder={'Todo text'}
                    required
                    value={workingTodoTitle}
                    onChange={e => setWorkingTodoTitle(e.target.value)}
                />
            <button type="submit" disabled={!workingTodoTitle.trim()}>Add Todo</button>
        </form>
    );
}

export default TodoForm;