import './ArtCard.css';

const ArtCard = ({ art, onViewDetails }) => {
  return (
    <div className="art-card">
      <div className="art-image-container">
        <img 
          src={art.image} 
          alt={art.title}
          className="art-image"
          loading="lazy"
        />
        {!art.available && (
          <div className="sold-overlay">
            <span className="sold-text">SOLD</span>
          </div>
        )}
      </div>
      
      <div className="art-info">
        <h3 className="art-title">{art.title}</h3>
        <p className="art-artist">by {art.artist}</p>
        <p className="art-medium">{art.medium}</p>
        <p className="art-dimensions">{art.dimensions}</p>
        <div className="art-price-container">
          <span className="art-price">${art.price.toLocaleString()}</span>
          {art.available && <span className="availability-badge">Available</span>}
        </div>
        
        <button 
          className="view-details-btn"
          onClick={() => onViewDetails(art)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ArtCard;