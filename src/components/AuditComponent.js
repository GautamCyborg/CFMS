import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-draw';
import 'leaflet-control-geocoder';
import * as turf from '@turf/turf';
import { FaDownload, FaRuler ,FaMapMarkerAlt } from 'react-icons/fa';
import icon from "../assets/Mark05.png";

const AuditComponent = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const drawnItemsRef = useRef(null);
  const [area, setArea] = useState(null);
  const [address, setAddress] = useState('');

  //Function to Generate Location
  const handleGetAddressClick = async () => {
    let latlng;
    drawnItemsRef.current.eachLayer(function (layer) {
      if (layer instanceof L.Marker) {
        latlng = layer.getLatLng();
      } else if (layer instanceof L.Circle) {
        latlng = layer.getLatLng();
      } else {
        const bounds = layer.getBounds();
        latlng = bounds.getCenter();
      }
    });
  
    if (latlng) {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`);
      const data = await response.json();
      setAddress(data.display_name);
    } else {
      setAddress('No shape drawn.');
    }
  };
  

  // Function to export coordinates
  const exportCoordinates = () => {
    const data = [];
    drawnItemsRef.current.eachLayer(function (layer) {
      let shape;
      if (layer instanceof L.Circle) {
        const latlng = layer.getLatLng();
        const radius = layer.getRadius();
        shape = turf.circle([latlng.lng, latlng.lat], radius / 1000, { units: 'kilometers' });
      } else {
        shape = layer.toGeoJSON();
      }
      data.push(shape);
    });
    return data;
  };

  // Function to download GeoJSON
  const downloadGeoJSON = (geojson) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(geojson));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "map-data.geojson");
    document.body.appendChild(downloadAnchorNode); // Required for Firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // Function to calculate area
  const calculateArea = () => {
    let totalArea = 0;
    drawnItemsRef.current.eachLayer(function (layer) {
      let shape;
      if (layer instanceof L.Circle) {
        const latlng = layer.getLatLng();
        const radius = layer.getRadius();
        shape = turf.circle([latlng.lng, latlng.lat], radius / 1000, { units: 'kilometers' });
      } else {
        shape = layer.toGeoJSON();
      }
      totalArea += turf.area(shape);
    });
    setArea(totalArea);
  };

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map
      mapRef.current = L.map(mapContainerRef.current).setView([20.5937, 78.9629], 5);

      // Add OpenStreetMap tiles
      L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(mapRef.current);

      // Add geocoder
      L.Control.geocoder({
        defaultMarkGeocode: false,
      })
        .on('markgeocode', function (e) {
          const bbox = e.geocode.bbox;
          const poly = L.polygon([
            bbox.getSouthEast(),
            bbox.getNorthEast(),
            bbox.getNorthWest(),
            bbox.getSouthWest(),
          ]).addTo(mapRef.current);
          mapRef.current.fitBounds(poly.getBounds());
        })
        .addTo(mapRef.current);

      // Define the custom icon
      const customIcon = L.icon({
        iconUrl: icon,
        iconSize: [35, 35], // Size of the icon
        iconAnchor: [17, 35], // Point of the icon which will correspond to marker's location
        popupAnchor: [1, -34] // Point from which the popup should open relative to the iconAnchor
      });

      // Add drawing controls
      const drawnItems = new L.FeatureGroup();
      mapRef.current.addLayer(drawnItems);
      drawnItemsRef.current = drawnItems;

      const drawControl = new L.Control.Draw({
        edit: {
          featureGroup: drawnItems,
        },
        draw: {
          marker: {
            icon: customIcon, // Use the custom icon for markers
          },
        },
      });
      mapRef.current.addControl(drawControl);

      mapRef.current.on(L.Draw.Event.CREATED, function (event) {
        const layer = event.layer;
        if (layer instanceof L.Marker) {
          layer.setIcon(customIcon); // Ensure custom icon is used for markers
        }
        drawnItems.addLayer(layer);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const handleExportClick = () => {
    const geojson = exportCoordinates();
    downloadGeoJSON(geojson);
  };

  const handleCalculateAreaClick = () => {
    calculateArea();
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen p-10 bg-gradient-to-r from-blue-50 to-purple-100">
      <div
        id="map"
        ref={mapContainerRef}
        className="w-11/12 h-full border-2 border-gray-300 rounded-lg shadow-lg"
      ></div>
      <div className="w-1/3 h-full flex flex-col items-center p-5 bg-white rounded-lg shadow-lg ml-5">
        
        <h1 className="text-2xl font-bold text-gray-800 m-5">Start Audit</h1>
        
        <button
        onClick={handleExportClick}
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 m-5 rounded-full shadow-lg flex items-center hover:bg-blue-600 transition-colors"
      >
        <FaDownload className="mr-2" />
        Export GeoJson
      </button>
      <button
        onClick={handleCalculateAreaClick}
        className="w-full bg-green-500 text-white font-bold py-2 px-4 m-4 rounded-full shadow-lg flex items-center hover:bg-green-600 transition-colors"
      >
        <FaRuler className="mr-2" />
        Calculate Area
      </button>
      
        <div className="w-full m-5 bg-white text-black font-bold py-2 px-4 rounded-lg shadow-lg">
          Area: {area ? area.toFixed(2) : 0.00 } square meters
        </div>

        <button
          onClick={handleGetAddressClick}
          className="w-full bg-yellow-500 text-white font-bold py-2 px-4 m-4 rounded-full shadow-lg flex items-center hover:bg-yellow-600 transition-colors"
        >
        <FaMapMarkerAlt className="mr-2" />
        Get location
        </button>

        <div className="w-full m-5 bg-white text-black font-bold py-2 px-4 rounded-lg shadow-lg">
        Location: {address}
        </div>
      
      </div>
      
    </div>
  );
};

export default AuditComponent;
