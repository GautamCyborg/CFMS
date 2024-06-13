import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import geojsonData from '../assets/india-states.json';

const getColor = (d) => {
  return '#800026';
}

const hoverColor = "#FFEDA0"; 

const style = (feature) => {
  return {
    fillColor: getColor(feature.properties.density || 0),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  };
}

const highlightFeature = (e) => {
  const layer = e.target;
  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 1,
    fillColor: hoverColor
  });
}

const resetHighlight = (e) => {
  const layer = e.target;
  layer.setStyle(style(layer.feature));
}

const onEachFeature = (feature, layer) => {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight
  });
}

const ChloropethMap = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">Interactive Chloropeth Map of India</h1>
      <div className="shadow-xl rounded-lg overflow-hidden">
        <MapContainer center={[20.5937, 78.9629]} zoom={4} style={{ height: "80vh", width: "80vw" }}>
          <TileLayer
            url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
          />
          <GeoJSON data={geojsonData} style={style} onEachFeature={onEachFeature} />
        </MapContainer>
      </div>
    </div>
  );
}

export default ChloropethMap;
