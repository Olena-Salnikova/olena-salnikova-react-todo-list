import styles from './SortBy.module.css';

function SortBy({ sortBy, sortDirection, onSortByChange, onSortDirectionChange }) {
  return (
    <div className={styles.sortContainer}>
      {/* Sort options */}
      <div className={styles.fieldGroup}>
        <label htmlFor="sortBySelect" className={styles.label}>
          Sort by:
        </label>

        <select
          id="sortBySelect"
          className={styles.select}
          value={sortBy}
          onChange={e => onSortByChange(e.target.value)}
        >
          <option value="createdAt">Creation Date</option>
          <option value="title">Title</option>
        </select>
      </div>

      {/* Sort direction options */}
      <div className={styles.fieldGroup}>
        <label htmlFor="sortDirectionSelect" className={styles.label}>
          Order:
        </label>

        <select
          id="sortDirectionSelect"
          className={styles.select}
          value={sortDirection}
          onChange={e => onSortDirectionChange(e.target.value)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>
  );
}

export default SortBy;