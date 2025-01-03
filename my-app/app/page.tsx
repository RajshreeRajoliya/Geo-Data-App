// pages/index.js
"use client"
import React, { useState } from 'react';
import Map from './components/Map';
import FileUpload from './components/FileUpload';

const Home = () => {
  const [geojsonData, setGeojsonData] = useState(null);

  const handleFileUpload = (fileContent) => {
    setGeojsonData(fileContent);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-center py-6">
        <h2 className="text-4xl font-semibold text-gray-800">Geo Data App</h2>
      </div>
      <div className="max-w-4xl mx-auto p-4">
        <FileUpload onFileUpload={handleFileUpload} />
        <Map geojsonData={geojsonData} />
      </div>
    </div>
  );
};

export default Home;
