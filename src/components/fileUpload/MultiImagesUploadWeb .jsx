import React, { useState, useEffect } from "react";
import { Image } from "primereact/image";
import { RxCross2 } from "react-icons/rx";
import { SlPicture } from "react-icons/sl";
import { multiImageUploadApi } from "../../services/adminApiRoutes";

export default React.memo(function MultiImagesUploadWeb ({ formik, name, baseURL }) {
  const { values, setFieldValue } = formik;
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false); // To manage upload state
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Upload files to API
  const uploadFiles = async (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      setUploading(true);
      const response = await multiImageUploadApi(formData); 
      const uploadedFiles = response.data; // Assuming response contains the array of objects
      setFieldValue(name, [...(values[name] || []), ...uploadedFiles]);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setUploading(false);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const validFiles = uploadedFiles.filter((file) => file instanceof File);
    uploadFiles(validFiles);
  };

  // Handle drag and drop for desktop
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter((file) => file instanceof File);
    uploadFiles(validFiles);
  };

  // Remove a specific file
  const removeFile = (fileToRemove) => {
    setFieldValue(
      name,
      values[name].filter((file) => file !== fileToRemove)
    );
  };

  useEffect(() => {
    return () => {
      if (values[name]) {
        values[name].forEach((file) => {
          if (file instanceof File) {
            URL.revokeObjectURL(file.preview);
          }
        });
      }
    };
  }, [values, name]);

  return (
    <div className="multipule-file-upload-wrapper row">
      {/* File Upload Area */}
      <div className="col-md-6">
        <div>
          <input
            type="file"
            id="image"
            multiple
            hidden
            onChange={handleFileChange}
          />
          <label
            htmlFor="image"
            className={`multipule-image-uploader mb-3 mb-lg-4 ${dragActive ? "drag-active" : ""}`}
            onDragEnter={!isMobile ? handleDragEnter : null}
            onDragLeave={!isMobile ? handleDragLeave : null}
            onDrop={!isMobile ? handleDrop : null}
            onDragOver={!isMobile ? (e) => e.preventDefault() : null}
            style={{height: "100%",paddingBlock: "1rem"}}
          >
            <span className="mb-3">
              <SlPicture color="#918E92" size={50} />
            </span>
            {dragActive ? "Drop Images Here" : isMobile ? "Tap to Upload Images" : "Upload Images"}
            <span className="text-orange fw-500">Click to browse</span>
          </label>
        </div>
        {uploading && <p>Uploading files...</p>}
      </div>

      {/* Preview Section */}
      <div className="col-md-6">
        {Array.isArray(values[name]) && values[name].length > 0 && (
          <div className="file-previews">
            <div className="multi-pre-list" style={{ minHeight: "100%", overflowY: "auto" }}>
              {values[name]?.map((file, index) => {
                return (
                  <div className="grid-item" key={index}>
                    <div className="file-preview position-relative d-flex justify-content-between align-items-center border-rounded-gray px-3 py-2 mb-2">
                      <div className="h-100">
                        <Image
                          src={file.image}
                          zoomSrc={file.image}
                          alt="Uploaded File"
                          className="multi-file-preview"
                          preview
                        />
                      </div>
                      <div className="position-absolute top-0 end-0">
                        <RxCross2
                          color="red"
                          size={25}
                          onClick={() => removeFile(file)}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
