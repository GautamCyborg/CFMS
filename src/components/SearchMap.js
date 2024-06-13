import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Geocoder } from 'leaflet-control-geocoder'; // Import the geocoder
import icon from "../assets/Mark05.png"

const SearchMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      // Initialize the map
      const map = L.map(mapRef.current, {
        center: [20.5937, 78.9629], 
        zoom: 4,
      });

     
      L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png').addTo(map);

      // Initialize the geocoder
      const geocoder = new Geocoder({
        defaultMarkGeocode: false,
        placeholder: 'Search for places...',
        errorMessage: 'Nothing found.'
      });
      geocoder.addTo(map);

      // Customize the appearance of the geocoder after it's added to the map
      customizeGeocoder();

      // Handle geocode result
      geocoder.on('markgeocode', function(e) {
        const bbox = e.geocode.bbox;
        const poly = L.polygon([
          bbox.getSouthEast(),
          bbox.getNorthEast(),
          bbox.getNorthWest(),
          bbox.getSouthWest()
        ]);
        map.fitBounds(poly.getBounds());
        
        // Clear previous markers
        map.eachLayer(function(layer){
          if (layer instanceof L.Marker) {
            map.removeLayer(layer);
          }
        });

        const customIcon = L.icon({
            iconUrl: icon,
            iconSize: [35, 35], // Size of the icon
            iconAnchor: [17, 35], // Point of the icon which will correspond to marker's location
            popupAnchor: [1, -34] // Point from which the popup should open relative to the iconAnchor
          });

          const center = bbox.getCenter();
          L.marker(center, { icon: customIcon }).addTo(map)
            .bindPopup(e.geocode.name)
            .openPopup();
        });

      return () => {
        map.remove();
      };
    }
  }, []);

  // Function to customize the Leaflet draw toolbar using Tailwind CSS
  const customizeGeocoder = () => {
    const geocoderContainer = document.querySelector('.leaflet-control-geocoder');
    if (geocoderContainer) {
        geocoderContainer.classList.add('bg-gray-800', 'text-white', 'p-2', 'rounded-lg', 'shadow-lg', 'z-50');
        
        const input = geocoderContainer.querySelector('input');
        const resultsBox = geocoderContainer.querySelector('.leaflet-control-geocoder-alternatives');
        if (input) {
            input.classList.add('text-black', 'bg-white', 'rounded-md', 'p-2', 'shadow-sm', 'border-0');
        }
        if (resultsBox) {
            resultsBox.classList.add('bg-white', 'shadow-lg', 'rounded-b-md');
            resultsBox.classList.add('divide-y', 'divide-gray-300'); // Add dividers between items
            // Apply Tailwind classes to each result item
            const resultItems = resultsBox.querySelectorAll('.leaflet-control-geocoder-alternative');
            resultItems.forEach(item => {
                item.classList.add('py-2', 'px-3', 'hover:bg-gray-200', 'cursor-pointer'); // Increase padding and set hover background
                item.style.lineHeight = '1.5'; // Increase line height for better readability
            });
        }
    }
};


  return (
    <div className="flex flex-col items-center justify-center mt-10">
    <h1 className="text-2xl font-semibold text-gray-800 mb-8">Search Map</h1>
      <div ref={mapRef} className="w-3/4 h-96 shadow-lg rounded-lg overflow-hidden">
      </div>
    </div>
  );
};

export default SearchMap;
