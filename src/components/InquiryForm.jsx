import { useState } from 'react';
import './InquiryForm.css';

const InquiryForm = ({ art, onClose, artistInfo }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Create WhatsApp message
    const whatsappMessage = `*New Art Inquiry*

*Artwork:* ${art.title}
*Price:* $${art.price.toLocaleString()} / ₹${art.priceINR?.toLocaleString() || 'N/A'}

*Customer Details:*
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || 'Not provided'}

*Message:*
${formData.message || 'No additional message'}

---
Inquiry sent from Witchitralu Gallery`;

    // Encode message for WhatsApp
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${artistInfo.whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Show success message and close
    setTimeout(() => {
      alert('Your inquiry has been sent via WhatsApp! The artist will contact you soon.');
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="inquiry-backdrop" onClick={handleBackdropClick}>
      <div className="inquiry-modal">
        <button className="inquiry-close" onClick={onClose}>×</button>
        
        <div className="inquiry-header">
          <h2>Make an Inquiry</h2>
          <p className="inquiry-subtitle">Interested in "{art.title}"?</p>
        </div>

        <div className="inquiry-art-preview">
          <img src={art.image} alt={art.title} />
          <div className="inquiry-art-info">
            <h3>{art.title}</h3>
            <p className="inquiry-price">${art.price.toLocaleString()} / ₹{art.priceINR?.toLocaleString()}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="inquiry-form">
          <div className="form-group">
            <label htmlFor="name">Your Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
              placeholder="+91 9160321673"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email (Optional)</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="your@email.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message (Optional)</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Any specific questions or requirements..."
            />
          </div>

          <div className="form-info">
            <p>📱 Your inquiry will be sent via WhatsApp to the artist</p>
          </div>

          <button 
            type="submit" 
            className="submit-inquiry-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Inquiry via WhatsApp'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InquiryForm;
