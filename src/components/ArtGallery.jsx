import { useState } from 'react';
import ArtCard from './ArtCard';
import SearchFilter from './SearchFilter';
import ArtModal from './ArtModal';
import './ArtGallery.css';

const ArtGallery = ({ artPieces, categories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArt, setSelectedArt] = useState(null);

  // Filter art pieces based on search term only
  const filteredArt = artPieces.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         art.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         art.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
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
        <div className="brand-section">
          <div className="logo-container">
            <img 
              src="/witchitraalu-logo.png" 
              alt="Witchitralu Logo" 
              className="gallery-logo"
              onError={(e) => {
                e.target.style.display = 'none';
                document.querySelector('.logo-fallback').style.display = 'block';
              }}
            />
            <div className="logo-fallback" style={{ display: 'none' }}>
              <h1 className="brand-name">Witchitralu</h1>
            </div>
          </div>
        </div>
        <div className="gallery-title-section">
          <h1>Art Gallery</h1>
          <p>Where art and science converge - A mystical journey through surrealism, human experience, and divine inspirations</p>
          <div className="artist-signature">
            <span className="signature-text">~ Curated by Sravya | @witchitralu ~</span>
          </div>
        </div>
        <div className="artist-info-section">
          <div className="artist-intro">
            <h2>About the Artist</h2>
            <p>Hello, I'm Sravya, a self-taught artist from Hyderabad. I abandoned geology to pursue my true passion for art, which has been my life for as long as I can remember. Discovering Frida Kahlo at 13 was a turning point, and growing up knowing about Dali and Picasso influenced my unique style that blends surrealism with scientific elements. I'm majorly inspired by renaissance artists like Da Vinci and Michelangelo for my fascination with the human experience.</p>
          </div>
          <div className="services-section">
            <h3>Services Offered</h3>
            <div className="services-grid">
              <div className="service-item">🎨 Customized Paintings</div>
              <div className="service-item">🖼️ Customized Portraits</div>
              <div className="service-item">🏠 Murals & Wall Decor</div>
              <div className="service-item">💍 Brass Jewellery</div>
              <div className="service-item">🎭 Body Decorations</div>
              <div className="service-item">🛍️ Painted Merchandise</div>
              <div className="service-item">📱 Printed Merchandise</div>
              <div className="service-item">🎪 Live Painting</div>
              <div className="service-item">🎓 Workshops & Classes</div>
            </div>
          </div>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-label">📱 Contact:</span>
              <span className="contact-value">+91 9160321673</span>
            </div>
            <div className="contact-item">
              <span className="contact-label">🌍 Made In India</span>
              <span className="contact-value">Shipping Worldwide</span>
            </div>
          </div>
        </div>
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="art-grid">
        {filteredArt.map((art, index) => (
          <div key={art.id} className="grid-item" style={{ animationDelay: `${(index % 6) * 0.1}s` }}>
            <ArtCard 
              art={art} 
              onViewDetails={handleViewDetails}
            />
          </div>
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