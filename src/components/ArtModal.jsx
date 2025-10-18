import { useEffect } from 'react';
import './ArtModal.css';

const ArtModal = ({ art, onClose }) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden'; // Prevent background scroll

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        
        <div className="modal-body">
          <div className="modal-image-section">
            <img 
              src={art.image} 
              alt={art.title}
              className="modal-image"
            />
            {!art.available && (
              <div className="modal-sold-overlay">
                <span className="modal-sold-text">SOLD</span>
              </div>
            )}
          </div>
          
          <div className="modal-info-section">
            <div className="modal-header">
              <h2 className="modal-title">{art.title}</h2>
              <p className="modal-artist">by {art.artist}</p>
            </div>
            
            <div className="modal-details">
              <div className="detail-group">
                <span className="detail-label">Medium:</span>
                <span className="detail-value">{art.medium}</span>
              </div>
              
              <div className="detail-group">
                <span className="detail-label">Dimensions:</span>
                <span className="detail-value">{art.dimensions}</span>
              </div>
              
              <div className="detail-group">
                <span className="detail-label">Year:</span>
                <span className="detail-value">{art.year}</span>
              </div>
              
              {art.timeSpent && (
                <div className="detail-group">
                  <span className="detail-label">Time Spent:</span>
                  <span className="detail-value">{art.timeSpent}</span>
                </div>
              )}
              
              <div className="detail-group">
                <span className="detail-label">Category:</span>
                <span className="detail-value">
                  {art.category.charAt(0).toUpperCase() + art.category.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="modal-description">
              <h3>Description</h3>
              <p>{art.description}</p>
            </div>
            
            <div className="modal-footer">
              <div className="modal-price-section">
                <span className="modal-price">
                  ${art.price.toLocaleString()}
                  {art.priceINR && <span className="price-inr-modal"> / ₹{art.priceINR.toLocaleString()}</span>}
                </span>
                <span className={`modal-status ${art.available ? 'available' : 'sold'}`}>
                  {art.available ? 'Available' : 'Sold'}
                </span>
              </div>
              
              {art.available && (
                <div className="modal-actions">
                  <button className="contact-btn">Contact Artist</button>
                  <button className="inquiry-btn">Make Inquiry</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtModal;