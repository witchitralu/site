import { useState } from 'react';
import ArtCard from './ArtCard';
import SearchFilter from './SearchFilter';
import ArtModal from './ArtModal';
import './ArtGallery.css';

const ArtGallery = ({ artPieces, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedArt, setSelectedArt] = useState(null);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  // Filter art pieces based on current filters
  const filteredArt = artPieces.filter(art => {
    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         art.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         art.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = art.price >= priceRange[0] && art.price <= priceRange[1];
    const matchesAvailability = !showAvailableOnly || art.available;
    
    return matchesCategory && matchesSearch && matchesPrice && matchesAvailability;
  });

  const handleViewDetails = (art) => {
    setSelectedArt(art);
  };

  const handleCloseModal = () => {
    setSelectedArt(null);
  };

  return (
    <div className="art-gallery">
      <div className="gallery-header">
        <h1>Art Gallery</h1>
        <p>Discover beautiful artwork from talented artists around the world</p>
      </div>

      <SearchFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        showAvailableOnly={showAvailableOnly}
        onAvailabilityChange={setShowAvailableOnly}
      />

      <div className="gallery-stats">
        <p>Showing {filteredArt.length} of {artPieces.length} artworks</p>
      </div>

      <div className="art-grid">
        {filteredArt.map(art => (
          <ArtCard 
            key={art.id} 
            art={art} 
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {filteredArt.length === 0 && (
        <div className="no-results">
          <h3>No artwork found</h3>
          <p>Try adjusting your filters to see more results.</p>
        </div>
      )}

      {selectedArt && (
        <ArtModal 
          art={selectedArt} 
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ArtGallery;