import TextInputWithLabel from './TextInputWithLabel';

function FilterInput({ filterTerm, onFilterChange }) {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Regular expression: [^A-Za-z0-9 ] matches any character that is NOT an uppercase letter, 
    // lowercase letter, digit, or space.
    const safeValue = inputValue.replace(/[^A-Za-z0-9 ]/g, '');

    onFilterChange(safeValue);
  };

  return (
    <div>
      <TextInputWithLabel
        elementId="filterInput"
        labelText="Search todos:"
        value={filterTerm}
        onChange={handleInputChange} // Use the new handler that filters out unwanted characters
        placeholder="Search by title (English only)..."
      />
    </div>
  );
}

export default FilterInput;