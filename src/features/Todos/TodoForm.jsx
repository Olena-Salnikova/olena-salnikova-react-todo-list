import { useRef,  useState } from 'react';
import DOMPurify from 'dompurify';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../../utils/todoValidation';
import styles from './TodoForm.module.css';

function TodoForm({ onAddTodo }) {
  const inputRef = useRef();
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();

    // 1. On first step, we trim the input to remove leading and trailing whitespace
    const trimmedTitle = workingTodoTitle.trim();

    if (trimmedTitle) {
      // 2. Then we sanitize the string to remove any malicious tags using DOMPurify
      const sanitizedTitle = DOMPurify.sanitize(trimmedTitle, {
        ALLOWED_TAGS: [], 
        ALLOWED_ATTR: []
      });

      // Send the sanitized result
      onAddTodo(sanitizedTitle);
      setWorkingTodoTitle(""); 
      if (inputRef.current) {
        inputRef.current.focus(); 
      }
    }
  };

  return (
    <form onSubmit={handleAddTodo} className={styles.form}>
      <div className={styles.inputWrapper}>
        <TextInputWithLabel
          elementId="todoTitle"
          labelText="Add New Todo:"
          ref={inputRef}
          value={workingTodoTitle}
          onChange={(e) => setWorkingTodoTitle(e.target.value)}
          maxLength={120} // Adding a hard limit to the string length as per the requirements
        />
      </div>

      {/* Button is now wrapped in a container for precise positioning */}
      <div className={styles.buttonWrapper}>
        <button 
          type="submit" 
          className={styles.submitBtn}
          disabled={!isValidTodoTitle(workingTodoTitle)}
        >
          Add Todo
        </button>
      </div>
    </form>
  );
}

export default TodoForm;