import React, { useState } from 'react';
import { Wifi, WifiOff, Waves } from 'lucide-react';
import { IMAGES } from '../constants';

interface HeaderProps {
  isOnline: boolean;
}

const Header: React.FC<HeaderProps> = ({ isOnline }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <header className="w-full h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-4 lg:px-6 shadow-md z-50">
      <div className="flex items-center gap-3">
        {/* Logo container */}
        <div className="bg-white p-1 rounded-full h-12 w-12 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
            {!imgError ? (
              <img 
                  src={IMAGES.LOGO} 
                  alt="Flood Monitoring System Logo" 
                  className="h-full w-full object-contain"
                  onError={() => {
                    console.warn("Logo image failed to load, falling back to icon.");
                    setImgError(true);
                  }}
              />
            ) : (
              // Fallback icon if image is missing
              <Waves className="h-7 w-7 text-blue-600" />
            )}
        </div>
        <div className="flex flex-col">
          <h1 className="text-sm font-bold text-white uppercase tracking-wide leading-tight">
            Flood Monitoring System
          </h1>
          <span className="text-xs text-slate-400">
            Realtime water level dashboard
          </span>
        </div>
      </div>

      {isOnline ? (
        <div className="flex items-center gap-2 bg-green-900/30 px-3 py-1 rounded-full border border-green-500/30 transition-all duration-300">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-green-400 font-semibold text-sm hidden sm:inline">Online</span>
          <Wifi className="w-4 h-4 text-green-400 ml-1" />
        </div>
      ) : (
        <div className="flex items-center gap-2 bg-red-900/30 px-3 py-1 rounded-full border border-red-500/30 transition-all duration-300">
          <span className="relative flex h-3 w-3">
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-red-400 font-semibold text-sm hidden sm:inline">Offline</span>
          <WifiOff className="w-4 h-4 text-red-400 ml-1" />
        </div>
      )}
    </header>
  );
};

export default Header;