import { useState } from 'react';

export function useEditableTitle(initialTitle) {
  // Local state:
  const [isEditing, setIsEditing] = useState(false);       // show/hide edit mode
  const [workingTitle, setWorkingTitle] = useState(initialTitle); // current text in the input

  // Function to start editing:
  const startEditing = () => {
    setWorkingTitle(initialTitle);
    setIsEditing(true);
  };

  // Function to cancel editing:
  const cancelEdit = () => {
    setWorkingTitle(initialTitle);
    setIsEditing(false);
  };

  // Function to update the title while typing:
  const updateTitle = (newTitle) => {
    setWorkingTitle(newTitle);
  };

  // Function to finish editing and return the value:
  const finishEdit = () => {
    setIsEditing(false);
    return workingTitle;
  };

  // Return an object with data and functions:
  return {
    isEditing,
    workingTitle,
    startEditing,
    cancelEdit,
    updateTitle,
    finishEdit
  };
}