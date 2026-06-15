import TextInputWithLabel from '../../../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../../../utils/todoValidation';
import { useEditableTitle } from '../../../hooks/useEditableTitle';
import styles from './TodoList.module.css';

function TodoListItem({ todo, onUpdateTodo, onCompleteTodo }) {
  // Use custom hook to handle editing state and logic
  const {
    isEditing,
    workingTitle,
    startEditing,
    cancelEdit,
    updateTitle,
    finishEdit
  } = useEditableTitle(todo.title);

  function handleUpdate(event) {
    if (!isEditing) return;
    event.preventDefault();
    const finalTitle = finishEdit();
    onUpdateTodo({ ...todo, title: finalTitle }); 
  }

  return (
    <li className={styles.itemCard}>
      <form onSubmit={handleUpdate} className={styles.itemForm}>
        {isEditing ? (
          <>
            <div className={styles.editWrapper}>
              <TextInputWithLabel
                value={workingTitle}
                onChange={e => updateTitle(e.target.value)}
                elementId={`editTitle${todo.id}`}
                labelText="Edit Todo"
              />
            </div>
            <div className={styles.actionsWrapper}>
              <button 
                type="button" 
                className={`${styles.btn} ${styles.cancelBtn}`} 
                onClick={cancelEdit}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className={`${styles.btn} ${styles.updateBtn}`} 
                disabled={!isValidTodoTitle(workingTitle)}
              >
                Update
              </button>
            </div>
          </>
        ) : (
          <div className={styles.viewContainer}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkboxInput}
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span 
              className={`${styles.todoText} ${todo.isCompleted ? styles.completedText : ''}`} 
              onClick={startEditing}
              title="Click to edit task"
            >
              {todo.title}
            </span>
          </div>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;