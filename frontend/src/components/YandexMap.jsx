import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

const YandexMap = ({ constructions, onConstructionClick }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(null);

  useEffect(() => {
    // For now, let's create a simple interactive map placeholder
    // that shows construction locations without external API dependency
    
    if (mapRef.current && constructions.length > 0) {
      // Create a simple grid of construction markers
      const mapContainer = mapRef.current;
      mapContainer.innerHTML = ''; // Clear previous content
      
      // Create a mock map background
      const mapBg = document.createElement('div');
      mapBg.className = 'relative w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden';
      mapBg.style.backgroundImage = `
        radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(156, 163, 175, 0.05) 0%, transparent 60%)
      `;
      
      // Add construction markers
      constructions.slice(0, 20).forEach((construction, index) => {
        if (construction.coordinates && construction.coordinates !== 'nan') {
          const marker = document.createElement('div');
          marker.className = `absolute w-8 h-8 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 
                             rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10
                             ${construction.format === 'Медиаборд' ? 'bg-blue-500' : 'bg-green-500'}`;
          
          // Position markers in a grid-like pattern for demo
          const x = 10 + (index % 8) * 12; // Spread across width
          const y = 15 + Math.floor(index / 8) * 15; // Stack vertically
          marker.style.left = `${x}%`;
          marker.style.top = `${y}%`;
          
          // Add marker content
          marker.innerHTML = `
            <div class="w-full h-full rounded-full flex items-center justify-center text-white text-xs font-bold">
              ${construction.id.toString().slice(-2)}
            </div>
          `;
          
          // Add click handler
          marker.addEventListener('click', () => {
            onConstructionClick(construction);
          });
          
          // Add hover effect with tooltip
          marker.title = `ID: ${construction.id} - ${construction.title}`;
          
          mapBg.appendChild(marker);
        }
      });
      
      // Add city labels
      const almatyLabel = document.createElement('div');
      almatyLabel.className = 'absolute text-lg font-bold text-gray-700';
      almatyLabel.style.left = '45%';
      almatyLabel.style.top = '45%';
      almatyLabel.innerHTML = 'Алматы';
      mapBg.appendChild(almatyLabel);
      
      mapContainer.appendChild(mapBg);
      setIsMapLoaded(true);
    }
  }, [constructions, onConstructionClick]);

  if (mapError) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
        <MapPin className="h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-600 text-center">
          Карта временно недоступна
          <br />
          <span className="text-sm">{mapError}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        ref={mapRef}
        className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden border border-gray-300"
        style={{ minHeight: '400px' }}
      />
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Показано: {Math.min(constructions.length, 20)} из {constructions.length} конструкций
        </p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Медиаборды</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Ситиборды</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YandexMap;