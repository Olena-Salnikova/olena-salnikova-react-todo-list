import { useRef,  useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../../utils/todoValidation';

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
            <TextInputWithLabel
              elementId="todoTitle"
              labelText="Todo:"
              ref={inputRef}
              value={workingTodoTitle}
              onChange={e => setWorkingTodoTitle(e.target.value)}
            />
            <button type="submit" disabled={!isValidTodoTitle(workingTodoTitle)}>Add Todo</button>
        </form>
    );
}

export default TodoForm;