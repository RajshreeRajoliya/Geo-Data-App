// components/Map.js
"use client"
import React, { useState } from 'react';
import { MapContainer, TileLayer, FeatureGroup, GeoJSON } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';

const Map = ({ geojsonData }) => {
  const [drawnShapes, setDrawnShapes] = useState([]);

  const handleDrawCreated = (event) => {
    const { layerType, layer } = event;
    const shapeData = {};
    if (layerType === 'polygon') {
      shapeData.type = 'Polygon';
      shapeData.coordinates = layer.getLatLngs().map(latlng => [latlng.lng, latlng.lat]);
    } else if (layerType === 'circle') {
      shapeData.type = 'Circle';
      shapeData.center = [layer.getLatLng().lng, layer.getLatLng().lat];
      shapeData.radius = layer.getRadius();
    }
    setDrawnShapes([...drawnShapes, shapeData]);
  };

  const handleDownloadGeoJSON = () => {
    const geoJSONData = {
      type: 'FeatureCollection',
      features: drawnShapes.map(shape => ({
        type: 'Feature',
        geometry: {
          type: shape.type === 'Polygon' ? 'Polygon' : 'Point',
          coordinates: shape.type === 'Polygon' ? [shape.coordinates] : shape.center,
        },
        properties: shape.type === 'Polygon' ? {} : { radius: shape.radius },
      })),
    };
    const blob = new Blob([JSON.stringify(geoJSONData)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'drawn_shapes.geojson';
    a.click();
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 rounded-lg shadow-lg">
      <MapContainer center={[51.505, -0.09]} zoom={13} className="h-[80vh] w-full rounded-t-lg">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {geojsonData && <GeoJSON data={JSON.parse(geojsonData)} />}
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={handleDrawCreated}
            draw={{
              rectangle: false,
              marker: false,
            }}
          />
        </FeatureGroup>
      </MapContainer>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleDownloadGeoJSON}
          className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md"
        >
          Download GeoJSON
        </button>
      </div>
    </div>
  );
};

export default Map;
