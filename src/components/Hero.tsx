import React from 'react';

export const Hero = () => {
  return (
    <div className="hero-section">
      <h1>Welcome to Notes App</h1>
      <div className="features-grid">
        <div className="feature-card">
          <span className="feature-icon">📝</span>
          <h3>Simple Note Taking</h3>
          <p>Create and organize your thoughts with our intuitive interface</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">📎</span>
          <h3>File Attachments</h3>
          <p>Attach images and PDFs to your notes for better context</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">⚡</span>
          <h3>Fast & Reliable</h3>
          <p>Quick access to your notes whenever you need them</p>
        </div>
      </div>
    </div>
  );
}; 