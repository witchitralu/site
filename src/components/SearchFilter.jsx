import './SearchFilter.css';

const SearchFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  priceRange,
  onPriceRangeChange,
  showAvailableOnly,
  onAvailabilityChange
}) => {
  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value);
    onPriceRangeChange(newRange);
  };

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

      <div className="filter-section">
        <label htmlFor="category" className="filter-label">Category</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="category-select"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label className="filter-label">Price Range</label>
        <div className="price-range-container">
          <div className="price-input-group">
            <span className="price-label">Min: $</span>
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(0, e.target.value)}
              className="price-input"
              min="0"
              max="5000"
              step="50"
            />
          </div>
          <div className="price-input-group">
            <span className="price-label">Max: $</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(1, e.target.value)}
              className="price-input"
              min="0"
              max="5000"
              step="50"
            />
          </div>
        </div>
      </div>

      <div className="filter-section">
        <label className="filter-checkbox">
          <input
            type="checkbox"
            checked={showAvailableOnly}
            onChange={(e) => onAvailabilityChange(e.target.checked)}
          />
          <span className="checkbox-text">Show available only</span>
        </label>
      </div>
    </div>
  );
};

export default SearchFilter;