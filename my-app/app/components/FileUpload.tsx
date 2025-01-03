// components/FileUpload.js
"use client"
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result;
        onFileUpload(fileContent);
      };
      reader.readAsText(file);
    });
  }, [onFileUpload]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 text-center w-11/12 mx-auto h-16 mb-3 p-4"
    >
      <input {...getInputProps()} />
      <p>Drag & drop GeoJSON or KML files here, or click to select files</p>
    </div>
  );
};

export default FileUpload;
