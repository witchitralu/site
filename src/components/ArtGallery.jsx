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

  // Featured artworks: top-priced available (fallback to first few if none)
  const featuredArt = artPieces
    .filter(a => a.available)
    .sort((a, b) => b.price - a.price)
    .slice(0, 6);
  const featuredSource = featuredArt.length > 0 ? featuredArt : artPieces.slice(0, 6);

  return (
    <>
    <header className="site-header" role="navigation" aria-label="Primary">
      <div className="site-header-inner">
        <a href="#top" className="header-brand">
          <img src="/witchitraalu-logo.png" alt="Witchitralu" className="header-logo" onError={(e) => { e.target.style.display='none'; }} />
          <span className="header-title">Witchitralu</span>
        </a>
        <nav className="header-nav">
          <a href="#about">About</a>
          <a href="#gallery">Gallery</a>
          <a href="https://instagram.com/witchitralu" target="_blank" rel="noreferrer">Instagram</a>
        </nav>
        <a
          className="header-cta"
          href="https://wa.me/919160321673?text=Hi%20Sravya%2C%20I%27m%20interested%20in%20your%20art."
          target="_blank"
          rel="noreferrer"
        >
          Contact
        </a>
      </div>
    </header>
    <div className="art-gallery" id="top">
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
        {/* About moved to bottom for a more professional flow */}
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Featured Works */}
      <section className="featured-section" aria-labelledby="featured-heading">
        <div className="featured-header">
          <h2 id="featured-heading">Featured Works</h2>
          <p>Handpicked highlights — tap to explore details</p>
        </div>
        <div className="featured-track">
          {featuredSource.map((art) => (
            <button
              key={`feat-${art.id}`}
              className="featured-card"
              onClick={() => handleViewDetails(art)}
            >
              <div className="featured-image-container">
                <img src={art.image} alt={art.title} className="featured-image" loading="lazy" />
              </div>
              <div className="featured-info">
                <h3 className="featured-title">{art.title}</h3>
                <span className="featured-price">${art.price.toLocaleString()}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="art-grid" id="gallery">
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

      {/* About Section (Bottom) */}
      <section className="artist-info-section" id="about">
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
      </section>

      {selectedArt && (
        <ArtModal 
          art={selectedArt} 
          onClose={handleCloseModal}
        />
      )}

      {/* Footer */}
      <footer className="site-footer" role="contentinfo">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">🎨</div>
            <div>
              <h4>Witchitralu</h4>
              <p>Art where surrealism meets science — by Sravya.</p>
            </div>
          </div>
          <nav className="footer-links" aria-label="Footer">
            <a href="#about">About</a>
            <a href="#gallery">Gallery</a>
            <a href="mailto:witchitraalu@gmail.com">Email</a>
            <a href="https://wa.me/919160321673" target="_blank" rel="noreferrer">WhatsApp</a>
          </nav>
          <div className="footer-meta">
            <span>Made in India • Shipping Worldwide</span>
            <span>© {new Date().getFullYear()} Witchitralu</span>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default ArtGallery;