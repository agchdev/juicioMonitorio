import React from 'react';
import bannerImage from '../assets/juicioMonitorioBanner.jpg';

const BannerImage = ({ className }) => {
  return (
    <div className={`banner-image-container ${className || ''}`}>
      <img 
        src={bannerImage} 
        alt="Juicio Monitorio" 
        className="w-full h-auto rounded-lg shadow-lg"
      />
    </div>
  );
};

export default BannerImage;