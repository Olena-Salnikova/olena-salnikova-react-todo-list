import TextInputWithLabel from '../../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../../utils/todoValidation';
import { useEditableTitle } from '../../hooks/useEditableTitle';

function TodoListItem({todo, onUpdateTodo, onCompleteTodo}) {
    // Use custom hook to handle editing state and logic
    const {
        isEditing,
        workingTitle,
        startEditing,
        cancelEdit,
        updateTitle,
        finishEdit
    } = useEditableTitle(todo.title);

    // Handle updating the todo title
    function handleUpdate(event) {
        if (!isEditing) return;
        event.preventDefault();
        const finalTitle = finishEdit();
        onUpdateTodo({ ...todo, title: finalTitle }); // Call parent function to update the todo
    }

        return (
        <li>
            <form onSubmit={handleUpdate}>
                {isEditing ? (
                    <>
                        {/* Editable input for updating the todo title */}
                        <TextInputWithLabel
                            value={workingTitle}
                            onChange={e => updateTitle(e.target.value)}
                            elementId={`editTitle${todo.id}`}
                            labelText="Todo"
                        />
                        {/* Cancel editing and reset state */}
                        <button type="button" onClick={cancelEdit}>Cancel</button>
                        {/* Submit updated todo title if valid */}
                        <button type="submit" disabled={!isValidTodoTitle(workingTitle)}>Update</button>
                    </>
                ) : (
                    <>
                        {/* Checkbox to mark todo as completed */}
                        <label>
                            <input
                                type="checkbox"
                                id={`checkbox${todo.id}`}
                                checked={todo.isCompleted}
                                onChange={() => onCompleteTodo(todo.id)}
                            />
                        </label>
                        {/* Clickable title to start editing */}
                        <span onClick={startEditing}>{todo.title}</span>
                    </>
                )}
            </form>
        </li>
    );
}

export default TodoListItem;