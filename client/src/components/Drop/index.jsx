import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

function DropzoneInput({ onFilesChange, clearFilesTrigger }) {
  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  }, [clearFilesTrigger]);

  useEffect(() => {
    onFilesChange(images.map((img) => img.file));
  }, [images, onFilesChange]);

  useEffect(() => {
    setImages([]);
  }, [clearFilesTrigger]);
  

  const removeImage = (previewUrl) => {
    setImages((prev) => prev.filter((img) => img.preview !== previewUrl));
    URL.revokeObjectURL(previewUrl);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #aaa",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: isDragActive ? "#eee" : "#fafafa",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <p>
          {isDragActive
            ? "Drop files here..."
            : "Drag 'n' drop some files here, or click to select files"}
        </p>
      </div>

      {images.length > 0 && (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 15 }}>
          {images.map((img, index) => (
            <div key={index} style={{ position: "relative", width: 100, height: 100 }}>
              <img
                src={img.preview}
                alt="preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 6,
                }}
              />
              <button
                onClick={() => removeImage(img.preview)}
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  background: "#e74c3c",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: 20,
                  height: 20,
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropzoneInput;
