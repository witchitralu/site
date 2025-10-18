import './ContactModal.css';

const ContactModal = ({ onClose, artistInfo }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hi! I would like to inquire about your artwork.');
    window.open(`https://wa.me/${artistInfo.whatsappNumber}?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${artistInfo.phone}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${artistInfo.email}?subject=Art Inquiry from Gallery`;
  };

  return (
    <div className="contact-backdrop" onClick={handleBackdropClick}>
      <div className="contact-modal">
        <button className="contact-close" onClick={onClose}>×</button>
        
        <div className="contact-header">
          <div className="contact-artist-avatar">
            <span>🎨</span>
          </div>
          <h2>Contact {artistInfo.name}</h2>
          <p className="contact-subtitle">{artistInfo.title}</p>
        </div>

        <div className="contact-bio">
          <p>{artistInfo.bio}</p>
        </div>

        <div className="contact-details">
          <div className="contact-item-card">
            <div className="contact-icon">📱</div>
            <div className="contact-info">
              <h4>Phone</h4>
              <p>{artistInfo.phone}</p>
            </div>
            <button className="contact-action-btn" onClick={handleCall}>Call</button>
          </div>

          <div className="contact-item-card">
            <div className="contact-icon">💬</div>
            <div className="contact-info">
              <h4>WhatsApp</h4>
              <p>Quick messaging</p>
            </div>
            <button className="contact-action-btn whatsapp" onClick={handleWhatsApp}>Chat</button>
          </div>

          <div className="contact-item-card">
            <div className="contact-icon">✉️</div>
            <div className="contact-info">
              <h4>Email</h4>
              <p>{artistInfo.email}</p>
            </div>
            <button className="contact-action-btn" onClick={handleEmail}>Email</button>
          </div>

          <div className="contact-item-card">
            <div className="contact-icon">🌍</div>
            <div className="contact-info">
              <h4>Location</h4>
              <p>{artistInfo.location}</p>
            </div>
          </div>

          <div className="contact-item-card">
            <div className="contact-icon">🚚</div>
            <div className="contact-info">
              <h4>Shipping</h4>
              <p>{artistInfo.shipping}</p>
            </div>
          </div>
        </div>

        <div className="contact-footer">
          <p>Feel free to reach out for commissions, inquiries, or collaborations!</p>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
