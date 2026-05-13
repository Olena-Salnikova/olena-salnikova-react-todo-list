import { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../../utils/todoValidation';

function TodoListItem({todo, onUpdateTodo, onCompleteTodo}) {
    const [isEditing, setIsEditing] = useState(false);
    const [workingTitle, setWorkingTitle] = useState(todo.title);

    function handleEdit(e) {
        setWorkingTitle(e.target.value);
    }

    function handleUpdate(event) {
        if (!isEditing) return;
        event.preventDefault();
        onUpdateTodo({ ...todo, title: workingTitle });
        setIsEditing(false);
    }

    function handleCancel() {
        setWorkingTitle(todo.title);
        setIsEditing(false);
    }

    return (
        <li>
            <form onSubmit={handleUpdate}>
                {isEditing ? (
                    <>
                        <TextInputWithLabel
                            value={workingTitle}
                            onChange={handleEdit}
                            elementId={`editTitle${todo.id}`}
                            labelText="Todo"
                        />
                        <button type="button" onClick={handleCancel}>Cancel</button>
                        <button type="button" disabled={!isValidTodoTitle(workingTitle)}>Update</button>
                    </>
                ) : (
                    <>
                        <label>
                            <input
                                type="checkbox"
                                id={`checkbox${todo.id}`}
                                checked={todo.isCompleted}
                                onChange={() => onCompleteTodo(todo.id)}
                            />
                        </label>
                        <span onClick={() => setIsEditing(true)}>{todo.title}</span>
                    </>
                )}
            </form>
        </li>
    );
}

export default TodoListItem;