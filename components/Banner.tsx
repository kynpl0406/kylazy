import React from 'react';
import { IMAGES } from '../constants';

const Banner: React.FC = () => {
  return (
    <div className="relative w-full h-48 lg:h-64 rounded-xl overflow-hidden shadow-lg mb-6 group">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url('${IMAGES.BANNER_BG}')` }}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-90" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight drop-shadow-lg">
          Trường Đại Học Vinh
        </h2>
        <div className="h-1 w-20 bg-blue-500 mb-2 rounded-full"></div>
        <p className="text-slate-300 text-lg font-medium drop-shadow-md">
          Flood Monitoring — Realtime water level dashboard
        </p>
      </div>
    </div>
  );
};

export default Banner;