import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaFileUpload } from 'react-icons/fa';
import icon from "../assets/Mark05.png"; // Adjust the path to your custom icon

const VerifyComponent = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [geoJsonData, setGeoJsonData] = useState('');
  const [selectedLayer, setSelectedLayer] = useState(null);

  useEffect(() => {
    // Initialize the map only once
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([20.5937, 78.9629], 5);

      // Add OpenStreetMap tiles
      L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(mapRef.current);
    }
  }, []);

  useEffect(() => {
    if (geoJsonData && mapRef.current) {
      try {
        // Define the custom icon
        const customIcon = L.icon({
          iconUrl: icon,
          iconSize: [35, 35], // Size of the icon
          iconAnchor: [17, 35], // Point of the icon which will correspond to marker's location
          popupAnchor: [1, -34] // Point from which the popup should open relative to the iconAnchor
        });

        const geoJsonLayer = L.geoJson(JSON.parse(geoJsonData), {
          style: function (feature) {
            return {
              fillColor: getColor(feature.properties.density),
              weight: 2,
              opacity: 1,
              color: 'black',
              dashArray: '3',
              fillOpacity: 0.2,
            };
          },
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, { icon: customIcon });
          },
          onEachFeature: function (feature, layer) {
            layer.on({
              click: function () {
                setSelectedLayer(layer);
              },
            });
          },
        });

        // Remove existing layers
        mapRef.current.eachLayer((layer) => {
          if (layer.options && layer.options.pane !== 'tilePane') {
            mapRef.current.removeLayer(layer);
          }
        });

        // Add new GeoJSON layer
        geoJsonLayer.addTo(mapRef.current);
        mapRef.current.fitBounds(geoJsonLayer.getBounds());
      } catch (error) {
        console.error('Invalid GeoJSON data:', error);
      }
    }
  }, [geoJsonData]);

  const getColor = (d) => {
    return d > 1000
      ? '#800026'
      : d > 500
      ? '#BD0026'
      : d > 200
      ? '#E31A1C'
      : d > 100
      ? '#FC4E2A'
      : d > 50
      ? '#FD8D3C'
      : d > 20
      ? '#FEB24C'
      : d > 10
      ? '#FED976'
      : '#FFEDA0';
  };

  const changeLayerColor = (color) => {
    if (selectedLayer) {
      selectedLayer.setStyle({
        fillColor: color,
        color: color,
      });
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setGeoJsonData(e.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen p-10 bg-gradient-to-r from-blue-50 to-purple-100">
      <div
        id="map"
        ref={mapContainerRef}
        className="w-2/3 h-full border-2 border-gray-300 rounded-lg shadow-lg"
      ></div>
      <div className="w-1/3 h-full flex flex-col items-start p-5 bg-white rounded-lg shadow-lg ml-5">
        <h1 className="text-2xl font-bold text-gray-800 mb-5">GeoJSON Map Viewer</h1>
        <textarea
          className="w-full p-2 mb-5 border-2 border-gray-300 rounded-lg"
          rows="10"
          placeholder={`Paste your GEO JSON data here e.g.\n[{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[76.992188,20.756081]}}]`}
          onChange={(e) => setGeoJsonData(e.target.value)}
        ></textarea>
        <label className="w-full p-2 flex items-center justify-center bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600">
          <FaFileUpload className="mr-2" />
          <span>Upload GeoJSON File</span>
          <input
            type="file"
            accept=".geojson,application/json"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
        <div className="w-full mt-5">
          <label className="block mb-2 font-bold text-gray-800">Select New Color:</label>
          <input
            type="color"
            onChange={(e) => changeLayerColor(e.target.value)}
            className="w-full h-10 p-2 mb-5 border-2 border-gray-300 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyComponent;
