import React, { useEffect, useRef } from 'react';

const YandexMap = ({ constructions, onConstructionClick }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    // Load Yandex Maps API
    if (!window.ymaps) {
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU';
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      if (window.ymaps && mapRef.current) {
        window.ymaps.ready(() => {
          // Create map centered on Almaty
          mapInstance.current = new window.ymaps.Map(mapRef.current, {
            center: [43.238293, 76.889311], // Almaty center
            zoom: 11,
            controls: ['zoomControl', 'fullscreenControl']
          });

          // Add constructions to map
          constructions.forEach((construction) => {
            if (construction.coordinates && construction.coordinates !== 'nan') {
              const [lat, lng] = construction.coordinates.split(',').map(coord => parseFloat(coord.trim()));
              
              if (!isNaN(lat) && !isNaN(lng)) {
                const placemark = new window.ymaps.Placemark(
                  [lat, lng],
                  {
                    balloonContentHeader: `ID: ${construction.id}`,
                    balloonContentBody: `
                      <div style="padding: 10px;">
                        <h4 style="margin: 0 0 10px 0; font-weight: bold;">${construction.title}</h4>
                        <p style="margin: 0 0 5px 0;"><strong>Формат:</strong> ${construction.format}</p>
                        <p style="margin: 0 0 5px 0;"><strong>Размер:</strong> ${construction.size}</p>
                        <p style="margin: 0 0 5px 0;"><strong>Локация:</strong> ${construction.category}</p>
                        <img src="${construction.image}" alt="${construction.title}" style="width: 200px; height: 150px; object-fit: cover; border-radius: 8px; margin-top: 10px;" />
                      </div>
                    `,
                    balloonContentFooter: `
                      <button onclick="window.selectConstruction('${construction.id}')" style="background: #dc2626; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-top: 10px;">
                        Подробнее
                      </button>
                    `
                  },
                  {
                    iconLayout: 'default#image',
                    iconImageHref: construction.format === 'Медиаборд' 
                      ? 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMzNzM3ZmYiLz4KPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4IiB5PSI4Ij4KPHBhdGggZD0ibTQgNCA4IDQtNCA0eiIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4KPC9zdmc+'
                      : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMxNmE2NGYiLz4KPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4IiB5PSI4Ij4KPHBhdGggZD0ibTQgNCA4IDQtNCA0eiIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4KPC9zdmc+',
                    iconImageSize: [32, 32],
                    iconImageOffset: [-16, -16]
                  }
                );

                mapInstance.current.geoObjects.add(placemark);

                // Add click handler
                placemark.events.add('click', () => {
                  onConstructionClick(construction);
                });
              }
            }
          });

          // Global function for balloon button clicks
          window.selectConstruction = (constructionId) => {
            const construction = constructions.find(c => c.id === constructionId);
            if (construction) {
              onConstructionClick(construction);
            }
          };
        });
      }
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
      }
    };
  }, [constructions, onConstructionClick]);

  return (
    <div
      ref={mapRef}
      className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden"
      style={{ minHeight: '400px' }}
    />
  );
};

export default YandexMap;