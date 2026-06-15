import { useEffect, useReducer, useCallback } from 'react';
import { useSearchParams } from 'react-router';
import TodoForm from '../features/Todos/TodoForm.jsx';
import TodoList from '../features/Todos/TodoList/TodoList.jsx';
import SortBy from '../shared/SortBy.jsx';
import useDebounce from '../utils/useDebounce.js';
import FilterInput from '../shared/FilterInput.jsx';
import StatusFilter from '../shared/StatusFilter.jsx';
import styles from './TodosPage.module.css';

import {
  todoReducer,
  initialTodoState,
  TODO_ACTIONS,
} from '../reducers/todoReducer.js';
import { useAuth } from '../hooks/useAuth.jsx';

function TodosPage() {
  const { token } = useAuth();
  const [searchParams] = useSearchParams(); // Hook for reading URL query parameters
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);

  // Get the status filter from the URL, default is 'all'
  const statusFilter = searchParams.get('status') || 'all';

  const {
    todoList,
    error,
    filterError,
    isTodoListLoading,
    sortBy,
    sortDirection,
    filterTerm,
    dataVersion,
  } = state;

  const debouncedFilterTerm = useDebounce(filterTerm, 300);

  const handleFilterChange = (newTerm) => {
    dispatch({
      type: TODO_ACTIONS.SET_FILTER,
      payload: { filterTerm: newTerm },
    });
  };

  const invalidateCache = useCallback(() => {
    dispatch({ type: TODO_ACTIONS.INCREMENT_DATA_VERSION });
  }, []);

  useEffect(() => {
    if (!token) return;

    async function fetchTodos() {
      dispatch({ type: TODO_ACTIONS.FETCH_START });

      try {
        const paramsObject = {
          sortBy,
          sortDirection,
        };

        if (debouncedFilterTerm) {
          paramsObject.find = debouncedFilterTerm;
        }

        const params = new URLSearchParams(paramsObject);

        const response = await fetch(`/api/tasks?${params}`, {
          method: 'GET',
          headers: {
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
         });

        if (response.status === 401) {
          throw new Error('unauthorized');
        }

        if (response.status === 404) {
          const errorData = await response.json();

          if (errorData.message === 'No tasks found for user.') {
            dispatch({
              type: TODO_ACTIONS.FETCH_SUCCESS,
              payload: {
                todos: [],
              },
            });
            return;
          }

          throw new Error(errorData.message || 'Failed to fetch tasks.');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch tasks.');
        }

        const data = await response.json();

        dispatch({
          type: TODO_ACTIONS.FETCH_SUCCESS,
          payload: {
            todos: data.tasks || [],
          },
        });
      } catch {
        const isFilterError =
          debouncedFilterTerm ||
          sortBy !== 'createdAt' ||
          sortDirection !== 'desc';

        dispatch({
          type: TODO_ACTIONS.FETCH_ERROR,
          payload: {
            message: isFilterError
              ? `Error filtering or sorting todos.`
              : `Error fetching todos. Please try again later.`,
            isFilterError,
          },
        });
      }
    }

    fetchTodos();
  }, [token, sortBy, sortDirection, debouncedFilterTerm, dataVersion]);

  async function addTodo(todoTitle) {
    const tempTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    dispatch({
      type: TODO_ACTIONS.ADD_TODO_START,
      payload: { tempTodo },
    });

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({ title: todoTitle, isCompleted: false }),
      });

      if (!response.ok) {
        throw new Error('Failed to add task.');
      }

      const data = await response.json();
      const realTodo = data;

      dispatch({
        type: TODO_ACTIONS.ADD_TODO_SUCCESS,
        payload: {
          tempTodoId: tempTodo.id,
          realTodo,
        },
      });

      invalidateCache();
    } catch {
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_ERROR,
        payload: {
          tempTodoId: tempTodo.id,
          message: 'Failed to add todo. Please check your inputs.',
        },
      });
    }
  }

  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
    if (!originalTodo) return;

    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO_START,
      payload: { editedTodo },
    });

    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo.');
      }

      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
      });

      invalidateCache();
    } catch {
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: {
          originalTodo,
          message: 'Failed to update todo.',
        },
      });
    }
  }

  async function completeTodo(id) {
    const originalTodo = todoList.find((todo) => todo.id === id);
    if (!originalTodo) return;

    dispatch({
      type: TODO_ACTIONS.COMPLETE_TODO_START,
      payload: { id },
    });

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          isCompleted: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to complete todo.');
      }

      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS,
      });

      invalidateCache();
    } catch {
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
        payload: {
          originalTodo,
          message: 'Failed to complete todo. Please try again later.',
        },
      });
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Todos</h1>

      {/* Display global errors */}
      {error && (
        <div className={styles.errorBox}>
          <span>{error}</span>
          <button
            className={styles.errorBtn}
            onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })}
            type="button"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Display filter errors */}
      {filterError && (
        <div className={styles.filterErrorBox}>
          <span>{filterError}</span>
          <div className={styles.errorActions}>
            <button
              className={styles.errorBtn}
              onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_FILTER_ERROR })}
              type="button"
            >
              Dismiss
            </button>
            <button
              className={styles.errorBtn}
              onClick={() => dispatch({ type: TODO_ACTIONS.RESET_FILTERS })}
              type="button"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Display loading state */}
      <TodoForm onAddTodo={addTodo} />

      {/* Filter block, search, and sorting */}
      <div className={styles.controlsSection}>
        <FilterInput
          filterTerm={filterTerm}
          onFilterChange={handleFilterChange}
        />
        <StatusFilter />
        <SortBy
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortByChange={(newSortBy) =>
            dispatch({
              type: TODO_ACTIONS.SET_SORT,
              payload: { sortBy: newSortBy, sortDirection },
            })
          }
          onSortDirectionChange={(newSortDirection) =>
            dispatch({
              type: TODO_ACTIONS.SET_SORT,
              payload: { sortBy, sortDirection: newSortDirection },
            })
          }
        />
      </div>

      {/* Loading state with spinner placeholder */}
      {isTodoListLoading && (
        <div className={styles.loadingBox}>
          <div className={styles.spinner}></div>
          <span>Loading tasks...</span>
        </div>
      )}

      {/* Pass statusFilter and dataVersion as props to TodoList */}
      <TodoList
        todoList={todoList}
        onUpdateTodo={updateTodo}
        onCompleteTodo={completeTodo}
        dataVersion={dataVersion}
        statusFilter={statusFilter}
      />
    </div>
  );
}

export default TodosPage;