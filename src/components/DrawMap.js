import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import customMarkerImg from '../assets/Mark03.png'; 

const DrawMap = () => {
  const mapRef = useRef(null);
  const drawnItemsRef = useRef(null);

  useEffect(() => {
    const currentMap = mapRef.current;

    if (currentMap !== null) {
      const map = L.map(currentMap, {
        center: [20.5937, 78.9629],
        zoom: 13
      });

      L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png').addTo(map);

      drawnItemsRef.current = new L.FeatureGroup();
      map.addLayer(drawnItemsRef.current);

      // Define a custom icon
      const customIcon = L.icon({
        iconUrl: customMarkerImg,
        iconSize: [35, 35], // Size of the icon
        iconAnchor: [17, 35], // Point of the icon which will correspond to marker's location
        popupAnchor: [1, -34] // Point from which the popup should open relative to the iconAnchor
      });

      const drawControl = new L.Control.Draw({
        position: 'topright',
        draw: {
          polygon: true,
          polyline: true,
          rectangle: true,
          circle: true,
          marker: { icon: customIcon } // Use custom icon for markers
        },
        edit: {
          featureGroup: drawnItemsRef.current
        }
      });
      map.addControl(drawControl);

      customizeControls();

      map.on(L.Draw.Event.CREATED, function (event) {
        const { layer } = event;
        drawnItemsRef.current.addLayer(layer);
      });

      return () => {
        if (currentMap) {
          currentMap.remove();
        }
      };
    }
  }, []); 
  const customizeControls = () => {
    const toolbar = document.querySelector('.leaflet-draw-toolbar');
    if (toolbar) {
      toolbar.classList.add('bg-gray-800', 'text-white', 'p-2', 'rounded-lg', 'shadow');
      const buttons = toolbar.querySelectorAll('a');
      buttons.forEach(button => {
        button.classList.add('hover:bg-gray-700', 'focus:outline-none');
      });
    }
  };

  const clearAll = () => {
    drawnItemsRef.current.clearLayers();
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">Draw Map</h1>
      <div ref={mapRef} className="w-3/4 h-96 shadow-lg rounded-lg overflow-hidden">
      </div>
      <button onClick={clearAll} className="mt-4 p-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Clear All
      </button>
    </div>
  );
};

export default DrawMap;
