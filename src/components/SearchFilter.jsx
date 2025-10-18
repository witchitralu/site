import './SearchFilter.css';

const SearchFilter = ({
  searchTerm,
  onSearchChange
}) => {
  return (
    <div className="search-filter">
      <div className="filter-section">
        <label htmlFor="search" className="filter-label">Search</label>
        <input
          id="search"
          type="text"
          placeholder="Search by title, artist, or description..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default SearchFilter;