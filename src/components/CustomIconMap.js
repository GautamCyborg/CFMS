import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Mark1 from "../assets/Mark01.png";
import Mark2 from "../assets/Mark02.png";
import Mark3 from "../assets/Mark03.png";
import Mark4 from "../assets/Mark04.png";
import Mark5 from "../assets/Mark05.png";

const markIcons = {
  Mark1: L.icon({
    iconUrl: Mark1,
    iconSize: [70, 70],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  Mark2: L.icon({
    iconUrl: Mark2,
    iconSize: [70, 70],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  Mark3: L.icon({
    iconUrl: Mark3,
    iconSize: [70, 70],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  Mark4: L.icon({
    iconUrl: Mark4,
    iconSize: [70, 70],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  Mark5: L.icon({
    iconUrl: Mark5,
    iconSize: [70, 70],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })
};

const GeoMap = () => {
  const [selectedIconName, setSelectedIconName] = useState("Mark1");
  const [markers, setMarkers] = useState([]);
  const markerRef = useRef(null);
  const mapRef = useRef(null);
  const [initialPosition, setInitialPosition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setInitialPosition([latitude, longitude]);
        setLoading(false);
      },
      (error) => {
        console.error("Error getting geolocation:", error);
        alert("Unable to retrieve your location. Defaulting to London.");
        setInitialPosition([51.505, -0.09]);
        setLoading(false);
      }
    );
  }, []);

  const handleChange = (event) => {
    setSelectedIconName(event.target.value);
  };

  const AddMarkerToClickLocation = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setMarkers([
          ...markers,
          { position: [lat, lng], icon: markIcons[selectedIconName] },
        ]);
      },
    });
    return null;
  };

  const handleMarkerRemove = (indexToRemove) => {
    setMarkers((prevMarkers) =>
      prevMarkers.filter((_, index) => index !== indexToRemove)
    );
  };

  const clearMarkers = () => {
    setMarkers([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 py-8 shadow-2xl rounded-lg mx-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Map With Custom Markers
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        initialPosition && (
          <MapContainer
            center={initialPosition}
            zoom={13}
            style={{ height: "60vh", width: "60%" }}
            className="shadow-xl border-2 border-gray-300 rounded-lg"
            whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
          >
            <AddMarkerToClickLocation />
            <TileLayer url="https://tile.openstreetmap.de/{z}/{x}/{y}.png" />
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={marker.position}
                icon={marker.icon}
                ref={markerRef}
              >
                <Popup>
                  <div className="bg-white rounded-lg p-3 shadow-lg">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Marker {index + 1}
                    </h3>
                    <button
                      onClick={() => handleMarkerRemove(index)}
                      className="mt-2 bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Remove Marker
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )
      )}
      <div className="flex space-x-4 items-center mt-4">
   <select
          value={selectedIconName}
          onChange={handleChange}
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-purple-500 shadow"
        >
          <option value="Mark1">Man Mark</option>
          <option value="Mark2">Flag</option>
          <option value="Mark3">Pin</option>
          <option value="Mark4">Red Mark</option>
          <option value="Mark5">Black Mark</option>
        </select>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={clearMarkers}
        >
          Clear Map
        </button>
      </div>
    </div>
  );
};

export default GeoMap;
