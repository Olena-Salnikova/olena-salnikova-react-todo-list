import { useMemo } from 'react';
import TodoListItem from './TodoListItem.jsx';

function TodoList({ todoList, onUpdateTodo, onCompleteTodo, dataVersion }) {
    // Memoize the filtered todo list to avoid unnecessary recalculations on every render
    const filteredTodoList = useMemo(() => {
        return {
            version: dataVersion, // Include version in the returned object to track changes
            todos: todoList.filter(todo => !todo.isCompleted)
        };
    }, [todoList, dataVersion]);
    
    // Render the filtered todo list
    return (
        filteredTodoList.todos.length === 0 ? (
            <p>Add todo above to get started</p>
        ) : (
            <ul>
                {filteredTodoList.todos.map(todo => 
                    <TodoListItem 
                        key={todo.id}
                        todo={todo}
                        onUpdateTodo={onUpdateTodo}
                        onCompleteTodo={onCompleteTodo}
                    />
                )}
            </ul>
        )
    );
}

export default TodoList;