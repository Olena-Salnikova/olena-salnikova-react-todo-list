function SortBy({ sortBy, sortDirection, onSortByChange, onSortDirectionChange }) {
  return (
    <div>
        {/* Sort options */}
      <label htmlFor="sortBySelect" style={{ marginRight: 4 }}>
        Sort by:
      </label>
      <select
        id="sortBySelect"
        value={sortBy}
        onChange={e => onSortByChange(e.target.value)}
        style={{ marginRight: 16 }}
      >
        <option value="createdAt">Creation Date</option>
        <option value="title">Title</option>
      </select>

        {/* Sort direction options */}
      <label htmlFor="sortDirectionSelect" style={{ marginRight: 4 }}>
        Order:
      </label>
      <select
        id="sortDirectionSelect"
        value={sortDirection}
        onChange={e => onSortDirectionChange(e.target.value)}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
}

export default SortBy;